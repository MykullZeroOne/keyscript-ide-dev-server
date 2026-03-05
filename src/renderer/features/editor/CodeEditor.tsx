import React from 'react'
import Editor from '@monaco-editor/react'
import { useEditorStore } from './EditorStore'
import { FileText, Save, X } from 'lucide-react'

export const EditorTabs: React.FC = () => {
  const { tabs, activeTabId, setActiveTabId, closeTab, saveTab } = useEditorStore()

  if (tabs.length === 0) return null

  return (
    <div className="flex bg-gray-950 border-b border-gray-800 overflow-x-auto scrollbar-hide no-scrollbar">
      {tabs.map(tab => (
        <div 
          key={tab.id}
          className={`flex items-center min-w-[120px] max-w-[200px] h-9 px-3 border-r border-gray-800 cursor-pointer group transition-colors ${
            activeTabId === tab.id ? 'bg-gray-900 text-blue-400' : 'bg-gray-950 text-gray-500 hover:bg-gray-900/50'
          }`}
          onClick={() => setActiveTabId(tab.id)}
        >
          <FileText size={14} className="mr-2 flex-shrink-0" />
          <span className={`text-xs truncate flex-1 ${tab.isDirty ? 'italic' : ''}`}>
            {tab.name}{tab.isDirty ? '*' : ''}
          </span>
          <div className="flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {tab.isDirty && (
              <button 
                onClick={(e) => { e.stopPropagation(); saveTab(tab.id) }}
                className="p-0.5 hover:bg-gray-800 rounded text-gray-400 hover:text-green-500 mr-1"
                title="Save"
              >
                <Save size={12} />
              </button>
            )}
            <button 
              onClick={(e) => { e.stopPropagation(); closeTab(tab.id) }}
              className="p-0.5 hover:bg-gray-800 rounded text-gray-400 hover:text-red-500"
              title="Close"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export const CodeEditor: React.FC = () => {
  const { tabs, activeTabId, updateContent, saveTab } = useEditorStore()
  const activeTab = tabs.find(t => t.id === activeTabId)

  if (!activeTab) {
    return (
      <div className="h-full flex items-center justify-center text-gray-700 select-none bg-gray-950">
        <div className="flex flex-col items-center gap-2">
          <FileText size={64} opacity={0.1} />
          <div className="text-xl font-bold opacity-20">No File Open</div>
          <div className="text-sm opacity-10">Select a script from the explorer to begin</div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-950">
      <EditorTabs />
      <div className="flex-1 min-h-0">
        <Editor
          theme="vs-dark"
          path={activeTab.path}
          defaultLanguage="javascript"
          value={activeTab.content}
          onChange={(value) => updateContent(activeTab.id, value || '')}
          options={{
            minimap: { enabled: true },
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Courier New', monospace",
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            padding: { top: 10, bottom: 10 }
          }}
          onMount={(editor, monaco) => {
            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
              saveTab(activeTab.id)
            })
          }}
        />
      </div>
    </div>
  )
}
