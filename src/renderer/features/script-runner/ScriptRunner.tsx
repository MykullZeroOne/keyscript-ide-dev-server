import React, { useRef, useEffect } from 'react'
import { useRunnerStore } from './RunnerStore'
import { useLoginStore } from '../login/LoginStore'
import { useLogStore } from '../console-inspector/LogStore'
import { XCircle, RefreshCw, Terminal, Globe } from 'lucide-react'

export const ScriptRunner: React.FC = () => {
  const { isRunning, scriptPath, parametersId, stopScript } = useRunnerStore()
  const { instance } = useLoginStore()
  const { addLog, addRequest } = useLogStore()
  const webviewRef = useRef<any>(null)

  useEffect(() => {
    if (webviewRef.current) {
      const webview = webviewRef.current
      
      const onConsoleMessage = (e: any) => {
        let level: 'log' | 'info' | 'warn' | 'error' = 'log'
        if (e.level === 1) level = 'info'
        if (e.level === 2) level = 'warn'
        if (e.level === 3) level = 'error'
        
        addLog({
            level,
            message: e.message,
            source: 'webview'
        })
      }
      
      const onDidGetResponseDetails = (e: any) => {
        addRequest({
            method: 'GET', // method is not directly available in this event, but most details are
            url: e.newURL,
            status: e.httpResponseCode,
            type: e.resourceType
        })
      }

      const onDidNavigate = (e: any) => {
          addLog({ level: 'info', message: `Navigated to ${e.url}`, source: 'system' })
      }
      
      webview.addEventListener('console-message', onConsoleMessage)
      webview.addEventListener('did-get-response-details', onDidGetResponseDetails)
      webview.addEventListener('did-navigate', onDidNavigate)
      
      return () => {
        webview.removeEventListener('console-message', onConsoleMessage)
        webview.removeEventListener('did-get-response-details', onDidGetResponseDetails)
        webview.removeEventListener('did-navigate', onDidNavigate)
      }
    }
    return undefined
  }, [isRunning, addLog, addRequest])

  if (!isRunning || !scriptPath) return null

  // Format: /{instance}/Keyscript_IDE/RunScript?scriptPath={path}&scriptParametersId={id}
  const runUrl = `/${instance}/Keyscript_IDE/RunScript?scriptPath=${encodeURIComponent(scriptPath)}&scriptParametersId=${parametersId}`

  return (
    <div className="fixed inset-0 z-40 bg-gray-950 flex flex-col animate-in fade-in duration-300">
      {/* Runner Toolbar */}
      <div className="h-12 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-600/20 p-1.5 rounded-lg text-green-400">
            <RefreshCw size={16} className="animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white tracking-tight leading-none mb-1">Executing Script</span>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
              <div className="flex items-center gap-1">
                <Globe size={10} />
                <span>{instance}</span>
              </div>
              <span>/</span>
              <span>{scriptPath}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => webviewRef.current?.reload()}
            className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-all"
            title="Reload Script"
          >
            <RefreshCw size={18} />
          </button>
          <button 
            onClick={stopScript}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-red-900/20"
          >
            <XCircle size={16} />
            <span>Terminate</span>
          </button>
        </div>
      </div>
      
      {/* Execution Frame */}
      <div className="flex-1 bg-white relative">
        <webview 
          ref={webviewRef}
          src={runUrl}
          className="w-full h-full"
          allowpopups
        />
      </div>
      
      {/* Bottom Status */}
      <div className="h-8 bg-gray-900 border-t border-gray-800 flex items-center px-4 gap-4">
        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          <Terminal size={12} />
          <span>Script Runtime Environment</span>
        </div>
        <div className="flex-1" />
        <div className="text-[10px] text-gray-600 font-mono">
          Session: {parametersId}
        </div>
      </div>
    </div>
  )
}
