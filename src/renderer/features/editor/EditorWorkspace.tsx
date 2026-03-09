import React from 'react'
import MonacoEditor from './MonacoEditor'
import { useEditorStore } from './EditorStore'
import { useConsoleStore } from '../console/useConsoleStore'
import { useScriptOptionsStore } from '../script-options/ScriptOptionsStore'
import { useProjectStore } from '../../store/useProjectStore'

const ScriptWebview: React.FC<{ path: string; paramsId?: string }> = ({ path, paramsId }) => {
  const instance = useScriptOptionsStore((s) => s.instance)
  const currentProject = useProjectStore((s) => s.currentProject)
  const [proxyPort, setProxyPort] = React.useState<number | null>(null)

  React.useEffect(() => {
    window.api?.getConfig().then((config) => {
      setProxyPort(config.port)
    }).catch(() => {
      setProxyPort(3000)
    })
  }, [])

  // If the path is already a full URL (dev server preview), use it directly
  const isDirectUrl = path.startsWith('http://') || path.startsWith('https://')

  if (!isDirectUrl && !proxyPort) {
    return <div className="h-full bg-[#1e1e1e] flex items-center justify-center text-[#858585] text-sm">Loading...</div>
  }

  let url: string
  if (isDirectUrl) {
    url = path
  } else {
    // Convert absolute project paths to relative for RunScript
    let scriptPath = path
    if (currentProject && path.startsWith(currentProject + '/')) {
      scriptPath = path.substring(currentProject.length + 1)
    }

    // Point webview directly at Express proxy (port 3000), not the Vite dev server
    url = `http://localhost:${proxyPort}/${instance}/Keyscript_IDE/RunScript?scriptPath=${encodeURIComponent(scriptPath)}`
    if (paramsId) {
      url += `&scriptParametersId=${encodeURIComponent(paramsId)}`
    }
  }

  return (
    <div className="h-full bg-white">
      <webview
        src={url}
        className="w-full h-full"
        // @ts-expect-error webview attribute
        allowpopups=""
      />
    </div>
  )
}

export const EditorWorkspace: React.FC = () => {
  const { tabs, activeTabId, setActiveTabId, closeTab } = useEditorStore()
  const activeTab = tabs.find((t) => t.id === activeTabId)
  const addConsoleMessage = useConsoleStore((state) => state.addMessage)

  React.useEffect(() => {
    const handleConsole = (e: any): void => {
      let level: 'info' | 'log' | 'warn' | 'error' = 'info'
      if (e.level === 2) level = 'warn'
      if (e.level === 3) level = 'error'
      addConsoleMessage(level, e.message)
    }

    const webviews = document.querySelectorAll('webview')
    webviews.forEach((wv) => {
      wv.removeEventListener('console-message', handleConsole)
      wv.addEventListener('console-message', handleConsole)
    })
  }, [tabs, addConsoleMessage])

  if (tabs.length === 0) {
    return (
      <div className="h-full bg-[#1e1e1e] flex flex-col items-center justify-center text-[#858585] gap-4 select-none">
        <div className="text-4xl font-bold opacity-20">Keyscript IDE</div>
        <div className="text-sm">Select a script to open it</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Tab Bar */}
      <div className="flex bg-[#252526] border-b border-[#1e1e1e] overflow-x-auto overflow-y-hidden h-9 items-center">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`flex items-center px-3 h-full cursor-pointer text-xs border-r border-[#1e1e1e] select-none min-w-fit ${
              activeTabId === tab.id
                ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]'
                : 'text-[#858585] hover:bg-[#2d2d2d]'
            }`}
          >
            <span className="mr-2 truncate max-w-[150px]">
              {tab.isDirty ? '● ' : ''}
              {tab.name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeTab(tab.id)
              }}
              className="hover:bg-[#383838] rounded p-0.5 text-[#858585] hover:text-[#cccccc]"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab && !activeTab.isExecuting && (
          <MonacoEditor key={activeTab.id} path={activeTab.path} />
        )}
        {activeTab && activeTab.isExecuting && (
          <ScriptWebview path={activeTab.path} paramsId={activeTab.paramsId} />
        )}
      </div>
    </div>
  )
}
