import React from 'react'
import { ShellLayout } from './shell/ShellLayout'
import './features/register-all'

function App(): React.ReactElement {
  return (
    <div className="w-full h-screen overflow-hidden">
      <ShellLayout />
    </div>
  )
}

export default App
