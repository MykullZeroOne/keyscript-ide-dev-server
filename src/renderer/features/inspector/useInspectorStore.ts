import { create } from 'zustand';

export interface NetworkRequest {
  id: string;
  method: string;
  url: string;
  status?: number;
  timestamp: Date;
  requestBody?: string;
  responseBody?: string;
}

interface InspectorStore {
  requests: NetworkRequest[];
  addRequest: (request: Omit<NetworkRequest, 'timestamp'>) => void;
  updateRequest: (id: string, updates: Partial<NetworkRequest>) => void;
  clearRequests: () => void;
}

export const useInspectorStore = create<InspectorStore>((set) => ({
  requests: [],
  addRequest: (request) => {
    set((state) => ({
      requests: [
        { ...request, timestamp: new Date() },
        ...state.requests.slice(0, 49),
      ],
    }));
  },
  updateRequest: (id, updates) => {
    set((state) => ({
      requests: state.requests.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    }));
  },
  clearRequests: () => set({ requests: [] }),
}));
