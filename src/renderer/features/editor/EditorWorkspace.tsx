import React, { useCallback, useRef, useState } from 'react'
import MonacoEditor from './MonacoEditor'
import { useEditorStore } from './EditorStore'
import { useConsoleStore } from '../console/useConsoleStore'
import { useScriptOptionsStore } from '../script-options/ScriptOptionsStore'
import { useProjectStore } from '../../store/useProjectStore'
import { X, RefreshCw, Columns, Maximize2 } from 'lucide-react'

// ─── Script Preview ──────────────────────────────────────────

const ScriptWebview: React.FC<{ path: string; paramsId?: string; reloadKey?: number }> = ({ path, paramsId, reloadKey }) => {
  const instance = useScriptOptionsStore((s) => s.instance)
  const currentProject = useProjectStore((s) => s.currentProject)
  const [proxyPort, setProxyPort] = React.useState<number | null>(null)
  const isWebMode = !(window as any).electron
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const webviewRef = React.useRef<HTMLElement>(null)
  const initialReloadKey = React.useRef(reloadKey)

  React.useEffect(() => {
    window.api?.getConfig().then((config) => {
      setProxyPort(config.port)
    }).catch(() => {
      setProxyPort(3000)
    })
  }, [])

  // Hot reload: reload the existing iframe/webview in-place instead of
  // destroying and recreating it. This preserves CR.Login session state.
  React.useEffect(() => {
    if (reloadKey === initialReloadKey.current) return
    if (isWebMode && iframeRef.current) {
      try {
        iframeRef.current.contentWindow?.location.reload()
      } catch {
        // cross-origin fallback: re-assign src
        iframeRef.current.src = iframeRef.current.src
      }
    } else if (webviewRef.current) {
      (webviewRef.current as any).reload?.()
    }
  }, [reloadKey, isWebMode])

  const isDirectUrl = path.startsWith('http://') || path.startsWith('https://')

  if (!isDirectUrl && !proxyPort) {
    return <div className="h-full bg-[#1e1e1e] flex items-center justify-center text-[#858585] text-sm">Loading...</div>
  }

  let url: string
  if (isDirectUrl) {
    url = path
  } else {
    let scriptPath = path
    if (currentProject && path.startsWith(currentProject + '/')) {
      scriptPath = path.substring(currentProject.length + 1)
    }

    const base = isWebMode ? '' : `http://localhost:${proxyPort}`
    url = `${base}/${instance}/Keyscript_IDE/RunScript?scriptPath=${encodeURIComponent(scriptPath)}`
    if (paramsId) {
      url += `&scriptParametersId=${encodeURIComponent(paramsId)}`
    }
  }

  if (isWebMode) {
    return (
      <div className="h-full bg-white">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    )
  }

  return (
    <div className="h-full bg-white">
      <webview
        ref={webviewRef as any}
        src={url}
        className="w-full h-full"
        // @ts-expect-error webview attribute
        allowpopups=""
      />
    </div>
  )
}

// ─── Resizable Split Divider ─────────────────────────────────

const SplitDivider: React.FC<{ onDrag: (deltaX: number) => void }> = ({ onDrag }) => {
  const dragging = useRef(false)
  const lastX = useRef(0)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragging.current = true
    lastX.current = e.clientX

    const handleMouseMove = (me: MouseEvent) => {
      if (!dragging.current) return
      const delta = me.clientX - lastX.current
      lastX.current = me.clientX
      onDrag(delta)
    }
    const handleMouseUp = () => {
      dragging.current = false
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [onDrag])

  return (
    <div
      className="w-[4px] bg-[#252526] hover:bg-[#007acc] cursor-col-resize shrink-0 transition-colors"
      onMouseDown={handleMouseDown}
    />
  )
}

// ─── Main Workspace ──────────────────────────────────────────

export const EditorWorkspace: React.FC = () => {
  const { tabs, activeTabId, setActiveTabId, closeTab, splitPreview, previewVersion, closeSplitPreview, reloadPreview } = useEditorStore()
  const activeTab = tabs.find((t) => t.id === activeTabId)
  const addConsoleMessage = useConsoleStore((state) => state.addMessage)
  const [splitPercent, setSplitPercent] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleDrag = useCallback((deltaX: number) => {
    if (!containerRef.current) return
    const width = containerRef.current.offsetWidth
    const deltaPercent = (deltaX / width) * 100
    setSplitPercent((prev) => Math.min(80, Math.max(20, prev + deltaPercent)))
  }, [])

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

  if (tabs.length === 0 && !splitPreview) {
    return (
      <div className="h-full bg-[#1e1e1e] flex flex-col items-center justify-center text-[#858585] gap-4 select-none">
        <div className="text-4xl font-bold opacity-20">Keyscript IDE</div>
        <div className="text-sm">Select a script to open it</div>
      </div>
    )
  }

  const hasSplit = !!splitPreview

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

        {/* Split preview tab indicator */}
        {hasSplit && (
          <>
            <div className="mx-1 w-px h-4 bg-[#3c3c3c]" />
            <div className="flex items-center px-3 h-full text-xs select-none bg-[#1e1e1e] text-[#4ec9b0] border-r border-[#1e1e1e] border-t-2 border-t-[#4ec9b0] min-w-fit">
              <span className="mr-2 truncate max-w-[150px]">
                Preview: {splitPreview.path.split('/').pop()}
              </span>
              <button
                onClick={reloadPreview}
                className="hover:bg-[#383838] rounded p-0.5 text-[#858585] hover:text-[#4ec9b0] mr-1"
                title="Reload preview"
              >
                <RefreshCw size={11} />
              </button>
              <button
                onClick={closeSplitPreview}
                className="hover:bg-[#383838] rounded p-0.5 text-[#858585] hover:text-[#cccccc]"
                title="Close preview"
              >
                <X size={12} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Editor + Preview Content */}
      <div className="flex-1 overflow-hidden flex" ref={containerRef}>
        {/* Left pane — editor */}
        <div
          className="h-full overflow-hidden"
          style={{ width: hasSplit ? `${splitPercent}%` : '100%' }}
        >
          {activeTab && !activeTab.isExecuting && (
            <MonacoEditor key={activeTab.id} path={activeTab.path} />
          )}
          {activeTab && activeTab.isExecuting && (
            <ScriptWebview path={activeTab.path} paramsId={activeTab.paramsId} />
          )}
        </div>

        {/* Divider + Right pane — split preview */}
        {hasSplit && (
          <>
            <SplitDivider onDrag={handleDrag} />
            <div
              className="h-full overflow-hidden relative"
              style={{ width: `${100 - splitPercent}%` }}
            >
              <ScriptWebview
                path={splitPreview.path}
                paramsId={splitPreview.paramsId}
                reloadKey={previewVersion}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
