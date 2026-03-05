import React from 'react'
import { useLogStore } from './LogStore'
import { Trash2, Link, Clock, Activity, ShieldCheck, AlertCircle } from 'lucide-react'

export const InspectorView: React.FC = () => {
  const { requests, clearRequests } = useLogStore()

  return (
    <div className="h-full flex flex-col bg-gray-950 font-mono">
      <div className="px-4 py-1 bg-gray-900/50 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Network Inspector</span>
        </div>
        <button 
          onClick={clearRequests}
          className="p-1 hover:bg-gray-800 rounded text-gray-500 hover:text-gray-300 transition-colors"
          title="Clear Requests"
        >
          <Trash2 size={12} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {requests.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-800 text-xs italic select-none">
            No network requests...
          </div>
        ) : (
          requests.map((req) => (
            <div 
              key={req.id} 
              className="text-[10px] py-1.5 px-3 border border-gray-800/50 rounded-lg hover:border-gray-700/50 transition-colors flex items-center gap-4 group"
            >
              <div className={`w-8 h-4 rounded-sm flex items-center justify-center font-bold text-[8px] tracking-widest uppercase ${
                req.method === 'POST' ? 'bg-orange-950 text-orange-400 border border-orange-900/50' :
                'bg-blue-950 text-blue-400 border border-blue-900/50'
              }`}>
                {req.method}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <Link size={10} className="text-gray-600" />
                  <span className="text-gray-300 font-bold truncate tracking-tight">{req.url}</span>
                </div>
                <div className="flex items-center gap-3 text-[9px] text-gray-500 font-mono">
                  <div className="flex items-center gap-1">
                    <Clock size={10} />
                    <span>{req.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                  </div>
                  {req.status && (
                    <div className="flex items-center gap-1">
                        {req.status >= 400 ? <AlertCircle size={10} className="text-red-500" /> : <ShieldCheck size={10} className="text-green-500" />}
                        <span className={req.status >= 400 ? 'text-red-400' : 'text-green-400'}>{req.status}</span>
                    </div>
                  )}
                  {req.duration && (
                    <div className="flex items-center gap-1">
                        <Activity size={10} />
                        <span>{req.duration}ms</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
