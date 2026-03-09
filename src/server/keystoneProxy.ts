/**
 * Keystone proxy for web/Docker mode.
 * Adapted from src/main/proxy.ts — handles forwarding to Keystone with
 * JSESSIONID injection and device ID passthrough.
 */
import { Express, Request } from 'express'
import proxy from 'express-http-proxy'
import bodyParser from 'body-parser'
import { request as httpsRequest } from 'https'
import { request as httpRequest } from 'http'
import { readdir } from 'fs/promises'
import { existsSync, readFileSync } from 'fs'
import path from 'path'
import { networkInterfaces } from 'os'
import sprightlyExpress from 'sprightly/express'

let KSInstance = ''
const ideParamsData: Record<string, string> = {}
let ideParamsSeq = 0
let activeProjectPath = ''
let ssoSessionId = ''

const KeybridgeEndpoints = ['/DirectXMLPostJSON', '/UserLogin', '/LoginUserInterface', '/TableListJSON', '/TableBrowser', '/SearchJSON', '/SessionStore']

export function setupKeystoneProxy(
  app: Express,
  rootPath: string,
  hostPort: number,
  proxyEndpoint: string,
  supportedInstances: string[]
): void {
  KSInstance = supportedInstances[0] || 'Test'

  const se = sprightlyExpress({
    cache: false,
    keyFallback: '----',
    throwOnKeyNotfound: false
  })
  app.engine('html', se as any)
  app.set('views', path.join(rootPath, 'views'))

  const useHttps = proxyEndpoint.startsWith('https') || proxyEndpoint.endsWith(':8443') || proxyEndpoint.endsWith(':443')
  const proxyUrl = useHttps && !proxyEndpoint.startsWith('https') ? `https://${proxyEndpoint}` : proxyEndpoint

  // ─── SSO Session ─────────────────────────────────────────

  app.post('/api/sso-session', bodyParser.json(), (req, res) => {
    if (req.body?.jsessionId) {
      ssoSessionId = req.body.jsessionId
      console.log(`SSO session established: ${ssoSessionId.substring(0, 8)}...`)
      res.json({ success: true })
    } else {
      res.status(400).json({ error: 'Missing jsessionId' })
    }
  })

  // ─── Device ID ───────────────────────────────────────────
  // In web mode, the thin client sends X-Device-Identifier header.
  // We store it per-session and include it in Keystone login requests.

  let deviceIdentifier = ''

  app.post('/api/device-id', bodyParser.json(), (req, res) => {
    deviceIdentifier = req.body?.deviceId || ''
    console.log(`Device identifier set: ${deviceIdentifier.substring(0, 30)}...`)
    res.json({ success: true })
  })

  // Mock device info endpoint (fallback when no Go service)
  app.get('/GetDeviceInformation', (_req, res) => {
    if (deviceIdentifier) {
      const deviceInfo = `<?xml version="1.0"?>
<device type="c" xmlns="http://www.corelationinc.com/deviceLanguage/v1.0" version="2.0.0.0">
  <deviceInformation type="c">
  <identifier>${deviceIdentifier}</identifier>
  <userServicePortNumber>3001</userServicePortNumber>
  </deviceInformation>
</device>`
      res.type('text/xml').send(deviceInfo)
      return
    }
    // Fallback to MAC addresses
    const net = networkInterfaces()
    const info: string[] = []
    Object.keys(net).forEach(k => { info.push(...(net[k]?.map(i => i.mac) ?? [])) })
    const macId = info.filter(i => i !== '00:00:00:00:00:00').sort().join(' ').replace(/:/g, '-')
    const deviceInfo = `<?xml version="1.0"?>
<device type="c" xmlns="http://www.corelationinc.com/deviceLanguage/v1.0" version="2.0.0.0">
  <deviceInformation type="c">
  <identifier>MAC: ${macId}</identifier>
  <userServicePortNumber>3001</userServicePortNumber>
  </deviceInformation>
</device>`
    res.type('text/xml').send(deviceInfo)
  })

  // ─── Project Management ──────────────────────────────────

  app.post('/api/set-project', bodyParser.json(), (req, res) => {
    activeProjectPath = req.body?.path || ''
    console.log(`Active project: ${activeProjectPath || '(none)'}`)
    res.json({ success: true })
  })

  app.get('/api/get-project', (_req, res) => {
    res.json({ path: activeProjectPath })
  })

  app.get('/project-scripts/*', (req, res) => {
    if (!activeProjectPath) return res.status(404).send('No project loaded')
    const relative = req.params[0]
    const file = path.join(activeProjectPath, relative)
    if (existsSync(file)) {
      res.type('application/javascript').sendFile(file)
    } else {
      res.status(404).send(`Script not found: ${file}`)
    }
  })

  // ─── Keyscript_IDE path rewriting ────────────────────────

  app.post('*/Keyscript_IDE/*', (req, _res, next) => {
    req.url = req.url.replace('/Keyscript_IDE/', '/')
    next()
  })

  app.post('*/KeyscriptServlet/List', bodyParser.urlencoded({ extended: false }), async (req, res) => {
    const parent = req.body.node
    if (!parent || !parent.startsWith('KeyScripts')) return res.json([])
    const parentPath = parent.substring('KeyScripts'.length + 1)
    const scriptsDir = activeProjectPath
      ? path.join(activeProjectPath, parentPath)
      : path.join(rootPath, 'public/scripts', parentPath)
    if (!existsSync(scriptsDir)) return res.json([])
    const q = await readdir(scriptsDir, { withFileTypes: true })
    const nodes = q.filter(r => r.isDirectory() || r.name.endsWith('.js')).map(r => {
      if (r.isDirectory()) return { text: r.name, id: `${parent}\\${r.name}`, cls: 'folder' }
      const scriptPath = parentPath.length ? path.join(parentPath, r.name) : r.name
      return { text: r.name, id: `${parent}\\${r.name}`, leaf: true, cls: 'file', scriptPath: scriptPath.replace(/\\/g, '/') }
    })
    res.json(nodes)
  })

  // ─── DirectXMLPostJSON ───────────────────────────────────

  app.post('/DirectXMLPostJSON', bodyParser.raw({ type: ['text/xml', 'application/xml', 'application/x-www-form-urlencoded', 'text/plain'], limit: '1mb' }), (req, res) => {
    const raw = req.body instanceof Buffer ? req.body.toString('utf-8') : (req.body || '')
    const xmlBody = typeof raw === 'string' && raw.startsWith('crXMLData=')
      ? decodeURIComponent(raw.substring('crXMLData='.length).replace(/\+/g, ' '))
      : raw

    const targetUrl = new URL(`/${KSInstance}/DirectXMLPostJSON`, proxyUrl)
    const isHttps = targetUrl.protocol === 'https:'
    const reqFn = isHttps ? httpsRequest : httpRequest

    const headers: Record<string, string> = {
      'Content-Type': 'text/xml',
      'Content-Length': Buffer.byteLength(xmlBody).toString()
    }
    if (ssoSessionId) headers['Cookie'] = `JSESSIONID=${ssoSessionId}`

    const proxyReq = reqFn({
      hostname: targetUrl.hostname,
      port: targetUrl.port,
      path: targetUrl.pathname,
      method: 'POST',
      headers,
      rejectUnauthorized: false
    } as any, (proxyRes) => {
      let data = ''
      proxyRes.on('data', (chunk: Buffer) => { data += chunk.toString() })
      proxyRes.on('end', () => {
        res.status(proxyRes.statusCode || 500)
        res.set('Content-Type', proxyRes.headers['content-type'] || 'application/json')
        res.send(data)
      })
    })
    proxyReq.on('error', (err) => {
      res.status(502).json({ error: 'Proxy failed', detail: err.message })
    })
    proxyReq.write(xmlBody)
    proxyReq.end()
  })

  // ─── SearchJSON ──────────────────────────────────────────

  app.post('/SearchJSON', bodyParser.raw({ type: ['text/xml', 'application/xml', 'application/x-www-form-urlencoded', 'text/plain'], limit: '1mb' }), (req, res) => {
    const raw = req.body instanceof Buffer ? req.body.toString('utf-8') : (req.body || '')
    const xmlBody = typeof raw === 'string' && raw.startsWith('crXMLData=')
      ? decodeURIComponent(raw.substring('crXMLData='.length).replace(/\+/g, ' '))
      : raw

    const targetUrl = new URL(`/${KSInstance}/SearchJSON`, proxyUrl)
    const isHttps = targetUrl.protocol === 'https:'
    const reqFn = isHttps ? httpsRequest : httpRequest

    const headers: Record<string, string> = {
      'Content-Type': 'text/xml',
      'Content-Length': Buffer.byteLength(xmlBody).toString()
    }
    if (ssoSessionId) headers['Cookie'] = `JSESSIONID=${ssoSessionId}`

    const proxyReq = reqFn({
      hostname: targetUrl.hostname,
      port: targetUrl.port,
      path: targetUrl.pathname,
      method: 'POST',
      headers,
      rejectUnauthorized: false
    } as any, (proxyRes) => {
      let data = ''
      proxyRes.on('data', (chunk: Buffer) => { data += chunk.toString() })
      proxyRes.on('end', () => {
        res.status(proxyRes.statusCode || 500)
        res.set('Content-Type', proxyRes.headers['content-type'] || 'application/json')
        res.send(data)
      })
    })
    proxyReq.on('error', (err) => {
      res.status(502).json({ error: 'Proxy failed', detail: err.message })
    })
    proxyReq.write(xmlBody)
    proxyReq.end()
  })

  // ─── UserLogin ───────────────────────────────────────────

  app.get('/UserLogin', proxy(proxyUrl, {
    https: useHttps,
    proxyReqOptDecorator: (opts) => {
      if (useHttps) (opts as any).rejectUnauthorized = false
      return opts
    },
    proxyReqPathResolver: (req) => `/${KSInstance}${req.url}`
  }))

  // ─── Catch-all POST proxy ────────────────────────────────

  app.post('*', proxy(proxyUrl, {
    https: useHttps,
    proxyReqOptDecorator: (proxyReqOpts) => {
      if (useHttps) (proxyReqOpts as any).rejectUnauthorized = false
      if (ssoSessionId) {
        proxyReqOpts.headers = proxyReqOpts.headers || {}
        const existingCookie = (proxyReqOpts.headers.cookie as string) || ''
        const cleanedCookie = existingCookie.replace(/JSESSIONID=[^;]*(;\s*)?/g, '').replace(/;\s*$/, '')
        proxyReqOpts.headers.cookie = cleanedCookie
          ? `JSESSIONID=${ssoSessionId}; ${cleanedCookie}`
          : `JSESSIONID=${ssoSessionId}`
      }
      // Forward device identifier from thin client
      if (deviceIdentifier) {
        proxyReqOpts.headers = proxyReqOpts.headers || {}
        proxyReqOpts.headers['X-Device-Identifier'] = deviceIdentifier
      }
      return proxyReqOpts
    },
    proxyReqPathResolver: (req) => {
      if (req.path.startsWith('/Keyscript_IDE/'))
        return req.url.replace(/^\/Keyscript_IDE/, `/${KSInstance}`)
      if (KeybridgeEndpoints.includes(req.path))
        return `/${KSInstance}${req.url}`
      if (!req.path.startsWith(`/${KSInstance}`))
        return `/${KSInstance}${req.url}`
      return req.url
    },
    proxyReqBodyDecorator: (bodyContent: Buffer, srcReq: Request) => {
      let bodyStr = bodyContent.toString('utf-8')
      if (ssoSessionId && bodyStr.includes('JSESSIONID=')) {
        bodyStr = bodyStr.replace(/JSESSIONID=[^&]+/, `JSESSIONID=${ssoSessionId}`)
        bodyContent = Buffer.from(bodyStr, 'utf-8')
      }
      if (srcReq.originalUrl.endsWith('/SessionStore')) {
        const seq = `//${++ideParamsSeq}//`
        const usp = new URLSearchParams(bodyContent.toString('utf-8'))
        ;(srcReq as any).params = { ...(srcReq as any).params, seq }
        ideParamsData[seq] = usp.get('value') ?? ''
      }
      return bodyContent
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      if (userReq.originalUrl.endsWith('/SessionStore')) {
        try {
          const store = JSON.parse(proxyResData.toString('utf-8')) as { success: boolean; id: string }
          const seq = (userReq as any).params.seq
          const params = ideParamsData[seq]
          delete ideParamsData[seq]
          if (store.success) ideParamsData[store.id] = params
        } catch {}
      } else if (userReq.originalUrl.endsWith('/UserLogin')) {
        try {
          const data = JSON.parse(proxyResData.toString('utf8'))
          if (data.JSESSIONID) {
            // Auto-capture JSESSIONID from login response
            ssoSessionId = data.JSESSIONID
            console.log(`Session captured from login: ${ssoSessionId.substring(0, 8)}...`)
            const cookies = proxyRes.headers['set-cookie'] ?? []
            const newCookies = cookies.map(c => c.replace(/Path=\/\w+;/, 'Path=/;'))
            userRes.setHeader('set-cookie', newCookies)
          }
        } catch {}
      }
      return proxyResData
    }
  }))

  // ─── RunScript handler ───────────────────────────────────

  const headElement = existsSync(path.join(rootPath, 'views/templates/head-section.html'))
    ? readFileSync(path.join(rootPath, 'views/templates/head-section.html')).toString('utf8')
        .replace(/{{ protocol }}/g, 'http')
        .replace(/{{ hostPort }}/g, `${hostPort}`)
        .replace(/{{ servicePort }}/g, `${hostPort + 1}`)
        .replace(/{{ serviceBaseUrl }}/g, `http://localhost:${hostPort}`)
        .replace(/{{ instance }}/g, KSInstance)
    : ''

  app.get(supportedInstances.map(i => `/${i}/Keyscript_IDE/RunScript`), (req, res) => {
    const scriptPath = req.query.scriptPath as string
    const js = scriptPath.substring(0, scriptPath.length - 3)
    const projectFile = activeProjectPath ? path.join(activeProjectPath, `${js}.js`) : ''
    const defaultFile = path.join(rootPath, `public/scripts/${js}.js`)
    const useProject = projectFile && existsSync(projectFile)
    const file = useProject ? projectFile : defaultFile

    const parametersId = req.query.scriptParametersId?.toString() ?? '-'
    const storedParams = ideParamsData[parametersId]
    delete ideParamsData[parametersId]

    let params: { crlogin: Record<string, string>; crscript: Record<string, string> }
    try {
      params = storedParams ? JSON.parse(storedParams) : { crlogin: {}, crscript: {} }
    } catch {
      params = { crlogin: {}, crscript: {} }
    }
    if (ssoSessionId) params.crlogin.JSESSIONID = ssoSessionId
    params.crlogin.instance = params.crlogin.instance || KSInstance
    const scriptParameters = JSON.stringify(params)

    if (ssoSessionId) res.cookie('JSESSIONID', ssoSessionId, { path: '/', httpOnly: false })

    if (existsSync(file)) {
      const scriptSrc = useProject ? `/project-scripts/${js}.js` : `/scripts/${js}.js`
      res.render('iframe-target.html', { script: js, 'head-section': headElement, scriptParameters, scriptSrc })
    } else {
      res.status(404).send('<html><body>Script not found.</body></html>')
    }
  })

  // ─── Instance handling ───────────────────────────────────

  app.get(supportedInstances.map(i => `/${i}`), (req, res) => {
    const parts = req.path.split('/')
    if (parts.length > 1) KSInstance = parts[1]
    res.json({ instance: KSInstance })
  })
  app.get(supportedInstances.map(i => `/${i}/*`), (req, _res, next) => {
    const parts = req.path.split('/')
    if (parts.length > 1) KSInstance = parts[1]
    next()
  })

  // Static files
  app.use(express.static(path.join(rootPath, 'public')))

  // ─── Catch-all GET proxy ─────────────────────────────────

  app.get('*', proxy(proxyUrl, {
    https: useHttps,
    proxyReqOptDecorator: (proxyReqOpts) => {
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
    proxyReqPathResolver: (req) => req.url
  }))
}
