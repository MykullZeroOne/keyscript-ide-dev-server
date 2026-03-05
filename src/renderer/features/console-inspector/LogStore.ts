import { create } from 'zustand'

export interface LogEntry {
  id: string
  timestamp: Date
  level: 'log' | 'warn' | 'error' | 'info'
  message: string
  source?: string
}

export interface NetworkRequest {
  id: string
  timestamp: Date
  method: string
  url: string
  status?: number
  duration?: number
  type?: string
}

interface LogState {
  logs: LogEntry[]
  requests: NetworkRequest[]
  
  addLog: (log: Omit<LogEntry, 'id' | 'timestamp'>) => void
  addRequest: (request: Omit<NetworkRequest, 'id' | 'timestamp'>) => void
  clearLogs: () => void
  clearRequests: () => void
}

export const useLogStore = create<LogState>((set) => ({
  logs: [],
  requests: [],
  
  addLog: (log) => set((state) => ({
    logs: [...state.logs, { ...log, id: Math.random().toString(36).substring(7), timestamp: new Date() }]
  })),
  
  addRequest: (request) => set((state) => ({
    requests: [...state.requests, { ...request, id: Math.random().toString(36).substring(7), timestamp: new Date() }]
  })),
  
  clearLogs: () => set({ logs: [] }),
  clearRequests: () => set({ requests: [] })
}))
