import express, { Express, Request } from 'express';
import proxy from 'express-http-proxy';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import { readdir } from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { networkInterfaces } from 'os';
import { request as httpsRequest } from 'https';
import { request as httpRequest } from 'http';
import sprightlyExpress from 'sprightly/express';

let KSInstance = '';
const ideParamsData: Record<string, string> = {};
let ideParamsSeq = 0;
let activeProjectPath = '';

const KeybridgeEndpoints = ['/DirectXMLPostJSON', '/UserLogin', '/LoginUserInterface', '/TableListJSON', '/TableBrowser', '/SearchJSON', '/SessionStore'];

export function setupProxy(
  rootPath: string, 
  hostPort: number, 
  servicePort: number, 
  proxyEndpoint: string, 
  supportedInstances: string[],
  onNetworkEvent?: (event: any) => void
) {
  KSInstance = supportedInstances[0] || 'Test';
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

  app.engine("html", se as any);
  app.set("views", path.join(rootPath, "views"));

  // Device service — use real Corelation Windows service if configured, otherwise mock
  const deviceServiceUrl = process.env.DEVICE_SERVICE_URL || '';
  const protocol = deviceServiceUrl.startsWith('https') ? 'https' : 'http';
  const service: Express = express();
  const corsOptions = { origin: true, optionsSuccessStatus: 200 };

  if (deviceServiceUrl) {
    // Proxy /GetDeviceInformation to the real device service
    app.get('/GetDeviceInformation', cors(corsOptions), proxy(deviceServiceUrl, {
      https: deviceServiceUrl.startsWith('https'),
      proxyReqOptDecorator: (opts) => { (opts as any).rejectUnauthorized = false; return opts; },
      proxyReqPathResolver: () => '/GetDeviceInformation'
    }));
  } else {
    // Fallback: mock device info from local MAC addresses
    service.get('/GetDeviceInformation', cors(corsOptions), (_req, res) => {
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
    service.get('*', (_req, res) => { res.send("okay") });
  }

  // Main Proxy Logic
  app.post('*/Keyscript_IDE/*', (req, _res, next) => {
    req.url = req.url.replace('/Keyscript_IDE/', '/');
    next();
  });

  app.post('*/KeyscriptServlet/List', bodyParser.urlencoded({ extended: false }), async (req, res) => {
    const parent = req.body.node;
    if (!parent || !parent.startsWith('KeyScripts')) {
        return res.json([]);
    }
    const parentPath = parent.substring('KeyScripts'.length + 1);

    // Determine which directory to list: active project or default public/scripts
    const scriptsDir = activeProjectPath
      ? path.join(activeProjectPath, parentPath)
      : path.join(rootPath, 'public/scripts', parentPath);
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

  const useHttps = proxyEndpoint.startsWith('https') || proxyEndpoint.endsWith(':8443') || proxyEndpoint.endsWith(':443')
  const proxyUrl = useHttps && !proxyEndpoint.startsWith('https') ? `https://${proxyEndpoint}` : proxyEndpoint

  // SSO session: store JSESSIONID from SSO to inject into proxy requests
  let ssoSessionId = ''

  // POST /api/sso-session — renderer calls this after SSO to share the JSESSIONID with the proxy
  app.post('/api/sso-session', bodyParser.json(), (req, res) => {
    if (req.body?.jsessionId) {
      ssoSessionId = req.body.jsessionId
      console.log(`SSO session established: ${ssoSessionId.substring(0, 8)}...`)
      res.json({ success: true })
    } else {
      res.status(400).json({ error: 'Missing jsessionId' })
    }
  })

  // Project folder management — renderer tells us which folder is active
  app.post('/api/set-project', bodyParser.json(), (req, res) => {
    activeProjectPath = req.body?.path || ''
    console.log(`Active project: ${activeProjectPath || '(none)'}`)
    res.json({ success: true })
  })

  app.get('/api/get-project', (_req, res) => {
    res.json({ path: activeProjectPath })
  })

  // Serve project scripts at /project-scripts/*  (absolute path files)
  app.get('/project-scripts/*', (req, res) => {
    if (!activeProjectPath) return res.status(404).send('No project loaded')
    const relative = req.params[0]
    const file = path.join(activeProjectPath, relative)
    console.log(`[project-scripts] Serving: ${relative} -> ${file} (exists: ${existsSync(file)})`)
    if (existsSync(file)) {
      res.type('application/javascript').sendFile(file)
    } else {
      res.status(404).send(`Script not found: ${file}`)
    }
  })

  // DirectXMLPostJSON — dedicated handler to properly forward XML body (same as SearchJSON)
  app.post('/DirectXMLPostJSON', bodyParser.raw({ type: ['text/xml', 'application/xml', 'application/x-www-form-urlencoded', 'text/plain'] , limit: '1mb' }), (req, res) => {
    let xmlBody: string
    const raw = req.body instanceof Buffer ? req.body.toString('utf-8') : (req.body || '')
    if (typeof raw === 'string' && raw.startsWith('crXMLData=')) {
      xmlBody = decodeURIComponent(raw.substring('crXMLData='.length).replace(/\+/g, ' '))
    } else {
      xmlBody = raw
    }

    console.log('[DirectXMLPostJSON] Forwarding XML:', xmlBody.substring(0, 200))

    const targetUrl = new URL(`/${KSInstance}/DirectXMLPostJSON`, proxyUrl)
    const isHttps = targetUrl.protocol === 'https:'
    const reqFn = isHttps ? httpsRequest : httpRequest

    const headers: Record<string, string> = {
      'Content-Type': 'text/xml',
      'Content-Length': Buffer.byteLength(xmlBody).toString()
    }
    if (ssoSessionId) {
      headers['Cookie'] = `JSESSIONID=${ssoSessionId}`
    }

    const proxyReq = reqFn(
      {
        hostname: targetUrl.hostname,
        port: targetUrl.port,
        path: targetUrl.pathname,
        method: 'POST',
        headers,
        rejectUnauthorized: false
      } as any,
      (proxyRes) => {
        let data = ''
        proxyRes.on('data', (chunk: Buffer) => { data += chunk.toString() })
        proxyRes.on('end', () => {
          console.log('[DirectXMLPostJSON] Response:', proxyRes.statusCode, data.substring(0, 200))
          if (onNetworkEvent) {
            onNetworkEvent({ type: 'response', id: 'dxml-' + Date.now(), status: proxyRes.statusCode, body: data })
          }
          res.status(proxyRes.statusCode || 500)
          res.set('Content-Type', proxyRes.headers['content-type'] || 'application/json')
          res.send(data)
        })
      }
    )

    proxyReq.on('error', (err) => {
      console.error('[DirectXMLPostJSON] Proxy error:', err.message)
      res.status(502).json({ error: 'DirectXMLPostJSON proxy failed', detail: err.message })
    })

    proxyReq.write(xmlBody)
    proxyReq.end()
  })

  // SearchJSON — dedicated handler to properly forward XML body
  // express-http-proxy doesn't reliably forward text/xml bodies, so we handle it manually
  app.post('/SearchJSON', bodyParser.raw({ type: ['text/xml', 'application/xml', 'application/x-www-form-urlencoded', 'text/plain'] , limit: '1mb' }), (req, res) => {
    let xmlBody: string
    const raw = req.body instanceof Buffer ? req.body.toString('utf-8') : (req.body || '')

    // If sent as form-encoded crXMLData=..., extract the XML
    if (typeof raw === 'string' && raw.startsWith('crXMLData=')) {
      xmlBody = decodeURIComponent(raw.substring('crXMLData='.length).replace(/\+/g, ' '))
    } else {
      xmlBody = raw
    }

    console.log('[SearchJSON] Forwarding XML:', xmlBody.substring(0, 200))

    const targetUrl = new URL(`/${KSInstance}/SearchJSON`, proxyUrl)
    const isHttps = targetUrl.protocol === 'https:'
    const reqFn = isHttps ? httpsRequest : httpRequest

    const headers: Record<string, string> = {
      'Content-Type': 'text/xml',
      'Content-Length': Buffer.byteLength(xmlBody).toString()
    }
    if (ssoSessionId) {
      headers['Cookie'] = `JSESSIONID=${ssoSessionId}`
    }

    const proxyReq = reqFn(
      {
        hostname: targetUrl.hostname,
        port: targetUrl.port,
        path: targetUrl.pathname,
        method: 'POST',
        headers,
        rejectUnauthorized: false
      } as any,
      (proxyRes) => {
        let data = ''
        proxyRes.on('data', (chunk: Buffer) => { data += chunk.toString() })
        proxyRes.on('end', () => {
          console.log('[SearchJSON] Response:', proxyRes.statusCode, data.substring(0, 200))

          // Capture for Inspector
          if (onNetworkEvent) {
            onNetworkEvent({ type: 'response', id: 'search-' + Date.now(), status: proxyRes.statusCode, body: data })
          }

          res.status(proxyRes.statusCode || 500)
          res.set('Content-Type', proxyRes.headers['content-type'] || 'application/json')
          res.send(data)
        })
      }
    )

    proxyReq.on('error', (err) => {
      console.error('[SearchJSON] Proxy error:', err.message)
      res.status(502).json({ error: 'SearchJSON proxy failed', detail: err.message })
    })

    proxyReq.write(xmlBody)
    proxyReq.end()
  })

  // GET /UserLogin for Kerberos SSO — browser sends Negotiate header automatically
  app.get('/UserLogin', proxy(proxyUrl, {
    https: useHttps,
    proxyReqOptDecorator: function (proxyReqOpts) {
      if (useHttps) (proxyReqOpts as any).rejectUnauthorized = false
      return proxyReqOpts
    },
    proxyReqPathResolver: function (req) {
      return `/${KSInstance}${req.url}`
    }
  }))

  app.post('*', proxy(proxyUrl, {
    https: useHttps,
    proxyReqOptDecorator: function (proxyReqOpts) {
      if (useHttps) (proxyReqOpts as any).rejectUnauthorized = false
      // Always replace JSESSIONID cookie with the current SSO session
      if (ssoSessionId) {
        proxyReqOpts.headers = proxyReqOpts.headers || {}
        const existingCookie = (proxyReqOpts.headers.cookie as string) || ''
        // Remove any existing JSESSIONID from the cookie string
        const cleanedCookie = existingCookie.replace(/JSESSIONID=[^;]*(;\s*)?/g, '').replace(/;\s*$/, '')
        proxyReqOpts.headers.cookie = cleanedCookie
          ? `JSESSIONID=${ssoSessionId}; ${cleanedCookie}`
          : `JSESSIONID=${ssoSessionId}`
      }
      return proxyReqOpts
    },
    proxyReqPathResolver: function (req) {
      if (req.path.startsWith('/Keyscript_IDE/'))
        return req.url.replace(/^\/Keyscript_IDE/, `/${KSInstance}`);
      if (KeybridgeEndpoints.includes(req.path))
        return `/${KSInstance}${req.url}`;
      // For any other POST (e.g. /KeyScript/query-language.json), prepend instance
      // since Keystone serves all content under /{instance}/
      if (!req.path.startsWith(`/${KSInstance}`))
        return `/${KSInstance}${req.url}`;
      return req.url;
    },
    proxyReqBodyDecorator: function (bodyContent: Buffer, srcReq: Request) {
      let bodyStr = bodyContent.toString('utf-8')
      // Replace the JSESSIONID in POST body with the correct SSO session
      if (ssoSessionId && bodyStr.includes('JSESSIONID=')) {
        bodyStr = bodyStr.replace(/JSESSIONID=[^&]+/, `JSESSIONID=${ssoSessionId}`)
        bodyContent = Buffer.from(bodyStr, 'utf-8')
      }
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
  const serviceBaseUrl = deviceServiceUrl || `${protocol}://localhost:${servicePort}`
  const headElement = readFileSync(path.join(rootPath, 'views/templates/head-section.html')).toString('utf8')
    .replace(/{{ protocol }}/g, protocol)
    .replace(/{{ hostPort }}/g, `${hostPort}`)
    .replace(/{{ servicePort }}/g, `${servicePort}`)
    .replace(/{{ serviceBaseUrl }}/g, serviceBaseUrl)
    .replace(/{{ instance }}/g, KSInstance);

  app.get(supportedInstances.map(i => `/${i}/Keyscript_IDE/RunScript`), (req, res) => {
    const scriptPath = req.query.scriptPath as string;
    const js = scriptPath.substring(0, scriptPath.length - 3);

    // Check project folder first, then fall back to public/scripts
    const projectFile = activeProjectPath ? path.join(activeProjectPath, `${js}.js`) : ''
    const defaultFile = path.join(rootPath, `public/scripts/${js}.js`)
    const useProject = projectFile && existsSync(projectFile)
    const file = useProject ? projectFile : defaultFile

    const parametersId = req.query.scriptParametersId?.toString() ?? '-';
    const storedParams = ideParamsData[parametersId];
    delete ideParamsData[parametersId];

    // Build script parameters, always injecting the current session
    let params: { crlogin: Record<string, string>; crscript: Record<string, string> }
    try {
      params = storedParams ? JSON.parse(storedParams) : { crlogin: {}, crscript: {} }
    } catch {
      params = { crlogin: {}, crscript: {} }
    }
    // Inject session ID and instance so the CR framework recognizes the login
    if (ssoSessionId) {
      params.crlogin.JSESSIONID = ssoSessionId
    }
    params.crlogin.instance = params.crlogin.instance || KSInstance
    const scriptParameters = JSON.stringify(params)

    // Set JSESSIONID cookie on the webview so the CR framework recognizes the session
    if (ssoSessionId) {
      res.cookie('JSESSIONID', ssoSessionId, { path: '/', httpOnly: false });
    }

    if (existsSync(file)) {
      // For project scripts, use /project-scripts/ path; for default, use /scripts/
      const scriptSrc = useProject ? `/project-scripts/${js}.js` : `/scripts/${js}.js`
      res.render("iframe-target.html", { script: js, 'head-section': headElement, scriptParameters, scriptSrc });
    } else {
      res.status(404).send('<html><body>Script not found.</body></html>');
    }
  });

  // Default routes and instance handling
  app.get(supportedInstances.map(i => `/${i}`), (req, res) => {
    const parts = req.path.split('/');
    if (parts.length > 1) KSInstance = parts[1];
    res.json({ instance: KSInstance });
  });
  app.get(supportedInstances.map(i => `/${i}/*`), (req, _res, next) => {
    const parts = req.path.split('/');
    if (parts.length > 1) KSInstance = parts[1];
    next();
  });

  // Catch-all static files from public/
  app.use(express.static(path.join(rootPath, 'public')));

  // Fallback: proxy unmatched GET requests to Keystone (e.g. /ext-3.2.2/, /KeyScript/, /images/)
  // These are root-level resources on Keystone, so do NOT prepend instance name
  app.get('*', proxy(proxyUrl, {
    https: useHttps,
    proxyReqOptDecorator: function (proxyReqOpts) {
      if (useHttps) (proxyReqOpts as any).rejectUnauthorized = false
      if (ssoSessionId) {
        proxyReqOpts.headers = proxyReqOpts.headers || {}
        const existingCookie = (proxyReqOpts.headers.cookie as string) || ''
        const cleanedCookie = existingCookie.replace(/JSESSIONID=[^;]*(;\s*)?/g, '').replace(/;\s*$/, '')
        proxyReqOpts.headers.cookie = cleanedCookie
          ? `JSESSIONID=${ssoSessionId}; ${cleanedCookie}`
          : `JSESSIONID=${ssoSessionId}`
      }
      return proxyReqOpts
    },
    proxyReqPathResolver: function (req) {
      // Keep the path as-is — these are root-level static resources
      return req.url
    }
  }));

  app.listen(hostPort, 'localhost');
  if (!deviceServiceUrl) {
    service.listen(servicePort, 'localhost');
  }

  return { app, service };
}
