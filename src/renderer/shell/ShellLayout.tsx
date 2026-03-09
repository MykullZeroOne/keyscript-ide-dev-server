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
  const features = useFeatureRegistry((state) => state.features)

  return (
    <div className="h-screen w-screen flex flex-col bg-[#1e1e1e] text-[#cccccc] overflow-hidden font-sans antialiased">
      {/* Toolbar */}
      <Toolbar />

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Activity Bar */}
        <ActivityBar />

        {/* Resizable Sidebar + Editor/Bottom Panel Area */}
        <div className="flex-1 min-w-0">
          <Allotment>
            {activeSidebarId && (
              <Allotment.Pane minSize={180} preferredSize={260} maxSize={500}>
                <Sidebar />
              </Allotment.Pane>
            )}

            <Allotment.Pane>
              <Allotment vertical>
                <Allotment.Pane minSize={100}>
                  <EditorArea />
                </Allotment.Pane>

                {isBottomPanelVisible && (
                  <Allotment.Pane minSize={80} preferredSize={200}>
                    <BottomPanel />
                  </Allotment.Pane>
                )}
              </Allotment>
            </Allotment.Pane>
          </Allotment>
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar />

      {/* Global Overlays */}
      {features.flatMap((f) => f.overlays || []).map((Render, idx) => (
        <React.Fragment key={idx}>
          <Render />
        </React.Fragment>
      ))}
    </div>
  )
}
