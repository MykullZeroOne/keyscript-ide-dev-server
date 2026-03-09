import React, { useEffect, useState } from 'react'
import { useAppBuilderStore } from './AppBuilderStore'
import { useProjectStore } from '../../store/useProjectStore'
import { useEditorStore } from '../editor/EditorStore'
import { useShellStore } from '../../shell/ShellStore'
import { useScriptOptionsStore } from '../script-options/ScriptOptionsStore'
import { TEMPLATES } from './templates'
import type { BuildMessage } from './AppBuilderStore'
import {
  Package, Play, Eye, FolderPlus, Hammer, Loader2,
  CheckCircle2, XCircle, AlertTriangle, ChevronDown, ChevronRight, Square
} from 'lucide-react'

// ─── Sidebar Panel ───────────────────────────────────────────

export const AppBuilderSidebar: React.FC = () => {
  const currentProject = useProjectStore((s) => s.currentProject)
  const {
    entry, outfile, minify,
    building, lastBuildSuccess, lastBuildDuration, lastBuildSize,
    devServerRunning, devServerPort,
    setConfig, setConfigLoaded, setBuilding, setBuildResult, addBuildMessage,
    clearBuildMessages, setDevServer
  } = useAppBuilderStore()

  const [showTemplates, setShowTemplates] = useState(false)
  const [scaffolding, setScaffolding] = useState(false)

  // Load bundle config when project changes
  useEffect(() => {
    if (!currentProject) {
      setConfigLoaded(false)
      return
    }
    loadConfig()
  }, [currentProject])

  const loadConfig = async (): Promise<void> => {
    if (!currentProject) return
    try {
      const configContent = await window.api.readAbsolute(currentProject + '/keyscript.bundle.json')
      if (configContent) {
        const config = JSON.parse(configContent)
        setConfig(
          config.entry || 'src/index.jsx',
          config.outfile || 'dist/bundle.js',
          config.minify || false
        )
      }
      setConfigLoaded(true)
    } catch {
      setConfigLoaded(true)
    }
  }

  const handleScaffold = async (templateId: string): Promise<void> => {
    if (!currentProject) return
    setScaffolding(true)
    try {
      const template = TEMPLATES.find(t => t.id === templateId)
      if (!template) {
        addBuildMessage({ type: 'error', text: 'Template not found', timestamp: Date.now() })
        setScaffolding(false)
        return
      }
      const result = await window.api.scaffoldFiles(currentProject, template.files)
      if (result.success) {
        addBuildMessage({ type: 'success', text: `Created ${result.filesCreated.length} files from template`, timestamp: Date.now() })
        // Open the entry file
        if (template) {
          const entryFile = template.files.find(f => f.path.includes('index.'))
          if (entryFile) {
            useEditorStore.getState().openFile(
              currentProject + '/' + entryFile.path,
              entryFile.path.split('/').pop() || 'index.jsx'
            )
          }
        }
        await loadConfig()
        setShowTemplates(false)
        // Show build output
        useShellStore.getState().setBottomPanelVisible(true)
        useShellStore.getState().setActiveBottomTabId('app-builder-output')
      } else {
        addBuildMessage({ type: 'error', text: result.error || 'Scaffold failed', timestamp: Date.now() })
      }
    } catch (e: any) {
      addBuildMessage({ type: 'error', text: e.message, timestamp: Date.now() })
    }
    setScaffolding(false)
  }

  const handleBuild = async (): Promise<void> => {
    if (!currentProject || building) return
    clearBuildMessages()
    setBuilding(true)
    addBuildMessage({ type: 'info', text: 'Building...', timestamp: Date.now() })
    useShellStore.getState().setBottomPanelVisible(true)
    useShellStore.getState().setActiveBottomTabId('app-builder-output')

    try {
      const result = await window.api.bundleProject(currentProject, { entry, outfile, minify })
      const messages: BuildMessage[] = []
      for (const e of result.errors) {
        messages.push({ type: 'error', text: e.text, location: e.location, timestamp: Date.now() })
      }
      for (const w of result.warnings) {
        messages.push({ type: 'warning', text: w.text, location: w.location, timestamp: Date.now() })
      }
      if (result.success) {
        const sizeKb = (result.outputSize / 1024).toFixed(1)
        messages.push({
          type: 'success',
          text: `Bundle complete: ${sizeKb} KB in ${result.duration}ms → ${result.outputPath}`,
          timestamp: Date.now()
        })
      } else {
        messages.push({ type: 'error', text: 'Build failed', timestamp: Date.now() })
      }
      setBuildResult(result.success, result.duration, result.outputSize, messages)
    } catch (e: any) {
      setBuildResult(false, 0, 0, [
        { type: 'error', text: e.message || 'Build failed', timestamp: Date.now() }
      ])
    }
  }

  const handleBundleAndRun = async (): Promise<void> => {
    if (!currentProject) return
    await handleBuild()
    const store = useAppBuilderStore.getState()
    if (!store.lastBuildSuccess) return

    // Run the bundled file via the existing RunScript mechanism
    const bundlePath = currentProject + '/' + outfile

    // Store parameters and run
    try {
      const params = useScriptOptionsStore.getState().getScriptParameters()
      const res = await fetch('/SessionStore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `value=${encodeURIComponent(JSON.stringify(params))}`
      })
      const data = await res.json()
      const paramsId = data?.value || ''
      useEditorStore.getState().runScriptSplit(bundlePath, paramsId)
    } catch {
      // Run without params
      useEditorStore.getState().runScriptSplit(bundlePath)
    }
  }

  const handlePreview = async (): Promise<void> => {
    if (!currentProject) return

    if (devServerRunning) {
      // Stop
      try {
        await window.api.stopDevServer()
        setDevServer(false, null)
        addBuildMessage({ type: 'info', text: 'Dev server stopped', timestamp: Date.now() })
      } catch (e: any) {
        addBuildMessage({ type: 'error', text: e.message, timestamp: Date.now() })
      }
      return
    }

    // Start dev server
    clearBuildMessages()
    addBuildMessage({ type: 'info', text: 'Starting dev server...', timestamp: Date.now() })
    useShellStore.getState().setBottomPanelVisible(true)
    useShellStore.getState().setActiveBottomTabId('app-builder-output')

    try {
      const result = await window.api.startDevServer(currentProject, { entry })
      if ('error' in result) {
        addBuildMessage({ type: 'error', text: result.error, timestamp: Date.now() })
        return
      }
      setDevServer(true, result.port)
      addBuildMessage({
        type: 'success',
        text: `Dev server running on port ${result.port}`,
        timestamp: Date.now()
      })
      // Open preview in a new editor tab as a webview
      useEditorStore.getState().openPreview(
        `http://localhost:${result.port}`,
        'App Preview'
      )
    } catch (e: any) {
      addBuildMessage({ type: 'error', text: e.message, timestamp: Date.now() })
    }
  }

  if (!currentProject) {
    return (
      <div className="h-full p-4 text-[#858585] text-sm">
        <div className="flex items-center gap-2 mb-2">
          <Package size={16} />
          <span className="font-semibold text-[#cccccc]">App Builder</span>
        </div>
        <p>Open a project folder to use the App Builder.</p>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto text-sm">
      {/* Header */}
      <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-[#858585] font-semibold">
        App Builder
      </div>

      {/* New from Template */}
      <div className="px-3 mb-3">
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="flex items-center gap-1.5 w-full text-left text-[#cccccc] hover:text-white py-1"
        >
          {showTemplates ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <FolderPlus size={14} />
          <span>New from Template</span>
        </button>

        {showTemplates && (
          <div className="ml-5 mt-1 space-y-1">
            {TEMPLATES.map(t => (
              <button
                key={t.id}
                onClick={() => handleScaffold(t.id)}
                disabled={scaffolding}
                className="block w-full text-left px-2 py-1.5 rounded text-[#cccccc] hover:bg-[#2d2d2d] hover:text-white"
              >
                <div className="font-medium">{t.name}</div>
                <div className="text-[11px] text-[#858585]">{t.description}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bundle Config */}
      <div className="px-3 mb-3">
        <div className="text-[10px] uppercase tracking-wider text-[#858585] font-semibold mb-1">
          Bundle Config
        </div>

        <label className="block mb-1.5">
          <span className="text-[#858585] text-[11px]">Entry Point</span>
          <input
            type="text"
            value={entry}
            onChange={(e) => setConfig(e.target.value, outfile, minify)}
            className="w-full mt-0.5 px-2 py-1 bg-[#3c3c3c] border border-[#555] rounded text-[#cccccc] text-xs focus:border-[#007acc] outline-none"
          />
        </label>

        <label className="block mb-1.5">
          <span className="text-[#858585] text-[11px]">Output File</span>
          <input
            type="text"
            value={outfile}
            onChange={(e) => setConfig(entry, e.target.value, minify)}
            className="w-full mt-0.5 px-2 py-1 bg-[#3c3c3c] border border-[#555] rounded text-[#cccccc] text-xs focus:border-[#007acc] outline-none"
          />
        </label>

        <label className="flex items-center gap-2 text-[#cccccc] text-xs cursor-pointer">
          <input
            type="checkbox"
            checked={minify}
            onChange={(e) => setConfig(entry, outfile, e.target.checked)}
            className="rounded"
          />
          Minify output
        </label>
      </div>

      {/* Actions */}
      <div className="px-3 space-y-1.5">
        <div className="text-[10px] uppercase tracking-wider text-[#858585] font-semibold mb-1">
          Actions
        </div>

        <button
          onClick={handlePreview}
          className={`flex items-center gap-2 w-full px-3 py-1.5 rounded text-xs font-medium ${
            devServerRunning
              ? 'bg-[#c62828] text-white hover:bg-[#b71c1c]'
              : 'bg-[#2d2d2d] text-[#cccccc] hover:bg-[#3c3c3c] hover:text-white'
          }`}
        >
          {devServerRunning ? <Square size={14} /> : <Eye size={14} />}
          {devServerRunning ? `Stop Preview (:${devServerPort})` : 'Preview'}
        </button>

        <button
          onClick={handleBuild}
          disabled={building}
          className="flex items-center gap-2 w-full px-3 py-1.5 rounded text-xs font-medium bg-[#2d2d2d] text-[#cccccc] hover:bg-[#3c3c3c] hover:text-white disabled:opacity-50"
        >
          {building ? <Loader2 size={14} className="animate-spin" /> : <Hammer size={14} />}
          Bundle
        </button>

        <button
          onClick={handleBundleAndRun}
          disabled={building}
          className="flex items-center gap-2 w-full px-3 py-1.5 rounded text-xs font-medium bg-[#007acc] text-white hover:bg-[#006bb3] disabled:opacity-50"
        >
          {building ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
          Bundle & Run on Keystone
        </button>
      </div>

      {/* Last Build Status */}
      {lastBuildSuccess !== null && (
        <div className="px-3 mt-3 pt-3 border-t border-[#333]">
          <div className="flex items-center gap-1.5 text-xs">
            {lastBuildSuccess ? (
              <CheckCircle2 size={14} className="text-[#4caf50]" />
            ) : (
              <XCircle size={14} className="text-[#f44336]" />
            )}
            <span className={lastBuildSuccess ? 'text-[#4caf50]' : 'text-[#f44336]'}>
              {lastBuildSuccess ? 'Build succeeded' : 'Build failed'}
            </span>
          </div>
          {lastBuildDuration !== null && (
            <div className="text-[11px] text-[#858585] mt-0.5 ml-5">
              {lastBuildDuration}ms
              {lastBuildSize ? ` · ${(lastBuildSize / 1024).toFixed(1)} KB` : ''}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Bottom Tab — Build Output ───────────────────────────────

export const AppBuilderOutput: React.FC = () => {
  const { buildMessages, clearBuildMessages } = useAppBuilderStore()

  const getIcon = (type: BuildMessage['type']) => {
    switch (type) {
      case 'error': return <XCircle size={13} className="text-[#f44336] shrink-0" />
      case 'warning': return <AlertTriangle size={13} className="text-[#ff9800] shrink-0" />
      case 'success': return <CheckCircle2 size={13} className="text-[#4caf50] shrink-0" />
      default: return <div className="w-[13px] h-[13px] shrink-0" />
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#cccccc] text-xs">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-1 border-b border-[#333] bg-[#252526]">
        <span className="text-[#858585] font-medium">Build Output</span>
        <button
          onClick={clearBuildMessages}
          className="text-[#858585] hover:text-white text-[11px]"
        >
          Clear
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 font-mono">
        {buildMessages.length === 0 ? (
          <div className="text-[#555] p-2">No build output yet. Bundle a project to see results.</div>
        ) : (
          buildMessages.map((msg, i) => (
            <div key={i} className="flex items-start gap-1.5 py-0.5">
              {getIcon(msg.type)}
              <div>
                <span className={
                  msg.type === 'error' ? 'text-[#f44336]' :
                  msg.type === 'warning' ? 'text-[#ff9800]' :
                  msg.type === 'success' ? 'text-[#4caf50]' :
                  'text-[#cccccc]'
                }>
                  {msg.text}
                </span>
                {msg.location && (
                  <span className="text-[#858585] ml-2">at {msg.location}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
