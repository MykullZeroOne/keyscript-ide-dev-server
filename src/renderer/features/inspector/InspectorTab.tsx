import { useEffect, useState } from 'react';
import { useInspectorStore } from './useInspectorStore';
import { Trash2 } from 'lucide-react';

const InspectorTab: React.FC = () => {
  const { requests, addRequest, updateRequest, clearRequests } = useInspectorStore();
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  useEffect(() => {
    window.api.onNetworkEvent((event: any) => {
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
    <div className="flex h-full text-xs font-sans overflow-hidden bg-[#1e1e1e]">
      <div className="w-1/3 flex flex-col border-r border-[#414141]">
        <div className="flex justify-between items-center p-1 bg-[#252526] border-b border-[#414141]">
          <span className="font-bold text-[#858585] px-1">Network</span>
          <button onClick={clearRequests} className="p-1 hover:bg-[#383838] rounded text-[#858585]">
            <Trash2 size={14} />
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          {requests.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedRequestId(req.id)}
              className={`p-2 border-b border-[#2d2d2d] cursor-pointer hover:bg-[#2d2d2d] ${
                selectedRequestId === req.id ? 'bg-[#383838]' : ''
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`font-bold ${
                  req.method === 'POST' ? 'text-[#569cd6]' : 'text-[#4ec9b0]'
                }`}>{req.method}</span>
                <span className={req.status && req.status >= 400 ? 'text-[#f48771]' : 'text-[#858585]'}>
                  {req.status || 'pending...'}
                </span>
              </div>
              <div className="truncate text-[#cccccc]" title={req.url}>{req.url}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e]">
        {selectedRequest ? (
          <div className="flex-1 flex flex-col overflow-hidden p-3 space-y-4">
            <div>
              <div className="text-[#858585] uppercase font-bold text-[10px] mb-1">General</div>
              <div className="grid grid-cols-[100px_1fr] gap-1 text-[#cccccc]">
                <div className="text-[#858585]">Request URL:</div><div className="break-all">{selectedRequest.url}</div>
                <div className="text-[#858585]">Method:</div><div>{selectedRequest.method}</div>
                <div className="text-[#858585]">Status:</div><div>{selectedRequest.status || 'pending'}</div>
              </div>
            </div>

            {selectedRequest.requestBody && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="text-[#858585] uppercase font-bold text-[10px] mb-1">Request Body</div>
                <div className="flex-1 bg-[#252526] p-2 rounded overflow-auto whitespace-pre-wrap font-mono text-[11px] text-[#cccccc] border border-[#414141]">
                  {selectedRequest.requestBody}
                </div>
              </div>
            )}

            {selectedRequest.responseBody && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="text-[#858585] uppercase font-bold text-[10px] mb-1">Response Body</div>
                <div className="flex-1 bg-[#252526] p-2 rounded overflow-auto whitespace-pre-wrap font-mono text-[11px] text-[#cccccc] border border-[#414141]">
                  {selectedRequest.responseBody}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#6e6e6e]">
            Select a request to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectorTab;
