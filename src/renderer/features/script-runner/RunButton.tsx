import React from 'react';
import { Play } from 'lucide-react';
import { useFeatureStore } from '../../store/useFeatureStore';

const RunButton: React.FC = () => {
  const { openTabs, activeTabId, runScript } = useFeatureStore();
  const activeTab = openTabs.find(t => t.id === activeTabId);
  const isEditor = activeTab?.type === 'editor';

  const handleRun = () => {
    if (isEditor && activeTab?.path) {
      runScript(activeTab.path);
    }
  };

  return (
    <button
      onClick={handleRun}
      disabled={!isEditor}
      className={`flex items-center space-x-1 px-3 py-1 rounded text-xs transition-colors ${
        isEditor 
        ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm' 
        : 'bg-slate-700 text-slate-500 cursor-not-allowed'
      }`}
      title="Run script (Preview)"
    >
      <Play className="w-3.5 h-3.5" />
      <span className="font-semibold">Run</span>
    </button>
  );
};

export default RunButton;
