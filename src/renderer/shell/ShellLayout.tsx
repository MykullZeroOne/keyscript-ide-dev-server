import React from 'react'
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import { ActivityBar } from './components/ActivityBar'
import { Sidebar } from './components/Sidebar'
import { EditorArea } from './components/EditorArea'
import { BottomPanel } from './components/BottomPanel'
import { StatusBar } from './components/StatusBar'
import { Toolbar } from './components/Toolbar'
import { useShellStore } from './ShellStore'
import { useFeatureRegistry } from './FeatureRegistry'

export const ShellLayout = () => {
  const { activeSidebarId, isBottomPanelVisible } = useShellStore()
  const { getFeatures } = useFeatureRegistry()
  
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-950 text-gray-300 overflow-hidden font-sans antialiased">
      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Activity Bar (Fixed Width) */}
        <ActivityBar />
        
        {/* Resizable Sidebar + Editor/Bottom Panel Area */}
        <div className="flex-1 min-w-0">
          <Allotment>
            {/* Sidebar (Optional) */}
            {activeSidebarId && (
              <Allotment.Pane minSize={200} preferredSize={300} maxSize={600}>
                <Sidebar />
              </Allotment.Pane>
            )}
            
            {/* Main Editor + Bottom Panel (Vertical Split) */}
            <Allotment.Pane>
              <Allotment vertical>
                {/* Toolbar + Editor Area */}
                <Allotment.Pane minSize={100} preferredSize="70%">
                  <div className="h-full flex flex-col">
                    <Toolbar />
                    <div className="flex-1 min-h-0">
                      <EditorArea />
                    </div>
                  </div>
                </Allotment.Pane>
                
                {/* Bottom Panel (Optional) */}
                {isBottomPanelVisible && (
                  <Allotment.Pane minSize={100} preferredSize="30%">
                    <BottomPanel />
                  </Allotment.Pane>
                )}
              </Allotment>
            </Allotment.Pane>
          </Allotment>
        </div>
      </div>
      
      {/* Status Bar (Fixed Height) */}
      <StatusBar />

      {/* Global Overlays (Dialogs, Modals) */}
      {getFeatures().flatMap(f => f.overlays || []).map((Render, idx) => (
        <React.Fragment key={idx}>
          <Render />
        </React.Fragment>
      ))}
    </div>
  )
}
