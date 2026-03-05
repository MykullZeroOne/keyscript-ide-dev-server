import { create } from 'zustand';

export interface ConsoleMessage {
  id: string;
  level: 'log' | 'warn' | 'error' | 'info';
  content: string;
  timestamp: Date;
}

interface ConsoleStore {
  messages: ConsoleMessage[];
  addMessage: (level: ConsoleMessage['level'], content: string) => void;
  clearMessages: () => void;
}

export const useConsoleStore = create<ConsoleStore>((set) => ({
  messages: [],
  addMessage: (level, content) => {
    const message: ConsoleMessage = {
      id: Math.random().toString(36).substr(2, 9),
      level,
      content,
      timestamp: new Date(),
    };
    set((state) => ({ messages: [...state.messages, message] }));
  },
  clearMessages: () => set({ messages: [] }),
}));
