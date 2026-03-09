import { registerFeature } from '../shell/FeatureRegistry'
import { Files, Search, Settings2, Settings, User, Database, Package } from 'lucide-react'

// Components
import { ScriptExplorerPanel } from './script-explorer/ScriptExplorerPanel'
import { EditorWorkspace } from './editor/EditorWorkspace'
import LoginStatusBarItem from './login/LoginStatusBarItem'
import LoginOverlay from './login/LoginOverlay'
import RunButton from './script-runner/RunButton'
import ConsoleTab from './console/ConsoleTab'
import InspectorTab from './inspector/InspectorTab'
import TerminalTab from './terminal/TerminalTab'
import { SearchPanel } from './search/SearchPanel'
import { ScriptOptionsPanel } from './script-options/ScriptOptionsPanel'
import { SettingsPanel } from './settings/SettingsPanel'
import { UserInfoPanel } from './user-info/UserInfoPanel'
import { TableBrowserSidebar, TableBrowserDetail } from './table-browser/TableBrowserPanel'
import { QueryBuilderPanel } from './query-builder/QueryBuilderPanel'
import { AppBuilderSidebar, AppBuilderOutput } from './app-builder/AppBuilderPanel'
import { useAuthStore } from '../store/useAuthStore'

// -- Login --
registerFeature({
  id: 'login',
  name: 'Authentication',
  initialize: async () => {
    // Get config for instance and proxy info
    const config = await window.api?.getConfig().catch(() => null)
    const instance = config?.supportedInstances?.[0] || 'Test'

    // Set instance on proxy
    await fetch(`/${instance}`, { method: 'GET' }).catch(() => {})

    // Check for existing session (POST with loginStatus=Y to avoid 401 on GET)
    try {
      const response = await fetch('/UserLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'loginStatus=Y'
      })
      if (response.ok) {
        const text = await response.text()
        try {
          const data = JSON.parse(text)
          if (data.success) {
            useAuthStore.getState().setLogin(
              data.userName || 'Logged In',
              instance,
              data.JSESSIONID,
              data
            )
            return // Already logged in
          }
        } catch { /* not JSON, continue to SSO */ }
      }
    } catch (e) {
      console.warn('Session check failed', e)
    }

    // Attempt automatic Kerberos SSO via hidden iframe
    // The iframe must hit Keystone DIRECTLY (not through localhost proxy)
    // because Kerberos tokens are bound to the target hostname
    try {
      if (!config?.proxyEndpoint) return

      // Get device identifier
      let deviceIdentifier = ''
      try {
        const deviceRes = await fetch('/GetDeviceInformation')
        const deviceXml = await deviceRes.text()
        const match = deviceXml.match(/<identifier>(.*?)<\/identifier>/)
        if (match) deviceIdentifier = match[1]
      } catch { /* optional */ }

      // Build direct Keystone URL for SSO
      const endpoint = config.proxyEndpoint
      const proto = endpoint.endsWith(':8443') || endpoint.endsWith(':443') ? 'https' : 'http'
      const keystoneUrl = endpoint.startsWith('http') ? endpoint : `${proto}://${endpoint}`
      const params = new URLSearchParams({
        loginDeviceIdentifier: deviceIdentifier,
        loginDeviceInsertOption: 'N'
      })
      const ssoUrl = `${keystoneUrl}/${instance}/UserLogin?${params.toString()}`

      await new Promise<void>((resolve) => {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = ssoUrl
        document.body.appendChild(iframe)

        const timeout = setTimeout(() => {
          document.body.removeChild(iframe)
          resolve()
        }, 6000)

        iframe.onload = () => {
          clearTimeout(timeout)
          try {
            const doc = iframe.contentDocument || iframe.contentWindow?.document
            const text = doc?.body?.innerText || ''
            const data = JSON.parse(text)
            if (data.success && data.userName) {
              // Share JSESSIONID with the Express proxy so it can authenticate requests to Keystone
              fetch('/api/sso-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jsessionId: data.JSESSIONID })
              }).catch(() => {})
              useAuthStore.getState().setLogin(data.userName, instance, data.JSESSIONID, data)
              console.log(`SSO login successful: ${data.userName}`)
            }
          } catch { /* SSO not available or cross-origin */ }
          document.body.removeChild(iframe)
          resolve()
        }

        iframe.onerror = () => {
          clearTimeout(timeout)
          document.body.removeChild(iframe)
          resolve()
        }
      })
    } catch (e) {
      console.warn('SSO auto-login not available', e)
    }
  },
  statusBarItems: [
    {
      id: 'login-status',
      position: 'left',
      render: () => <LoginStatusBarItem />
    }
  ],
  overlays: [() => <LoginOverlay />]
})

