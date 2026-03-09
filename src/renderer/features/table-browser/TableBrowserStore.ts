import { create } from 'zustand'
import type { TableInfo, SearchFilter, RecordRow, RecordData } from './tableBrowserApi'

interface TableBrowserState {
  // Table list
  tables: TableInfo[]
  tablesLoading: boolean
  tablesError: string | null
  setTables: (tables: TableInfo[]) => void
  setTablesLoading: (loading: boolean) => void
  setTablesError: (error: string | null) => void

  // Selected table
  selectedTable: TableInfo | null
  setSelectedTable: (table: TableInfo | null) => void

  // Search filters for selected table
  filters: SearchFilter[]
  filtersLoading: boolean
  setFilters: (filters: SearchFilter[]) => void
  setFiltersLoading: (loading: boolean) => void

  // Search results
  searchResults: RecordRow[]
  searchColumns: string[]
  totalHitCount: number
  searchLoading: boolean
  setSearchResults: (rows: RecordRow[], columns: string[], total: number) => void
  setSearchLoading: (loading: boolean) => void
  clearSearchResults: () => void

  // Record detail view
  viewingRecord: RecordData | null
  viewingSerial: string | null
  recordLoading: boolean
  setViewingRecord: (data: RecordData | null, serial: string | null) => void
  setRecordLoading: (loading: boolean) => void

  // Active tab in detail area
  activeDetailTab: 'columns' | 'search' | 'results' | 'record' | 'recordOps'
  setActiveDetailTab: (tab: 'columns' | 'search' | 'results' | 'record' | 'recordOps') => void

  // Column filter
  columnFilter: string
  setColumnFilter: (filter: string) => void
}

export const useTableBrowserStore = create<TableBrowserState>((set) => ({
  tables: [],
  tablesLoading: false,
  tablesError: null,
  setTables: (tables) => set({ tables }),
  setTablesLoading: (tablesLoading) => set({ tablesLoading }),
  setTablesError: (tablesError) => set({ tablesError }),

  selectedTable: null,
  setSelectedTable: (selectedTable) => set({
    selectedTable,
    filters: [],
    searchResults: [],
    searchColumns: [],
    totalHitCount: 0,
    viewingRecord: null,
    viewingSerial: null,
    activeDetailTab: 'columns',
    columnFilter: ''
  }),

  filters: [],
  filtersLoading: false,
  setFilters: (filters) => set({ filters }),
  setFiltersLoading: (filtersLoading) => set({ filtersLoading }),

  searchResults: [],
  searchColumns: [],
  totalHitCount: 0,
  searchLoading: false,
  setSearchResults: (searchResults, searchColumns, totalHitCount) =>
    set({ searchResults, searchColumns, totalHitCount }),
  setSearchLoading: (searchLoading) => set({ searchLoading }),
  clearSearchResults: () => set({ searchResults: [], searchColumns: [], totalHitCount: 0 }),

  viewingRecord: null,
  viewingSerial: null,
  recordLoading: false,
  setViewingRecord: (viewingRecord, viewingSerial) => set({ viewingRecord, viewingSerial }),
  setRecordLoading: (recordLoading) => set({ recordLoading }),

  activeDetailTab: 'columns',
  setActiveDetailTab: (activeDetailTab) => set({ activeDetailTab }),

  columnFilter: '',
  setColumnFilter: (columnFilter) => set({ columnFilter }),
}))
