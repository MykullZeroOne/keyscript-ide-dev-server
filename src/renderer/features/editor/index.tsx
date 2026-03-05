import React from 'react';
import { FeatureDefinition } from '../types';
import MonacoEditor from './MonacoEditor';
import { useFeatureStore } from '../../store/useFeatureStore';

const EditorFeature: FeatureDefinition = {
  id: 'editor',
  name: 'Code Editor',
  // Editor doesn't register static sidebar panels or bottom tabs by default,
  // it handles the main workspace view.
};

export const EditorWorkspace: React.FC = () => {
  const { openTabs, activeTabId, setActiveTab, closeTab } = useFeatureStore();
  const activeTab = openTabs.find(t => t.id === activeTabId);

  if (openTabs.length === 0) {
    return <div className="flex items-center justify-center h-full text-slate-500">No file open</div>;
  }

  return (
    <div className="flex flex-col h-full bg-slate-950">
      {/* Tab Bar */}
      <div className="flex bg-slate-900 border-b border-slate-700 overflow-x-auto overflow-y-hidden h-9 items-center">
        {openTabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-3 h-full cursor-pointer text-xs border-r border-slate-700 select-none min-w-fit ${
              activeTabId === tab.id ? 'bg-slate-950 text-white border-t-2 border-t-blue-500' : 'text-slate-500 hover:bg-slate-800'
            }`}
          >
            <span className="mr-2 truncate max-w-[150px]">{tab.label}</span>
            <button 
              onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
              className="hover:bg-slate-700 rounded p-0.5"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      {/* Editor Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab && activeTab.type === 'editor' && (
          <MonacoEditor key={activeTab.id} path={activeTab.path} />
        )}
        {activeTab && activeTab.type === 'preview' && (
          <div className="h-full bg-white">
            <webview 
              src={`http://localhost:3000/Test/Keyscript_IDE/RunScript?scriptPath=${activeTab.path}`} 
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorFeature;
