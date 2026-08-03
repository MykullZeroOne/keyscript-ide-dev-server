import { execSync } from 'child_process';
import cors from 'cors';
import dotenv from 'dotenv';
import https from 'https';
import bodyParser from 'body-parser';
import express, { Express, NextFunction, Request, Response } from 'express';
import proxy from 'express-http-proxy';
import session from 'express-session';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { networkInterfaces } from 'os';
import path from 'path';
import { Data, Options } from 'sprightly';
import sprightlyExpress from 'sprightly/express';
import { readdir } from 'fs/promises';

declare module 'express-session' {
  interface SessionData {
    recording?: boolean;
  }
}

dotenv.config();

let KSInstance = '';
const app: Express = express();
const hostPort = Number(process.env.PORT || 3000);
const servicePort = hostPort + 1;
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const proxyEndpoint = process.env.PROXY_ENDPOINT ?? 'keystone:8443';
//const sslPort = process.env.SSL_PORT ? Number(process.env.SSL_PORT) : hostPort + 443;
const supportedInstances = (process.env.SUPPORTED_INSTANCES ?? 'Test').split('|');
const bypassKerberos = process.env.BYPASS_KERBEROS === 'true';
const standaloneService = process.env.STANDALONE_SERVICE === 'true';
const rootPath = path.join(path.resolve('.'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

const se = sprightlyExpress({
  cache: false,
  keyFallback: "----",
  throwOnKeyNotfound: false,
});

async function adapter(path: string, options: Options, cb: (e: any, rendered?: string | undefined) => void) {
  await se(path, options as (Options & Data & { cache: boolean }), cb);
}

app.engine("html", adapter);

/*
app.get('/api/test', async (req, res) => {
  const query = JSON.stringify(req.query); //.replace(/"/g, "'");
  res.send(`
<html>
  <head>
    <script>
      async function post(args) {
        const targetFrame = top;
        if (targetFrame) {
          const p = new Promise((resolve, reject) => {
      
            function listener(event) {
              //TODO: Make sure the event is intended for us.
              //window.removeEventListener("message", listener);
              console.log("Embedded frame received message:", event.origin, event.data);
              resolve(event.data);
            }
      
            window.addEventListener("message", listener);
            targetFrame.postMessage('${query}', '*');
          });
      
          try {
            const data = await p;
            alert(data);
          } catch (error) {
            console.log(error);
          }
        }
      }
    </script>
  </head>
  <body>
    <p>${query}</p>
    <div><button type="button" onclick="post('other args')">Test</button></div>
  <body>
</html>`);
});
*/

app.post('/api/status', (req, res) => {
  console.log('recording:', req.session.recording ?? false);
  res.send({ status: req.session.recording ?? false });
});
app.post('/api/record', (req, res) => {
  req.session.recording = true;
  console.log('recording:', req.session.recording);
  res.send({ status: true });
});
app.post('/api/stop', (req, res) => {
  req.session.recording = false;
  console.log('recording:', req.session.recording);
  res.send({ status: false });
});
app.post<never, { success: boolean }, { sessionId: string, username: string }>('/api/auth', bodyParser.json(), (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

let ideParamsSeq = 0;
const ideParamsData: Record<string, string> = {};

const KeybridgeEndpoints = ['/DirectXMLPostJSON', '/UserLogin', '/LoginUserInterface', '/TableListJSON', '/TableBrowser', '/SearchJSON'];
app.post('*/Keyscript_IDE/*', (req, res, next) => {
  req.url = req.url.replace('/Keyscript_IDE/', '/');
  next();
});
app.post('*/KeyscriptServlet/List', bodyParser.urlencoded({ extended: false }), async (req, res) => {
  const parent = req.body.node;
  const parentPath = parent.substring('KeyScripts'.length + 1);
  const q = await readdir(`./public/scripts/${parentPath}`, { withFileTypes: true });
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
    if (srcReq.originalUrl.includes('UserLogin')) {
      const deviceId = process.env.DEVICE_ID ?? '';
      let body = bodyContent.toString('utf-8').replace('loginDeviceInsertOption=N', 'loginDeviceInsertOption=Y');
      if (deviceId) {
        body = body.replace(/loginDeviceName=[^&]*/, `loginDeviceName=${encodeURIComponent(deviceId)}`);
      }
      bodyContent = Buffer.from(body);
      console.log('[POST request]:', srcReq.originalUrl, body);
    } else if (srcReq.session.recording) {
      console.log('[POST request]:', srcReq.originalUrl, bodyContent.toString('utf8'));
    }
    if (srcReq.originalUrl.endsWith('/SessionStore')) {
      const seq = `//${++ideParamsSeq}//`;
      const usp = new URLSearchParams(bodyContent.toString('utf-8'));
      srcReq.params.seq = seq;
      ideParamsData[seq] = usp.get('value') ?? '';
    }
    return bodyContent; //.split('').reverse().join('');
  },
  userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
    // Rewrite all proxied cookies: strip Secure flag (for HTTP) and normalize path to /
    const cookies = proxyRes.headers['set-cookie'];
    if (cookies) {
      userRes.setHeader('set-cookie', cookies.map(c => {
        let fixed = c.replace(/Path=\/\w+/gi, 'Path=/');
        if (protocol === 'http') fixed = fixed.replace(/;\s*Secure/gi, '');
        return fixed;
      }));
    }
    if (userReq.session.recording) {
      console.log('response:', proxyResData.toString('utf8')); //JSON.stringify(proxyResData));
    }
    if (userReq.originalUrl.endsWith('/SessionStore')) {
      const store = JSON.parse(proxyResData.toString('utf-8')) as { success: boolean, id: string };
      const seq = userReq.params.seq;
      const params = ideParamsData[seq];
      delete ideParamsData[seq];
      if (store.success) {
        ideParamsData[store.id] = params;
        //console.log(store.id, params);
      }
    } else if (userReq.originalUrl.endsWith('/UserLogin')) {
      console.log('[UserLogin response]:', proxyResData.toString('utf8'));
      if (bypassKerberos) {
        const data = JSON.parse(proxyResData.toString('utf8'));
        data.activeDirectoryLogonEnabled = false;
        return Buffer.from(JSON.stringify(data));
      }
    }
    return proxyResData;
  },
  // This doesn't work reliably. Switched back to using NODE_TLS_REJECT_UNAUTHORIZED=0 setting in launch file.
  // proxyReqOptDecorator: function(proxyReqOpts: RequestOptions, _originalReq) {
  //   proxyReqOpts.rejectUnauthorized = false
  //   return proxyReqOpts;
  // }
}));

const headElement = readFileSync('./views/templates/head-section.html').toString('utf8')
  .replace(/{{ protocol }}/g, protocol)
  .replace(/{{ hostPort }}/g, `${hostPort}`)
  .replace(/{{ servicePort }}/g, `${servicePort}`);

app.get(supportedInstances.flatMap(i => [`/${i}`, `/${i}/*`]), (req, res, next) => {
  const slash = req.path.indexOf('/', 1);
  KSInstance = req.path.substring(0, slash).replace(/\//g, '');
  // req.ksinstance = KSInstance;
  // req.rpath = req.path.substring(slash + 1);
  next();
});

app.get(supportedInstances.map(i => `/${i}/Keyscript_IDE`), (req, res, next) => {
  if (!req.path.endsWith('/'))
    res.redirect(`${req.path}/`);
  else
    next();
});
app.get(supportedInstances.map(i => `/${i}/Keyscript_IDE/`), (req, res, next) => {
  //const file = path.join(rootPath, 'public/Keyscript_IDE/index.html');
  //res.sendFile(file);
  res.render("./keyscript_ide.html", { protocol, hostPort, servicePort });
});
app.get(supportedInstances.flatMap(
  i => [
    `/${i}/Keyscript_IDE/ext-3.2.2/*`,
    `/${i}/Keyscript_IDE/Keyscript/*`,
  ]),
  (req, res, next) => {
    const slash = req.path.indexOf('/', 1);
    let rpath = req.path.substring(req.path.indexOf('/', slash + 1));
    res.redirect(rpath);
  }
);
app.get(supportedInstances.flatMap(
  i => [
    `/${i}/ext-3.2.2/*`,
    //`/${i}/images/*`,
  ]),
  (req, res, next) => {
    const slash = req.path.indexOf('/', 1);
    let rpath = req.path.substring(req.path.indexOf('/', slash));
    res.redirect(rpath);
  }
);
app.get(supportedInstances.flatMap(
  i => [
    `/${i}/Keyscript_IDE/RetrieveBinary`,
    `/${i}/Keyscript_IDE/UserLogin`,
    `/${i}/Keyscript_IDE/images/*`,
    //`/${i}/Keyscript_IDE/PersonVerificationSearch`,
  ]),
  (req, res, next) => {
    req.url = req.url.replace('/Keyscript_IDE/', '/');
    next();
  }
);

app.get(supportedInstances.map(i => `/${i}/Keyscript_IDE/css/*`), (req, res, next) => {
  const slash = req.path.indexOf('/', 1);
  let rpath = req.path.substring(slash);
  const file = path.join(rootPath, `public${rpath}`);
  if (existsSync(file))
    res.sendFile(file);
  else
    next();
});
app.get(supportedInstances.map(i => `/${i}/Keyscript_IDE/JSCSSLoader`), (req, res, next) => {
  const slash = req.path.indexOf('/', 1);
  let rpath = req.path.substring(slash);
  const file = path.join(rootPath, `public${rpath}`);
  if (existsSync(file))
    res.sendFile(file);
  else
    next();
});
app.get(supportedInstances.map(i => `/${i}/Keyscript_IDE/RunScript`), (req, res, next) => {
  const req_path = `/${KSInstance}/${req.query.scriptPath}`;
  const slash = req_path.indexOf('/', 1);
  const js = req_path.substring(slash + 1, req_path.length - 3);
  const file = decodeURIComponent(path.join(rootPath, `public/scripts/${js}.js`));
  const parametersId = req.query.scriptParametersId?.toString() ?? '-';
  const scriptParameters = ideParamsData[parametersId] ?? '{ crlogin: {}, crscript: {} }';
  delete ideParamsData[parametersId];
  if (existsSync(file))
    res.render("./iframe-target.html", { script: js, 'head-section': headElement, scriptParameters });
  else
    res.status(404).send('<html><body>Script not found.</body></html>');
});
app.get(supportedInstances.map(i => `/${i}/*.js`), (req, res, next) => {
  const slash = req.path.indexOf('/', 1);
  const js = req.path.substring(slash + 1, req.path.length - 3);
  const file = decodeURIComponent(path.join(rootPath, `public/scripts/${js}.js`));
  if (existsSync(file))
    res.render("./index.html", { protocol, script: js, 'head-section': headElement });
  else
    next();
});
app.get(['/Live/', '/Live', '/Live/*'], (req, res) => {
  res.status(403).send('<html><body>Connecting to Live is not supported.</body></html>');
});
// app.get('/frame.html', (req, res) => {
//   res.render("./frame.html", { protocol, script, 'head-section': headElement });
// });
app.get('/lib/*', (req, res, next) => {
  const lib = path.join(rootPath, `libs/dncu-keyscript-lib/${req.path}`);
  if (existsSync(lib)) {
    res.sendFile(lib);
    return;
  }
  next();
});

const instancePaths = supportedInstances.flatMap(i => [`/${i}`, `/${i}/`]);
function intercept(req: Request, res: Response, next: NextFunction) {
  if (req.path.endsWith('.ts') && req.headers['sec-fetch-dest'] === 'empty') {
    console.log(req.path);
    const source = path.join(rootPath, `..${req.path}`);
    if (existsSync(source)) {
      res.sendFile(source);
      return;
    }
  }
  const resource = path.join(rootPath, decodeURIComponent(`public${req.path}`));
  if (!instancePaths.includes(req.path)
    && path.resolve(resource).startsWith(rootPath)
    && existsSync(resource)) {
    res.sendFile(resource);
    return;
  }
  next();
}

app.get(supportedInstances.map(i => `/${i}/`), (req, res) => {
  const url = req.url = `${req.url}/`.replace(/\/\/$/, '/');
  res.redirect(`${url}Keyscript_IDE/`)
});

app.get('/', (req, res) => { res.redirect('/Test/Keyscript_IDE/') });

app.get('*', intercept, proxy(proxyEndpoint, {
  https: true,
  proxyReqPathResolver: function (req) {
    if (req.url.includes('/UserLogin')) {
      const deviceId = process.env.DEVICE_ID ?? '';
      req.url = req.url.replace('loginDeviceInsertOption=N', 'loginDeviceInsertOption=Y');
      if (deviceId) {
        req.url = req.url.replace(/loginDeviceName=[^&]*/, `loginDeviceName=${encodeURIComponent(deviceId)}`);
      }
    }
    console.log(req.url);
    return req.url;
  },
  userResDecorator: function (proxyRes, proxyResData, _userReq, userRes) {
    const cookies = proxyRes.headers['set-cookie'];
    if (cookies) {
      userRes.setHeader('set-cookie', cookies.map(c => {
        let fixed = c.replace(/Path=\/\w+/gi, 'Path=/');
        if (protocol === 'http') fixed = fixed.replace(/;\s*Secure/gi, '');
        return fixed;
      }));
    }
    return proxyResData;
  }
}));


const service: Express = express();

var corsOptions = {
  origin: [`${protocol}://localhost:${hostPort}`],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

service.get('/GetDeviceInformation', cors(corsOptions), (req, res) => {
  let mac_id = process.env.DEVICE_ID ?? '';
  if (!mac_id) {
    const net = networkInterfaces();
    const info: string[] = [];
    Object.keys(net).forEach(k => { info.push(...net[k]?.map(i => i.mac) ?? []); });
    mac_id = info.filter(i => i !== '00:00:00:00:00:00').sort().join(' ').replace(/:/g, '-');
  }
  const deviceInfo = `<?xml version="1.0"?>
<device type="c" xmlns="http://www.corelationinc.com/deviceLanguage/v1.0" version="2.0.0.0">
  <deviceInformation type="c">
  <identifier>${process.env.DEVICE_ID ? mac_id : `MAC: ${mac_id}`}</identifier>
  <userServicePortNumber>${servicePort}</userServicePortNumber>
  </deviceInformation>
</device>`;
  res.send(deviceInfo);
});
service.get('*', (req, res) => { res.send("okay") });


if (standaloneService) {
  const standalonePort = 51763;
  const certDir = path.join(rootPath, 'certs');
  const standaloneCertFile = path.join(certDir, 'localhost.crt');
  const standaloneKeyFile = path.join(certDir, 'localhost.key');

  if (!existsSync(standaloneCertFile) || !existsSync(standaloneKeyFile)) {
    mkdirSync(certDir, { recursive: true });
    const configPath = path.join(certDir, 'openssl.cnf');
    writeFileSync(configPath, [
      '[req]',
      'distinguished_name = req_distinguished_name',
      'x509_extensions = v3_req',
      'prompt = no',
      '[req_distinguished_name]',
      'CN = 127.0.0.1',
      '[v3_req]',
      'subjectAltName = IP:127.0.0.1',
    ].join('\n') + '\n');
    execSync(`openssl req -x509 -newkey rsa:2048 -keyout "${standaloneKeyFile}" -out "${standaloneCertFile}" -days 365 -nodes -config "${configPath}"`);
    console.log('[server]: Generated self-signed certificate for 127.0.0.1');
  }

  const standaloneApp: Express = express();
  const keystoneOrigin = `https://${proxyEndpoint}`;
  const standaloneCorsOptions = {
    origin: [keystoneOrigin],
    optionsSuccessStatus: 200
  };

  standaloneApp.get('/GetDeviceInformation', cors(standaloneCorsOptions), (req, res) => {
    let mac_id = process.env.DEVICE_ID ?? '';
    if (!mac_id) {
      const net = networkInterfaces();
      const info: string[] = [];
      Object.keys(net).forEach(k => { info.push(...net[k]?.map(i => i.mac) ?? []); });
      mac_id = info.filter(i => i !== '00:00:00:00:00:00').sort().join(' ').replace(/:/g, '-');
    }
    const deviceInfo = `<?xml version="1.0"?>
<device type="c" xmlns="http://www.corelationinc.com/deviceLanguage/v1.0" version="2.0.0.0">
  <deviceInformation type="c">
  <identifier>${process.env.DEVICE_ID ? mac_id : `MAC: ${mac_id}`}</identifier>
  <userServicePortNumber>${standalonePort}</userServicePortNumber>
  </deviceInformation>
</device>`;
    res.send(deviceInfo);
  });
  standaloneApp.get('*', (req, res) => { res.send("okay") });

  const standaloneSslCert = readFileSync(standaloneCertFile);
  const standaloneSslKey = readFileSync(standaloneKeyFile);
  const standaloneServer = https.createServer({ key: standaloneSslKey, cert: standaloneSslCert }, standaloneApp);
  standaloneServer.listen(standalonePort, '127.0.0.1', () => {
    console.log(`[server]: Standalone Corelation Service mock is running at https://127.0.0.1:${standalonePort}`);
  });
}

if (protocol === 'http') {
  app.listen(hostPort, () => {
    console.log(`[server]: Server is running at http://localhost:${hostPort}`);
  });
  service.listen(servicePort, () => {
    console.log(`[server]: Corelation Service mock is running at http://localhost:${servicePort}`);
  });
} else {
  const certFile = process.env.SSL_CERT_PATH ?? '';
  const certKey = process.env.SSL_KEY_PATH ?? '';
  const certPhrase = process.env.SSL_PHRASE ?? '';
  const sslcert = readFileSync(certFile);
  const sslKey = readFileSync(certKey);
  const server = https.createServer({ key: sslKey, cert: sslcert, passphrase: certPhrase }, app);
  server.listen(hostPort, 'localhost', () => {
    console.log(`[server]: Server is running at https://localhost:${hostPort}`);
  });

  const secureService = https.createServer({ key: sslKey, cert: sslcert, passphrase: certPhrase }, service);
  secureService.listen(servicePort, 'localhost', () => {
    console.log(`[server]: Corelation Service mock is running at https://localhost:${servicePort}`);
  });
}
