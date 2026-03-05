import express, { Express, NextFunction, Request, Response } from 'express';
import proxy from 'express-http-proxy';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import { readdir } from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { networkInterfaces } from 'os';
import sprightlyExpress from 'sprightly/express';

let KSInstance = '';
const ideParamsData: Record<string, string> = {};
let ideParamsSeq = 0;

const KeybridgeEndpoints = ['/DirectXMLPostJSON', '/UserLogin', '/LoginUserInterface', '/TableListJSON', '/TableBrowser', '/SearchJSON'];

export function setupProxy(
  rootPath: string, 
  hostPort: number, 
  servicePort: number, 
  proxyEndpoint: string, 
  supportedInstances: string[],
  onNetworkEvent?: (event: any) => void
) {
  const app: Express = express();
  
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

  const se = sprightlyExpress({
    cache: false,
    keyFallback: "----",
    throwOnKeyNotfound: false,
  });

  app.engine("html", se);
  app.set("views", path.join(rootPath, "views"));

  // Mock Service for Device Info
  const service: Express = express();
  const protocol = 'http'; // Default for local mock
  const corsOptions = {
    origin: [`${protocol}://localhost:${hostPort}`],
    optionsSuccessStatus: 200
  };

  service.get('/GetDeviceInformation', cors(corsOptions), (req, res) => {
    const net = networkInterfaces();
    const info: string[] = [];
    Object.keys(net).forEach(k => { info.push(...net[k]?.map(i => i.mac) ?? []); });
    const mac_id = info.filter(i => i !== '00:00:00:00:00:00').sort().join(' ').replace(/:/g, '-');
    const deviceInfo = `<?xml version="1.0"?>
<device type="c" xmlns="http://www.corelationinc.com/deviceLanguage/v1.0" version="2.0.0.0">
  <deviceInformation type="c">
  <identifier>MAC: ${mac_id}</identifier>
  <userServicePortNumber>${servicePort}</userServicePortNumber>
  </deviceInformation>
</device>`;
    res.send(deviceInfo);
  });
  service.get('*', (req, res) => { res.send("okay") });

  // Main Proxy Logic
  app.post('*/Keyscript_IDE/*', (req, res, next) => {
    req.url = req.url.replace('/Keyscript_IDE/', '/');
    next();
  });

  app.post('*/KeyscriptServlet/List', bodyParser.urlencoded({ extended: false }), async (req, res) => {
    const parent = req.body.node;
    if (!parent || !parent.startsWith('KeyScripts')) {
        return res.json([]);
    }
    const parentPath = parent.substring('KeyScripts'.length + 1);
    const scriptsDir = path.join(rootPath, 'public/scripts', parentPath);
    if (!existsSync(scriptsDir)) return res.json([]);
    
    const q = await readdir(scriptsDir, { withFileTypes: true });
    const nodes = q.filter(r => r.isDirectory() || r.name.endsWith('.js')).map(r => {
      if (r.isDirectory())
        return { text: r.name, id: `${parent}\\${r.name}`, cls: "folder" };
      const scriptPath = parentPath.length ? path.join(parentPath, r.name) : r.name;
      return { text: r.name, id: `${parent}\\${r.name}`, leaf: true, cls: "file", scriptPath: (scriptPath.replace(/\\/g, '/')) };
    });
    res.json(nodes);
  });

  app.post('*', proxy(proxyEndpoint, {
    https: true,
    proxyReqPathResolver: function (req) {
      if (req.path.startsWith('/Keyscript_IDE/'))
        return req.url.replace(/^\/Keyscript_IDE/, `/${KSInstance}`);
      if (KeybridgeEndpoints.includes(req.path))
        return `/${KSInstance}${req.url}`;
      return req.url;
    },
    proxyReqBodyDecorator: function (bodyContent: Buffer, srcReq: Request) {
      if (srcReq.originalUrl.endsWith('/SessionStore')) {
        const seq = `//${++ideParamsSeq}//`;
        const usp = new URLSearchParams(bodyContent.toString('utf-8'));
        (srcReq as any).params = { ...(srcReq as any).params, seq };
        ideParamsData[seq] = usp.get('value') ?? '';
      }

      // Capture request for Inspector
      if (onNetworkEvent) {
        onNetworkEvent({
          type: 'request',
          id: (srcReq as any).requestId ??= Math.random().toString(36).substr(2, 9),
          method: srcReq.method,
          url: srcReq.url,
          body: bodyContent.toString('utf-8')
        });
      }

      return bodyContent;
    },
    userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
      // Capture response for Inspector
      if (onNetworkEvent) {
        onNetworkEvent({
          type: 'response',
          id: (userReq as any).requestId,
          status: proxyRes.statusCode,
          body: proxyResData.toString('utf-8')
        });
      }
      if (userReq.originalUrl.endsWith('/SessionStore')) {
        try {
          const store = JSON.parse(proxyResData.toString('utf-8')) as { success: boolean, id: string };
          const seq = (userReq as any).params.seq;
          const params = ideParamsData[seq];
          delete ideParamsData[seq];
          if (store.success) {
            ideParamsData[store.id] = params;
          }
        } catch (e) {}
      } else if (userReq.originalUrl.endsWith('/UserLogin')) {
        try {
          const data = JSON.parse(proxyResData.toString('utf8'));
          if (data.JSESSIONID) {
            const cookies = proxyRes.headers['set-cookie'] ?? [];
            const newCookies = cookies.map(c => c.replace(/Path=\/\w+;/, 'Path=/;'));
            userRes.setHeader('set-cookie', newCookies);
          }
        } catch (e) {}
      }
      return proxyResData;
    }
  }));

  // Serve Renderer Build
  if (process.env.NODE_ENV === 'development') {
    // In dev, the renderer is served by vite dev server, 
    // but we still want the proxy to handle /RunScript and other routes.
  } else {
    app.use('/ide', express.static(path.join(rootPath, 'out/renderer')));
  }

  // Handle /RunScript for Webview
  const headElement = readFileSync(path.join(rootPath, 'views/templates/head-section.html')).toString('utf8')
    .replace(/{{ protocol }}/g, protocol)
    .replace(/{{ hostPort }}/g, `${hostPort}`)
    .replace(/{{ servicePort }}/g, `${servicePort}`);

  app.get(supportedInstances.map(i => `/${i}/Keyscript_IDE/RunScript`), (req, res) => {
    const scriptPath = req.query.scriptPath as string;
    const js = scriptPath.substring(0, scriptPath.length - 3);
    const file = path.join(rootPath, `public/scripts/${js}.js`);
    const parametersId = req.query.scriptParametersId?.toString() ?? '-';
    const scriptParameters = ideParamsData[parametersId] ?? '{ crlogin: {}, crscript: {} }';
    delete ideParamsData[parametersId];
    
    if (existsSync(file)) {
      res.render("iframe-target.html", { script: js, 'head-section': headElement, scriptParameters });
    } else {
      res.status(404).send('<html><body>Script not found.</body></html>');
    }
  });

  // Default routes and instance handling
  app.get(supportedInstances.flatMap(i => [`/${i}`, `/${i}/*`]), (req, res, next) => {
    const parts = req.path.split('/');
    if (parts.length > 1) KSInstance = parts[1];
    next();
  });

  // Catch-all static files from public/
  app.use(express.static(path.join(rootPath, 'public')));

  app.listen(hostPort, 'localhost');
  service.listen(servicePort, 'localhost');

  return { app, service };
}
