import React, { useEffect, useState } from 'react'
import { Globe, Server, HardDrive, Trash2 } from 'lucide-react'

export const SettingsPanel: React.FC = () => {
  const [config, setConfig] = useState<{
    proxyEndpoint: string
    supportedInstances: string[]
    port: number
  } | null>(null)
  const [credentialStatus, setCredentialStatus] = useState<string>('')
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  useEffect(() => {
    window.api?.getConfig().then(setConfig).catch(() => {})
    window.api?.loadCredentials().then((creds) => {
      setCredentialStatus(creds?.username ? creds.username : '')
    }).catch(() => setCredentialStatus(''))
  }, [])

  const handleClearCredentials = async () => {
    await window.api?.clearCredentials()
    setCredentialStatus('')
    setShowClearConfirm(false)
  }

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="p-3 space-y-1">

        {/* Connection group */}
        <SettingsGroup label="Connection">
          <SettingsItem
            label="Keystone Server"
            description="Remote Keystone endpoint for API proxying"
          >
            <div className="flex items-center gap-1.5 mt-1">
              <Globe size={13} className="text-[#569cd6] shrink-0" />
              <code className="text-[12px] text-[#ce9178] bg-[#1e1e1e] rounded px-1.5 py-0.5 truncate">
                {config?.proxyEndpoint || '—'}
              </code>
            </div>
          </SettingsItem>

          <SettingsItem
            label="Dev Server Port"
            description="Local proxy port for script execution"
          >
            <code className="text-[12px] text-[#b5cea8] bg-[#1e1e1e] rounded px-1.5 py-0.5">
              {config?.port || '—'}
            </code>
          </SettingsItem>

          <SettingsItem
            label="Instances"
            description="Available Keystone environments"
          >
            <div className="flex flex-wrap gap-1 mt-1">
              {(config?.supportedInstances || []).map((inst) => (
                <span
                  key={inst}
                  className="text-[11px] px-1.5 py-0.5 rounded bg-[#1e1e1e] text-[#cccccc] border border-[#333333]"
                >
                  {inst}
                </span>
              ))}
            </div>
          </SettingsItem>
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
            description="Electron + React + Monaco development environment for Keystone scripts"
          >
            <div className="flex items-center gap-3 mt-1 text-[11px] text-[#858585]">
              <span>{navigator.platform}</span>
            </div>
          </SettingsItem>
        </SettingsGroup>

        {/* Hint */}
        <div className="pt-2 text-[11px] text-[#5a5a5a] leading-relaxed">
          Connection settings are configured via the <code className="text-[#ce9178]">.env</code> file
          in the project root.
        </div>

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
