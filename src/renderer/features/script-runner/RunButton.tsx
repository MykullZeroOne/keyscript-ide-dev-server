import React, { useState } from 'react'
import { Play, Loader } from 'lucide-react'
import { useEditorStore } from '../editor/EditorStore'
import { useScriptOptionsStore } from '../script-options/ScriptOptionsStore'
import { useProjectStore } from '../../store/useProjectStore'

async function storeParameters(): Promise<string | null> {
  const params = useScriptOptionsStore.getState().getScriptParameters()
  try {
    const response = await fetch('/SessionStore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ value: JSON.stringify(params) })
    })
    const data = await response.json()
    if (data.success && data.id) {
      return data.id
    }
  } catch (e) {
    console.warn('SessionStore failed, running without parameters', e)
  }
  return null
}

const RunButton: React.FC = () => {
  const { tabs, activeTabId, runScript } = useEditorStore()
  const [running, setRunning] = useState(false)
  const activeTab = tabs.find((t) => t.id === activeTabId)
  const isEditor = activeTab && !activeTab.isExecuting

  const handleRun = async (): Promise<void> => {
    if (!isEditor || !activeTab?.path) return
    setRunning(true)
    try {
      const paramsId = await storeParameters()
      // Convert absolute project paths to relative for RunScript
      const currentProject = useProjectStore.getState().currentProject
      let scriptPath = activeTab.path
      if (currentProject && scriptPath.startsWith(currentProject + '/')) {
        scriptPath = scriptPath.substring(currentProject.length + 1)
      }
      runScript(scriptPath, paramsId ?? undefined)
    } finally {
      setRunning(false)
    }
  }

  return (
    <button
      onClick={handleRun}
      disabled={!isEditor || running}
      className={`flex items-center gap-1 px-3 py-1 rounded text-xs transition-colors ${
        isEditor && !running
          ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm cursor-pointer'
          : 'bg-gray-700 text-gray-500 cursor-not-allowed'
      }`}
      title="Run script (Preview)"
    >
      {running ? (
        <Loader className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Play className="w-3.5 h-3.5" />
      )}
      <span className="font-semibold">Run</span>
    </button>
  )
}

export default RunButton
