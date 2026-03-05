import React, { useState, useEffect } from 'react';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { useFeatureStore } from '../../store/useFeatureStore';
import { EditorWorkspace } from '../../features/editor';

const ShellLayout: React.FC = () => {
  const { sidebarPanels, bottomTabs, toolbarItems, statusBarItems, initializeFeatures } = useFeatureStore();
  const [activeSidebarId, setActiveSidebarId] = useState<string | null>(null);
  const [activeBottomTabId, setActiveBottomTabId] = useState<string | null>(null);

  useEffect(() => {
    initializeFeatures();
  }, []);

  useEffect(() => {
    if (!activeSidebarId && sidebarPanels.length > 0) setActiveSidebarId(sidebarPanels[0].id);
    if (!activeBottomTabId && bottomTabs.length > 0) setActiveBottomTabId(bottomTabs[0].id);
  }, [sidebarPanels, bottomTabs]);

  const activeSidebar = sidebarPanels.find(p => p.id === activeSidebarId);
  const activeBottomTab = bottomTabs.find(t => t.id === activeBottomTabId);

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-300">
      {/* Toolbar */}
      <div className="h-10 border-b border-slate-700 flex items-center px-2 space-x-2 bg-slate-800">
        {toolbarItems.map(item => (
          <item.component key={item.id} />
        ))}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 border-r border-slate-700 flex flex-col items-center py-2 space-y-4 bg-slate-900">
          {sidebarPanels.map(panel => (
            <button
              key={panel.id}
              onClick={() => setActiveSidebarId(panel.id)}
              className={`p-2 rounded ${activeSidebarId === panel.id ? 'bg-slate-700 text-white' : 'hover:bg-slate-800'}`}
              title={panel.label}
            >
              {panel.icon}
            </button>
          ))}
        </div>

        {/* Main Area with Side Panel and Editor/Bottom Panel */}
        <div className="flex-1">
          <Allotment>
            {activeSidebar && (
              <Allotment.Pane preferredSize={300} minSize={200}>
                <div className="h-full border-r border-slate-700 bg-slate-800 overflow-auto">
                  <div className="p-2 uppercase text-xs font-bold text-slate-500 tracking-wider">
                    {activeSidebar.label}
                  </div>
                  <activeSidebar.component />
                </div>
              </Allotment.Pane>
            )}
            
            <Allotment.Pane>
              <Allotment vertical>
                <Allotment.Pane>
                  <EditorWorkspace />
                </Allotment.Pane>
                
                {activeBottomTab && (
                  <Allotment.Pane preferredSize={200} minSize={100}>
                    <div className="h-full border-t border-slate-700 bg-slate-800 flex flex-col">
                      <div className="flex border-b border-slate-700 px-2 bg-slate-900">
                        {bottomTabs.map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveBottomTabId(tab.id)}
                            className={`px-3 py-1 text-xs font-medium border-b-2 transition-colors ${
                              activeBottomTabId === tab.id 
                              ? 'border-blue-500 text-blue-400' 
                              : 'border-transparent text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                      <div className="flex-1 overflow-auto p-2">
                        <activeBottomTab.component />
                      </div>
                    </div>
                  </Allotment.Pane>
                )}
              </Allotment>
            </Allotment.Pane>
          </Allotment>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 border-t border-slate-700 flex items-center px-2 bg-blue-600 text-white text-xs">
        <div className="flex flex-1 space-x-3">
          {statusBarItems.filter(i => i.alignment === 'left').map(item => (
            <item.component key={item.id} />
          ))}
        </div>
        <div className="flex space-x-3">
          {statusBarItems.filter(i => i.alignment === 'right').map(item => (
            <item.component key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShellLayout;
