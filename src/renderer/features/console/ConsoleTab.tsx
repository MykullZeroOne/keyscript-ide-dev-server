import React from 'react';
import { useConsoleStore } from './useConsoleStore';
import { Trash2 } from 'lucide-react';

const ConsoleTab: React.FC = () => {
  const { messages, clearMessages } = useConsoleStore();

  return (
    <div className="flex flex-col h-full font-mono text-xs">
      <div className="flex justify-end p-1 bg-slate-900 border-b border-slate-700">
        <button
          onClick={clearMessages}
          className="p-1 hover:bg-slate-700 rounded text-slate-400"
          title="Clear Console"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2 space-y-1 bg-slate-900">
        {messages.length === 0 ? (
          <div className="text-slate-600 italic">Console is empty</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex border-b border-slate-800 pb-1 ${
              msg.level === 'error' ? 'text-red-400 bg-red-950/20' : 
              msg.level === 'warn' ? 'text-amber-400 bg-amber-950/20' : 
              'text-slate-300'
            }`}>
              <span className="text-slate-600 mr-2 shrink-0">{msg.timestamp.toLocaleTimeString()}</span>
              <span className="whitespace-pre-wrap">{msg.content}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConsoleTab;
