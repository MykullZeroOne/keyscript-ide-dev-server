import express, { Express, Request } from 'express';
import proxy from 'express-http-proxy';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { readdir } from 'fs/promises';
import { networkInterfaces } from 'os';
import sprightlyExpress from 'sprightly/express';
import { app } from 'electron';
import { is } from '@electron-toolkit/utils';
import dotenv from 'dotenv';

dotenv.config();

let KSInstance = 'Test';
const hostPort = Number(process.env.PORT || 3000);
const servicePort = hostPort + 1;
const protocol = 'http'; // Electron renderer will connect over http to localhost
const proxyEndpoint = process.env.PROXY_ENDPOINT ?? 'keystone:8443';
const supportedInstances = (process.env.SUPPORTED_INSTANCES ?? 'Test').split('|');
const rootPath = app.isPackaged ? path.join(process.resourcesPath, 'app') : app.getAppPath();
const publicPath = path.join(rootPath, 'public');
const viewsPath = path.join(rootPath, 'views');

const ideParamsData: Record<string, string> = {};
let ideParamsSeq = 0;

export function startProxyServer() {
  const proxyApp: Express = express();

  proxyApp.use(session({
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

  proxyApp.engine("html", se as (path: string, options: object, callback: (e: any, rendered?: string) => void) => void);
  proxyApp.set("views", viewsPath);

  const KeybridgeEndpoints = ['/DirectXMLPostJSON', '/UserLogin', '/LoginUserInterface', '/TableListJSON', '/TableBrowser', '/SearchJSON'];

  // Handle IDE renderer build (Static files or Proxy to Vite in dev)
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    const rendererUrl = new URL(process.env['ELECTRON_RENDERER_URL']);
    proxyApp.use('/ide', proxy(`${rendererUrl.protocol}//${rendererUrl.host}`, {
      proxyReqPathResolver: (req) => {
        return `/ide${req.url}`;
      }
    }));
  } else {
    const rendererDistPath = path.join(rootPath, 'out/renderer');
    proxyApp.use('/ide', express.static(rendererDistPath));
  }

  proxyApp.post('*/Keyscript_IDE/*', (req, _res, next) => {
    req.url = req.url.replace('/Keyscript_IDE/', '/');
    next();
  });

  proxyApp.post('*/KeyscriptServlet/List', bodyParser.urlencoded({ extended: false }), async (req, res) => {
    const parent = req.body.node;
    if (!parent || !parent.startsWith('KeyScripts')) {
        return res.json([]);
    }
    const parentPath = parent.substring('KeyScripts'.length + 1);
    const scriptsDir = path.join(publicPath, 'scripts', parentPath);
    
    if (!existsSync(scriptsDir)) {
        return res.json([]);
    }

    try {
        const q = await readdir(scriptsDir, { withFileTypes: true });
        const nodes = q.filter(r => r.isDirectory() || r.name.endsWith('.js')).map(r => {
            if (r.isDirectory())
                return { text: r.name, id: `${parent}\\${r.name}`, cls: "folder" };
            const scriptPath = parentPath.length ? path.join(parentPath, r.name) : r.name;
            return { text: r.name, id: `${parent}\\${r.name}`, leaf: true, cls: "file", scriptPath: (scriptPath.replace(/\\/g, '/')) };
        });
        return res.json(nodes);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to read scripts directory' });
    }
  });

  proxyApp.post('*', proxy(proxyEndpoint, {
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
        srcReq.params.seq = seq;
        ideParamsData[seq] = usp.get('value') ?? '';
      }
      return bodyContent;
    },
    userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
      if (userReq.originalUrl.endsWith('/SessionStore')) {
        try {
            const store = JSON.parse(proxyResData.toString('utf-8')) as { success: boolean, id: string };
            const seq = userReq.params.seq;
            const params = ideParamsData[seq];
            delete ideParamsData[seq];
            if (store.success) {
                ideParamsData[store.id] = params;
            }
        } catch (e) {
            console.error('Failed to parse SessionStore response', e);
        }
      } else if (userReq.originalUrl.endsWith('/UserLogin')) {
        try {
            const data = JSON.parse(proxyResData.toString('utf8'));
            if (data.JSESSIONID) {
                const cookies = proxyRes.headers['set-cookie'] ?? [];
                const newCookies = [...cookies];
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i];
                    // Normalize path and remove Secure/HttpOnly if needed for localhost
                    newCookies.push(cookie.replace(/Path=\/\w+;/, 'Path=/;').replace(/Secure;?/i, ''));
                }
                userRes.setHeader('set-cookie', newCookies);
            }
        } catch (e) {
            console.error('Failed to parse UserLogin response', e);
        }
      }
      return proxyResData;
    }
  }));

  const headSectionPath = path.join(viewsPath, 'templates/head-section.html');
  let headElement = '';
  if (existsSync(headSectionPath)) {
      headElement = readFileSync(headSectionPath).toString('utf8')
        .replace(/{{ protocol }}/g, protocol)
        .replace(/{{ hostPort }}/g, `${hostPort}`)
        .replace(/{{ servicePort }}/g, `${servicePort}`);
  }

  proxyApp.get(supportedInstances.flatMap(i => [`/${i}`, `/${i}/*`]), (req, _res, next) => {
    const slash = req.path.indexOf('/', 1);
    if (slash > 0) {
        KSInstance = req.path.substring(0, slash).replace(/\//g, '');
    } else {
        KSInstance = req.path.replace(/\//g, '');
    }
    next();
  });

  proxyApp.get(supportedInstances.map(i => `/${i}/Keyscript_IDE/RunScript`), (req, res, _next) => {
    const scriptPath = req.query.scriptPath as string;
    if (!scriptPath) return res.status(400).send('Missing scriptPath');

    const js = scriptPath.endsWith('.js') ? scriptPath.slice(0, -3) : scriptPath;
    const file = path.join(publicPath, `scripts/${js}.js`);
    const parametersId = req.query.scriptParametersId?.toString() ?? '-';
    const scriptParameters = ideParamsData[parametersId] ?? '{ crlogin: {}, crscript: {} }';
    
    // In production, we don't want to delete it immediately if the script might reload?
    // The original code deletes it: delete ideParamsData[parametersId];
    
    if (existsSync(file)) {
      return res.render("iframe-target.html", { script: js, 'head-section': headElement, scriptParameters });
    } else {
      return res.status(404).send('<html><body>Script not found.</body></html>');
    }
  });

  proxyApp.get(supportedInstances.map(i => `/${i}/*.js`), (req, res, next) => {
    const js = req.path.substring(req.path.lastIndexOf('/') + 1, req.path.length - 3);
    const file = path.join(publicPath, `scripts/${js}.js`);
    if (existsSync(file)) {
      return res.render("index.html", { protocol, script: js, 'head-section': headElement });
    } else {
      return next();
    }
  });

  // Serve other static assets from public/
  proxyApp.use(express.static(publicPath));

  // Catch-all proxy for GET requests
  proxyApp.get('*', proxy(proxyEndpoint, {
    https: true,
    proxyReqPathResolver: function (req) {
      return req.url;
    }
  }));

  proxyApp.listen(hostPort, () => {
    console.log(`[proxy]: Proxy server running at http://localhost:${hostPort}`);
  });

  // Device Info Service (Corelation Service Mock)
  const serviceApp: Express = express();
  const corsOptions = {
    origin: [`${protocol}://localhost:${hostPort}`],
    optionsSuccessStatus: 200
  };

  serviceApp.get('/GetDeviceInformation', cors(corsOptions), (_req, res) => {
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

  serviceApp.get('*', (_req, res) => { res.send("okay") });

  serviceApp.listen(servicePort, () => {
    console.log(`[proxy]: Device service mock running at http://localhost:${servicePort}`);
  });
}
