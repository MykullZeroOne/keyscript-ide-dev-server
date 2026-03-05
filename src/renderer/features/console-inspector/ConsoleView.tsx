import React from 'react'
import { useLogStore } from './LogStore'
import { Trash2, AlertCircle, Info, AlertTriangle } from 'lucide-react'

export const ConsoleView: React.FC = () => {
  const { logs, clearLogs } = useLogStore()

  return (
    <div className="h-full flex flex-col bg-gray-950 font-mono">
      <div className="px-4 py-1 bg-gray-900/50 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Console Output</span>
        </div>
        <button 
          onClick={clearLogs}
          className="p-1 hover:bg-gray-800 rounded text-gray-500 hover:text-gray-300 transition-colors"
          title="Clear Console"
        >
          <Trash2 size={12} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-800 text-xs italic select-none">
            No console output...
          </div>
        ) : (
          logs.map((log) => (
            <div 
              key={log.id} 
              className={`text-[11px] py-0.5 px-2 border-l-2 flex gap-3 ${
                log.level === 'error' ? 'bg-red-900/10 border-red-600/50 text-red-400' :
                log.level === 'warn' ? 'bg-yellow-900/10 border-yellow-600/50 text-yellow-400' :
                log.level === 'info' ? 'bg-blue-900/10 border-blue-600/50 text-blue-400' :
                'border-transparent text-gray-400'
              }`}
            >
              <span className="text-gray-600 flex-shrink-0 w-16 text-right">
                {log.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {log.level === 'error' && <AlertCircle size={10} />}
                {log.level === 'warn' && <AlertTriangle size={10} />}
                {log.level === 'info' && <Info size={10} />}
                <span className="whitespace-pre-wrap break-all">{log.message}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
