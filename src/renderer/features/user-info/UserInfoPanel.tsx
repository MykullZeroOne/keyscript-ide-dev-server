import React, { useState } from 'react'
import {
  User, Database, Calendar, Server, Key, Monitor,
  LogOut, Copy, Check, ChevronDown, ChevronRight, Shield
} from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'

export const UserInfoPanel: React.FC = () => {
  const { isLoggedIn, username, instance, jsessionId, loginData, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    fetch('/api/sso-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsessionId: '' })
    }).catch(() => {})
  }

  if (!isLoggedIn) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 px-6">
        <div className="w-14 h-14 rounded-full bg-[#2a2d2e] flex items-center justify-center">
          <User size={24} className="text-[#5a5a5a]" />
        </div>
        <div className="text-center">
          <div className="text-[13px] text-[#cccccc] mb-1">Not signed in</div>
          <div className="text-[11px] text-[#5a5a5a] leading-relaxed">
            Click the status bar to connect to a Keystone instance
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Profile card */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#007acc] to-[#0063a5] flex items-center justify-center text-white font-semibold text-base shadow-lg shadow-[#007acc]/20">
            {(username || '?')[0].toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-medium text-white truncate">{username}</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ec9b0]" />
              <span className="text-[11px] text-[#858585]">{instance}</span>
              {loginData?.ssoLogin && (
                <span className="text-[10px] text-[#4ec9b0]/70 bg-[#4ec9b0]/10 rounded px-1 py-px ml-1">SSO</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info sections */}
      <div className="px-3 pb-3 space-y-0.5">

        {/* Session */}
        <InfoSection title="Session" defaultOpen>
          <InfoField label="Session ID" value={jsessionId} mono copyable />
          <InfoField label="User Serial" value={loginData?.userSerial} />
          <InfoField label="Auth Type" value={loginData?.ssoLogin ? 'Kerberos SSO' : 'Username / Password'} />
        </InfoSection>

        {/* Server */}
        <InfoSection title="Server" defaultOpen>
          <InfoField label="Database" value={loginData?.databaseName} icon={Database} />
          <InfoField label="Location" value={loginData?.locationName} icon={Server} />
          <InfoField label="Posting Date" value={loginData?.postingDate} icon={Calendar} />
          <InfoField label="Device" value={loginData?.deviceName} icon={Monitor} />
        </InfoSection>

        {/* Extra fields */}
        {loginData && (() => {
          const shownKeys = new Set([
            'success', 'userName', 'userSerial', 'JSESSIONID', 'databaseName',
            'locationName', 'postingDate', 'deviceName', 'ssoLogin', 'logonHTML',
            'activeDirectoryLogonEnabled', 'exception'
          ])
          const extras = Object.entries(loginData).filter(
            ([k, v]) => !shownKeys.has(k) && v !== undefined && v !== null && v !== ''
          )
          if (extras.length === 0) return null
          return (
            <InfoSection title="Additional">
              {extras.map(([k, v]) => (
                <InfoField key={k} label={k} value={String(v)} />
              ))}
            </InfoSection>
          )
        })()}
      </div>

      {/* Logout */}
      <div className="mt-auto p-3 border-t border-[#2a2d2e]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 h-[30px] text-[12px] text-[#cccccc] hover:text-white bg-[#2a2d2e] hover:bg-[#383838] rounded-md transition-colors"
        >
          <LogOut size={13} />
          Sign out
        </button>
      </div>
    </div>
  )
}

const InfoSection: React.FC<{
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}> = ({ title, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 w-full h-[26px] text-[11px] font-semibold text-[#cccccc] hover:text-white uppercase tracking-wide"
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {title}
      </button>
      {open && <div className="pb-2 space-y-px">{children}</div>}
    </div>
  )
}

const InfoField: React.FC<{
  label: string
  value?: string | null
  icon?: React.FC<{ size?: number; className?: string }>
  mono?: boolean
  copyable?: boolean
}> = ({ label, value, icon: Icon, mono, copyable }) => {
  const [copied, setCopied] = useState(false)
  const displayValue = value || '—'

  const handleCopy = () => {
    if (!value) return
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="group flex items-start gap-2 rounded px-2 py-1.5 hover:bg-[#2a2d2e]">
      {Icon && <Icon size={13} className="text-[#858585] mt-px shrink-0" />}
      <div className="flex-1 min-w-0">
        <div className="text-[10px] text-[#858585] leading-none mb-1">{label}</div>
        <div className={`text-[12px] ${mono ? 'font-mono text-[11px]' : ''} text-[#cccccc] break-all leading-tight`}>
          {displayValue}
        </div>
      </div>
      {copyable && value && (
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 w-5 h-5 flex items-center justify-center rounded text-[#858585] hover:text-white hover:bg-[#383838] transition-all mt-px"
          title="Copy"
        >
          {copied ? <Check size={12} className="text-[#4ec9b0]" /> : <Copy size={12} />}
        </button>
      )}
    </div>
  )
}
