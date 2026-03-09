import { create } from 'zustand'
import type { QLType, QueryNode, PostResult } from './queryBuilderApi'

interface QueryBuilderState {
  // Types loaded from query-language.json
  types: QLType[]
  typesLoading: boolean
  typesError: string | null
  setTypes: (types: QLType[]) => void
  setTypesLoading: (loading: boolean) => void
  setTypesError: (error: string | null) => void

  // Query tree
  root: QueryNode | null
  setRoot: (root: QueryNode | null) => void
  selectedNodeId: string | null
  setSelectedNodeId: (id: string | null) => void

  // Code view tab
  codeTab: 'xml' | 'javascript'
  setCodeTab: (tab: 'xml' | 'javascript') => void

  // Post/verify result
  lastResult: PostResult | null
  setLastResult: (result: PostResult | null) => void
  posting: boolean
  setPosting: (posting: boolean) => void

  // Property panel visibility toggles
  showAttributes: boolean
  showPassed: boolean
  showReturned: boolean
  toggleShowAttributes: () => void
  toggleShowPassed: () => void
  toggleShowReturned: () => void
}

export const useQueryBuilderStore = create<QueryBuilderState>((set) => ({
  types: [],
  typesLoading: false,
  typesError: null,
  setTypes: (types) => set({ types }),
  setTypesLoading: (typesLoading) => set({ typesLoading }),
  setTypesError: (typesError) => set({ typesError }),

  root: null,
  setRoot: (root) => set({ root }),
  selectedNodeId: null,
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),

  codeTab: 'xml',
  setCodeTab: (codeTab) => set({ codeTab }),

  lastResult: null,
  setLastResult: (lastResult) => set({ lastResult }),
  posting: false,
  setPosting: (posting) => set({ posting }),

  showAttributes: true,
  showPassed: true,
  showReturned: false,
  toggleShowAttributes: () => set(s => ({ showAttributes: !s.showAttributes })),
  toggleShowPassed: () => set(s => ({ showPassed: !s.showPassed })),
  toggleShowReturned: () => set(s => ({ showReturned: !s.showReturned })),
}))
