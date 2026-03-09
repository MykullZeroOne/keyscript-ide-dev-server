import React, { useEffect, useState } from 'react'
import { Globe, Trash2, Plus, X, Save, RotateCcw } from 'lucide-react'

const SETTINGS_KEY = 'keyscript-settings'

interface AppSettings {
  proxyEndpoint: string
  supportedInstances: string[]
  port: number
}

/** Load user overrides from localStorage */
function loadSavedSettings(): Partial<AppSettings> {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

/** Save user overrides to localStorage */
function saveSettings(settings: Partial<AppSettings>): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

/** Push updated settings to the server/main process so the proxy uses them */
async function pushSettings(settings: Partial<AppSettings>): Promise<void> {
  if ((window as any).electron) {
    // Electron — save via IPC
    try {
      const { ipcRenderer } = (window as any).electron
      await ipcRenderer?.invoke?.('app:save-settings', settings)
    } catch {}
  } else {
    // Web/Docker — save via HTTP
    try {
      await fetch('/api/config/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
    } catch {}
  }
}

export const SettingsPanel: React.FC = () => {
  const [serverConfig, setServerConfig] = useState<AppSettings | null>(null)
  const [endpoint, setEndpoint] = useState('')
  const [instances, setInstances] = useState<string[]>([])
  const [newInstance, setNewInstance] = useState('')
  const [credentialStatus, setCredentialStatus] = useState<string>('')
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [saved, setSaved] = useState(false)
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    window.api?.getConfig().then((config) => {
      setServerConfig(config)
      // Apply any user overrides from localStorage
      const overrides = loadSavedSettings()
      setEndpoint(overrides.proxyEndpoint || config.proxyEndpoint || '')
      setInstances(overrides.supportedInstances || config.supportedInstances || [])
    }).catch(() => {})
    window.api?.loadCredentials().then((creds) => {
      setCredentialStatus(creds?.username ? creds.username : '')
    }).catch(() => setCredentialStatus(''))
  }, [])

  const handleClearCredentials = async () => {
    await window.api?.clearCredentials()
    setCredentialStatus('')
    setShowClearConfirm(false)
  }

  const handleSave = async () => {
    const overrides: Partial<AppSettings> = {
      proxyEndpoint: endpoint,
      supportedInstances: instances
    }
    saveSettings(overrides)
    await pushSettings(overrides)
    setSaved(true)
    setDirty(false)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    if (!serverConfig) return
    localStorage.removeItem(SETTINGS_KEY)
    setEndpoint(serverConfig.proxyEndpoint)
    setInstances(serverConfig.supportedInstances)
    setDirty(false)
    pushSettings({
      proxyEndpoint: serverConfig.proxyEndpoint,
      supportedInstances: serverConfig.supportedInstances
    })
  }

  const addInstance = () => {
    const name = newInstance.trim()
    if (!name || instances.includes(name)) return
    setInstances([...instances, name])
    setNewInstance('')
    setDirty(true)
  }

  const removeInstance = (inst: string) => {
    setInstances(instances.filter(i => i !== inst))
    setDirty(true)
  }

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="p-3 space-y-1">

        {/* Connection group */}
        <SettingsGroup label="Connection">
          <SettingsItem
            label="Keystone Server"
            description="Hostname and port of the Keystone endpoint"
          >
            <div className="flex items-center gap-1.5 mt-1">
              <Globe size={13} className="text-[#569cd6] shrink-0" />
              <input
                type="text"
                value={endpoint}
                onChange={(e) => { setEndpoint(e.target.value); setDirty(true) }}
                placeholder="keystonedev.revfcu.com:8443"
                className="flex-1 bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1 text-[12px] text-[#ce9178] font-mono focus:outline-none focus:border-[#007acc]"
              />
            </div>
          </SettingsItem>

          <SettingsItem
            label="Dev Server Port"
            description="Local proxy port for script execution"
          >
            <code className="text-[12px] text-[#b5cea8] bg-[#1e1e1e] rounded px-1.5 py-0.5">
              {serverConfig?.port || '—'}
            </code>
          </SettingsItem>

          <SettingsItem
            label="Instances"
            description="Available Keystone environments"
          >
            <div className="flex flex-wrap gap-1 mt-1">
              {instances.map((inst) => (
                <span
                  key={inst}
                  className="group text-[11px] px-1.5 py-0.5 rounded bg-[#1e1e1e] text-[#cccccc] border border-[#333333] flex items-center gap-1"
                >
                  {inst}
                  <button
                    onClick={() => removeInstance(inst)}
                    className="opacity-0 group-hover:opacity-100 text-[#858585] hover:text-[#f48771] transition-opacity"
                    title="Remove instance"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-1 mt-1.5">
              <input
                type="text"
                value={newInstance}
                onChange={(e) => setNewInstance(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') addInstance() }}
                placeholder="Add instance..."
                className="flex-1 bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1 text-[11px] text-white placeholder-[#5a5a5a] focus:outline-none focus:border-[#007acc]"
              />
              <button
                onClick={addInstance}
                className="px-1.5 bg-[#383838] hover:bg-[#4c4c4c] rounded text-[#cccccc] hover:text-white transition-colors"
                title="Add instance"
              >
                <Plus size={12} />
              </button>
            </div>
          </SettingsItem>

          {/* Save / Reset buttons */}
          <div className="flex gap-2 pt-2 px-3">
            <button
              onClick={handleSave}
              disabled={!dirty}
              className={`flex-1 flex items-center justify-center gap-1.5 h-[28px] text-[11px] rounded transition-colors ${
                saved
                  ? 'bg-[#4ec9b0]/20 text-[#4ec9b0] border border-[#4ec9b0]/30'
                  : dirty
                    ? 'bg-[#007acc] text-white hover:bg-[#1a8ad4]'
                    : 'bg-[#2a2d2e] text-[#5a5a5a] cursor-not-allowed'
              }`}
            >
              <Save size={12} />
              {saved ? 'Saved' : 'Save Settings'}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-1 h-[28px] px-3 text-[11px] text-[#858585] hover:text-[#cccccc] bg-[#2a2d2e] hover:bg-[#383838] rounded transition-colors"
              title="Reset to defaults"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>
        </SettingsGroup>

        {/* Security group */}
        <SettingsGroup label="Security">
          <SettingsItem
            label="Saved Credentials"
            description={credentialStatus
              ? `Encrypted credentials saved for "${credentialStatus}"`
              : 'No credentials saved. They will be stored encrypted on login.'}
          >
            {credentialStatus && (
              <>
                {!showClearConfirm ? (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#cccccc] hover:text-white transition-colors"
                  >
                    <Trash2 size={12} />
                    <span>Clear saved credentials</span>
                  </button>
                ) : (
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-[11px] text-[#cca700]">Are you sure?</span>
                    <button
                      onClick={handleClearCredentials}
                      className="text-[11px] text-[#f48771] hover:text-white font-medium"
                    >
                      Yes, clear
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="text-[11px] text-[#858585] hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </>
            )}
          </SettingsItem>
        </SettingsGroup>

        {/* About */}
        <SettingsGroup label="About">
          <SettingsItem
            label="Keyscript IDE"
            description="Development environment for Keystone scripts"
          >
            <div className="flex items-center gap-3 mt-1 text-[11px] text-[#858585]">
              <span>{navigator.platform}</span>
            </div>
          </SettingsItem>
        </SettingsGroup>

      </div>
    </div>
  )
}

const SettingsGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="pb-1">
    <div className="text-[11px] font-semibold text-[#cccccc] mb-1 mt-3 first:mt-0">{label}</div>
    <div className="space-y-px">{children}</div>
  </div>
)

const SettingsItem: React.FC<{
  label: string
  description?: string
  children?: React.ReactNode
}> = ({ label, description, children }) => (
  <div className="rounded-md px-3 py-2.5 hover:bg-[#2a2d2e] transition-colors">
    <div className="text-[12px] text-[#cccccc]">{label}</div>
    {description && (
      <div className="text-[11px] text-[#858585] mt-0.5 leading-relaxed">{description}</div>
    )}
    {children}
  </div>
)
