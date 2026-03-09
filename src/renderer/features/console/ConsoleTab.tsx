import React from 'react';
import { useConsoleStore } from './useConsoleStore';
import { Trash2 } from 'lucide-react';

const ConsoleTab: React.FC = () => {
  const { messages, clearMessages } = useConsoleStore();

  return (
    <div className="flex flex-col h-full font-mono text-xs">
      <div className="flex justify-end p-1 bg-[#1e1e1e] border-b border-[#414141]">
        <button
          onClick={clearMessages}
          className="p-1 hover:bg-[#383838] rounded text-[#858585]"
          title="Clear Console"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2 space-y-1 bg-[#1e1e1e]">
        {messages.length === 0 ? (
          <div className="text-[#6e6e6e] italic">Console is empty</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex border-b border-[#2d2d2d] pb-1 ${
              msg.level === 'error' ? 'text-[#f48771] bg-[#5a1d1d20]' :
              msg.level === 'warn' ? 'text-[#cca700] bg-[#5a4a0020]' :
              'text-[#cccccc]'
            }`}>
              <span className="text-[#6e6e6e] mr-2 shrink-0">{msg.timestamp.toLocaleTimeString()}</span>
              <span className="whitespace-pre-wrap">{msg.content}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConsoleTab;