// -- Script Explorer --
registerFeature({
  id: 'script-explorer',
  name: 'Script Explorer',
  sidebarPanels: [
    {
      id: 'script-explorer',
      name: 'Explorer',
      icon: Files,
      render: () => <ScriptExplorerPanel />
    }
  ]
})

// -- Editor --
registerFeature({
  id: 'editor',
  name: 'Code Editor',
  mainPanels: [
    {
      id: 'editor-workspace',
      render: () => <EditorWorkspace />
    }
  ]
})

// -- Script Runner --
registerFeature({
  id: 'script-runner',
  name: 'Script Runner',
  requires: ['editor'],
  toolbarItems: [
    {
      id: 'run-button',
      position: 'left',
      render: () => <RunButton />
    }
  ]
})

// -- Console --
registerFeature({
  id: 'console',
  name: 'Console',
  bottomTabs: [
    {
      id: 'console',
      name: 'Console',
      render: () => <ConsoleTab />
    }
  ]
})

// -- Inspector --
registerFeature({
  id: 'inspector',
  name: 'Inspector',
  bottomTabs: [
    {
      id: 'inspector',
      name: 'Inspector',
      render: () => <InspectorTab />
    }
  ]
})

// -- Terminal --
registerFeature({
  id: 'terminal',
  name: 'Terminal',
  bottomTabs: [
    {
      id: 'terminal',
      name: 'Terminal',
      render: () => <TerminalTab />
    }
  ]
})

// -- Script Options --
registerFeature({
  id: 'script-options',
  name: 'Script Options',
  sidebarPanels: [
    {
      id: 'script-options',
      name: 'Script Options',
      icon: Settings2,
      render: () => <ScriptOptionsPanel />
    }
  ]
})

// -- Table Browser --
registerFeature({
  id: 'table-browser',
  name: 'Table Browser',
  sidebarPanels: [
    {
      id: 'table-browser',
      name: 'Table Browser',
      icon: Database,
      render: () => <TableBrowserSidebar />
    }
  ],
  bottomTabs: [
    {
      id: 'table-detail',
      name: 'Table Detail',
      render: () => <TableBrowserDetail />
    }
  ]
})

// -- Query Builder --
registerFeature({
  id: 'query-builder',
  name: 'Query Builder',
  bottomTabs: [
    {
      id: 'query-builder',
      name: 'Query Builder',
      render: () => <QueryBuilderPanel />
    }
  ]
})

// -- App Builder --
registerFeature({
  id: 'app-builder',
  name: 'App Builder',
  sidebarPanels: [
    {
      id: 'app-builder',
      name: 'App Builder',
      icon: Package,
      render: () => <AppBuilderSidebar />
    }
  ],
  bottomTabs: [
    {
      id: 'app-builder-output',
      name: 'Build Output',
      render: () => <AppBuilderOutput />
    }
  ]
})

// -- Search --
registerFeature({
  id: 'search',
  name: 'Search',
  sidebarPanels: [
    {
      id: 'search-panel',
      name: 'Search',
      icon: Search,
      render: () => <SearchPanel />
    }
  ]
})

// -- User Info --
registerFeature({
  id: 'user-info',
  name: 'User Info',
  sidebarPanels: [
    {
      id: 'user-info',
      name: 'User Info',
      icon: User,
      render: () => <UserInfoPanel />
    }
  ]
})

// -- Settings --
registerFeature({
  id: 'settings',
  name: 'Settings',
  sidebarPanels: [
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      render: () => <SettingsPanel />
    }
  ]
})
