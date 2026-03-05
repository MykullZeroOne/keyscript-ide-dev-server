import React, { useEffect, useState } from 'react';
import { useInspectorStore, NetworkRequest } from './useInspectorStore';
import { Trash2, Search } from 'lucide-react';

const InspectorTab: React.FC = () => {
  const { requests, addRequest, updateRequest, clearRequests } = useInspectorStore();
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  useEffect(() => {
    (window as any).api.onNetworkEvent((event: any) => {
      if (event.type === 'request') {
        addRequest({
          id: event.id,
          method: event.method,
          url: event.url,
          requestBody: event.body,
        });
      } else if (event.type === 'response') {
        updateRequest(event.id, {
          status: event.status,
          responseBody: event.body
        });
      }
    });
  }, [addRequest, updateRequest]);

  const selectedRequest = requests.find(r => r.id === selectedRequestId);

  return (
    <div className="flex h-full text-xs font-sans overflow-hidden bg-slate-900">
      <div className="w-1/3 flex flex-col border-r border-slate-700">
        <div className="flex justify-between items-center p-1 bg-slate-800 border-b border-slate-700">
          <span className="font-bold text-slate-400 px-1">Network</span>
          <button onClick={clearRequests} className="p-1 hover:bg-slate-700 rounded text-slate-400">
            <Trash2 size={14} />
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          {requests.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedRequestId(req.id)}
              className={`p-2 border-b border-slate-800 cursor-pointer hover:bg-slate-800 ${
                selectedRequestId === req.id ? 'bg-slate-700' : ''
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`font-bold ${
                  req.method === 'POST' ? 'text-blue-400' : 'text-green-400'
                }`}>{req.method}</span>
                <span className={req.status && req.status >= 400 ? 'text-red-400' : 'text-slate-500'}>
                  {req.status || 'pending...'}
                </span>
              </div>
              <div className="truncate text-slate-300" title={req.url}>{req.url}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        {selectedRequest ? (
          <div className="flex-1 flex flex-col overflow-hidden p-3 space-y-4">
            <div>
              <div className="text-slate-500 uppercase font-bold text-[10px] mb-1">General</div>
              <div className="grid grid-cols-[100px_1fr] gap-1 text-slate-300">
                <div className="text-slate-500">Request URL:</div><div className="break-all">{selectedRequest.url}</div>
                <div className="text-slate-500">Method:</div><div>{selectedRequest.method}</div>
                <div className="text-slate-500">Status:</div><div>{selectedRequest.status || 'pending'}</div>
              </div>
            </div>
            
            {selectedRequest.requestBody && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="text-slate-500 uppercase font-bold text-[10px] mb-1">Request Body</div>
                <div className="flex-1 bg-slate-900 p-2 rounded overflow-auto whitespace-pre-wrap font-mono text-[11px] text-slate-400 border border-slate-800">
                  {selectedRequest.requestBody}
                </div>
              </div>
            )}

            {selectedRequest.responseBody && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="text-slate-500 uppercase font-bold text-[10px] mb-1">Response Body</div>
                <div className="flex-1 bg-slate-900 p-2 rounded overflow-auto whitespace-pre-wrap font-mono text-[11px] text-slate-400 border border-slate-800">
                  {selectedRequest.responseBody}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-600">
            Select a request to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectorTab;
