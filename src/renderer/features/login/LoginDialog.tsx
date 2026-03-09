import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { useScriptOptionsStore } from '../script-options/ScriptOptionsStore'
import { LogIn, Server, User, Lock, AlertCircle, Globe, Shield, Fingerprint } from 'lucide-react'

interface LoginDialogProps {
  isOpen: boolean
  onClose: () => void
}

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [instance, setInstance] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [ssoStatus, setSsoStatus] = useState<'idle' | 'attempting' | 'failed' | 'success'>('idle')
  const [proxyEndpoint, setProxyEndpoint] = useState('')
  const [supportedInstances, setSupportedInstances] = useState<string[]>([])
  const [showManualLogin, setShowManualLogin] = useState(false)
  const [deviceId, setDeviceId] = useState(() => localStorage.getItem('keyscript-device-id') || '')
  const setLogin = useAuthStore((state) => state.setLogin)

  useEffect(() => {
    if (!isOpen) return
    setError(null)
    setSsoStatus('idle')
    setShowManualLogin(false)

    window.api?.getConfig().then((config) => {
      setProxyEndpoint(config.proxyEndpoint)
      setSupportedInstances(config.supportedInstances)
      if (!instance && config.supportedInstances.length > 0) {
        setInstance(config.supportedInstances[0])
      }
    }).catch(() => {
      setSupportedInstances(['Test'])
      if (!instance) setInstance('Test')
    })

    // Load cached credentials
    window.api?.loadCredentials().then((creds) => {
      if (creds) {
        setUsername(creds.username)
        setPassword(creds.password)
      }
    }).catch(() => {})
  }, [isOpen])

  // Auto-attempt SSO when dialog opens and instance is set
  useEffect(() => {
    if (!isOpen || !instance || ssoStatus !== 'idle') return
    attemptSso()
  }, [isOpen, instance])

  const getDeviceIdentifier = async (): Promise<string> => {
    // Use user-specified device ID — persist and send to server
    const id = deviceId.trim()
    if (id) {
      localStorage.setItem('keyscript-device-id', id)
      await fetch('/api/device-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId: id })
      }).catch(() => {})
    }
    return id
  }

  const attemptSso = async () => {
    setSsoStatus('attempting')
    setError(null)

    try {
      // 1. Set instance on the proxy
      await fetch(`/${instance}`, { method: 'GET' }).catch(() => {})

      // 2. Get device identifier
      const deviceIdentifier = await getDeviceIdentifier()

      // 3. Attempt Kerberos SSO via hidden iframe
      // Must hit Keystone DIRECTLY — Kerberos tokens are bound to the target hostname
      if (!proxyEndpoint) {
        setSsoStatus('failed')
        setShowManualLogin(true)
        return
      }

      const proto = proxyEndpoint.endsWith(':8443') || proxyEndpoint.endsWith(':443') ? 'https' : 'http'
      const keystoneUrl = proxyEndpoint.startsWith('http') ? proxyEndpoint : `${proto}://${proxyEndpoint}`
      const params = new URLSearchParams({
        loginDeviceIdentifier: deviceIdentifier,
        loginDeviceInsertOption: 'N'
      })
      const ssoUrl = `${keystoneUrl}/${instance}/UserLogin?${params.toString()}`

      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = ssoUrl
      document.body.appendChild(iframe)

      // Wait for iframe to load and check response
      const timeout = setTimeout(() => {
        document.body.removeChild(iframe)
        setSsoStatus('failed')
        setShowManualLogin(true)
      }, 8000)

      iframe.onload = () => {
        clearTimeout(timeout)
        try {
          const doc = iframe.contentDocument || iframe.contentWindow?.document
          const text = doc?.body?.innerText || ''
          const data = JSON.parse(text)

          if (data.success && data.userName) {
            // Share JSESSIONID with Express proxy
            fetch('/api/sso-session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ jsessionId: data.JSESSIONID })
            }).catch(() => {})
            setLogin(data.userName, instance, data.JSESSIONID, data)
            useScriptOptionsStore.getState().setInstance(instance)
            setSsoStatus('success')
            document.body.removeChild(iframe)
            onClose()
            return
          }
        } catch {
          // Could not parse — might be cross-origin or HTML error page
        }
        document.body.removeChild(iframe)
        setSsoStatus('failed')
        setShowManualLogin(true)
      }

      iframe.onerror = () => {
        clearTimeout(timeout)
        document.body.removeChild(iframe)
        setSsoStatus('failed')
        setShowManualLogin(true)
      }
    } catch {
      setSsoStatus('failed')
      setShowManualLogin(true)
    }
  }

  const handleManualLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // 1. Set instance on the proxy
      await fetch(`/${instance}`, { method: 'GET' }).catch(() => {})

      // 2. Get device identifier
      const deviceIdentifier = await getDeviceIdentifier()

      // 3. Login with username/password
      const response = await fetch('/UserLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          loginUsername: username,
          loginPassword: password,
          loginDeviceIdentifier: deviceIdentifier,
          loginDeviceInsertOption: 'N'
        })
      })

      const text = await response.text()
      if (!response.ok) {
        setError(`Server error ${response.status}: ${text.substring(0, 200)}`)
        return
      }

      let data: any
      try {
        data = JSON.parse(text)
      } catch {
        setError(`Unexpected response from server: ${text.substring(0, 200)}`)
        return
      }

      if (data.success) {
        // Share JSESSIONID with Express proxy for subsequent requests
        fetch('/api/sso-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jsessionId: data.JSESSIONID })
        }).catch(() => {})
        // Cache credentials for next session
        window.api?.saveCredentials(username, password).catch(() => {})
        setLogin(data.userName || username, instance, data.JSESSIONID, data)
        useScriptOptionsStore.getState().setInstance(instance)
        onClose()
      } else {
        const msg = Array.isArray(data.exception)
          ? data.exception.join(' ')
          : data.exception || 'Login failed'
        setError(msg)
      }
    } catch (err) {
      setError('Connection failed — is the Keystone server reachable?')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-sm bg-[#252526] border border-[#414141] rounded-lg shadow-2xl">
        <div className="px-6 pt-5 pb-4 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#007acc] rounded-md">
              <LogIn className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Keystone Login</h2>
              <p className="text-[11px] text-[#858585]">Connect to a Keystone instance</p>
            </div>
          </div>
        </div>

        {/* SSO Attempting State */}
        {ssoStatus === 'attempting' && !showManualLogin && (
          <div className="px-6 py-8 flex flex-col items-center gap-3">
            <Shield className="w-8 h-8 text-[#007acc] animate-pulse" />
            <div className="text-sm text-white">Attempting SSO Login...</div>
            <div className="text-[11px] text-[#858585]">Using Kerberos authentication</div>
            <button
              onClick={() => { setSsoStatus('failed'); setShowManualLogin(true) }}
              className="mt-2 text-[10px] text-[#858585] hover:text-[#cccccc] underline"
            >
              Use username &amp; password instead
            </button>
          </div>
        )}

        {/* Manual Login Form */}
        {(showManualLogin || ssoStatus === 'failed') && (
          <form onSubmit={handleManualLogin} className="px-6 py-4 space-y-3">
            {ssoStatus === 'failed' && !error && (
              <div className="flex items-start gap-2 p-2.5 bg-[#3a3000]/40 border border-[#cca700]/30 rounded text-[#cca700] text-[11px]">
                <Shield className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>SSO login was not available. Enter credentials manually.</span>
              </div>
            )}

            {/* Server info (read-only) */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#858585] mb-1">
                Keystone Server
              </label>
              <div className="relative">
                <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#858585]" />
                <input
                  type="text"
                  value={proxyEndpoint}
                  readOnly
                  className="w-full bg-[#1e1e1e] border border-[#414141] rounded pl-8 pr-3 py-2 text-xs text-[#858585] cursor-default"
                  title="Configured in .env file"
                />
              </div>
              <p className="text-[9px] text-[#6e6e6e] mt-1">Set PROXY_ENDPOINT in .env to change</p>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#858585] mb-1">
                Instance
              </label>
              <div className="relative">
                <Server className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#858585]" />
                <select
                  value={instance}
                  onChange={(e) => setInstance(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-[#414141] rounded pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#007acc]"
                >
                  {supportedInstances.map((inst) => (
                    <option key={inst} value={inst}>{inst}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#858585] mb-1">
                Device ID
              </label>
              <div className="relative">
                <Fingerprint className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#858585]" />
                <input
                  type="text"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  placeholder="e.g. MAC: AA-BB-CC-DD-EE-FF"
                  className="w-full bg-[#1e1e1e] border border-[#414141] rounded pl-8 pr-3 py-2 text-xs text-white placeholder-[#6e6e6e] focus:outline-none focus:border-[#007acc]"
                />
              </div>
              <p className="text-[9px] text-[#6e6e6e] mt-1">Your Keystone device identifier</p>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#858585] mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#858585]" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full bg-[#1e1e1e] border border-[#414141] rounded pl-8 pr-3 py-2 text-xs text-white placeholder-[#6e6e6e] focus:outline-none focus:border-[#007acc]"
                  autoFocus
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#858585] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#858585]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-[#1e1e1e] border border-[#414141] rounded pl-8 pr-3 py-2 text-xs text-white placeholder-[#6e6e6e] focus:outline-none focus:border-[#007acc]"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-2.5 bg-[#5a1d1d]/40 border border-[#f48771]/30 rounded text-[#f48771] text-[11px]">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-3 py-2 border border-[#414141] rounded text-xs text-[#cccccc] hover:bg-[#383838] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-3 py-2 bg-[#007acc] hover:bg-[#1a8ad4] disabled:bg-[#004c7a] disabled:text-[#858585] rounded text-xs text-white font-medium transition-colors"
              >
                {isLoading ? 'Connecting...' : 'Login'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default LoginDialog
