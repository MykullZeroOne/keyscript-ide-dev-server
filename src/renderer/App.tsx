import React, { useEffect } from 'react'
import { ShellLayout } from './shell/ShellLayout'
import { registerPlaceholderFeature } from './features/placeholder'
import { registerLoginFeature } from './features/login'
import { registerScriptExplorerFeature } from './features/script-explorer'
import { registerEditorFeature } from './features/editor'
import { registerScriptRunnerFeature } from './features/script-runner'
import { registerSearchFeature } from './features/search'
import { registerConsoleInspectorFeature } from './features/console-inspector'
import { registerTerminalFeature } from './features/terminal'

const App: React.FC = () => {
  useEffect(() => {
    // Register features once on app load
    registerLoginFeature()
    registerScriptExplorerFeature()
    registerEditorFeature()
    registerScriptRunnerFeature()
    registerSearchFeature()
    registerConsoleInspectorFeature()
    registerTerminalFeature()
    registerPlaceholderFeature()
  }, [])
  
  return <ShellLayout />
}

export default App
