
import { Play } from 'lucide-react'
import { registerFeature } from '../../shell/FeatureRegistry'
import { ScriptRunner } from './ScriptRunner'
import { useRunnerStore } from './RunnerStore'
import { useEditorStore } from '../editor/EditorStore'

export const registerScriptRunnerFeature = () => {
  registerFeature({
    id: 'script-runner',
    name: 'Script Runner',
    toolbarItems: [
      {
        id: 'run-button',
        render: () => {
          const { activeTabId, tabs } = useEditorStore()
          const { runScript, isRunning } = useRunnerStore()
          
          const handleRun = () => {
            const activeTab = tabs.find(t => t.id === activeTabId)
            if (activeTab) {
              // Extract script path (remove scripts/ prefix if present)
              const path = activeTab.path.startsWith('scripts/') ? activeTab.path.substring(8) : activeTab.path
              
              // Parameters should ideally come from Script Options feature
              // For now, let's use some default parameters
              const parameters = {
                crlogin: {},
                crscript: {
                  personSerial: '1',
                  accountSerial: '1'
                }
              }
              
              runScript(path, parameters)
            }
          }
          
          return (
            <button 
              onClick={handleRun}
              disabled={!activeTabId || isRunning}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-lg ${
                !activeTabId || isRunning 
                  ? 'bg-gray-800 text-gray-600 opacity-50 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20 cursor-pointer'
              }`}
            >
              <Play size={14} fill="currentColor" />
              <span>{isRunning ? 'Running...' : 'Run Script'}</span>
            </button>
          )
        },
        position: 'left'
      }
    ],
    overlays: [
      () => <ScriptRunner />
    ]
  })
}
