import React, { useEffect, useState, useMemo, useCallback } from 'react'
import {
  Database, Search, ChevronRight, ChevronDown, Table2, RefreshCw, ArrowLeft,
  Columns3, Filter, Eye, Copy, ExternalLink, X, Code, Braces, FileEdit
} from 'lucide-react'
import { useTableBrowserStore } from './TableBrowserStore'
import { useShellStore } from '../../shell/ShellStore'
import {
  fetchTableList, fetchSearchFilters, searchTable, viewRecord,
  type TableInfo, type SearchFilter
} from './tableBrowserApi'
import {
  searchXmlTemplate, searchJsTemplate,
  recordXmlTemplate, recordJsTemplate,
  RECORD_OPERATIONS, type RecordOperation
} from './codeTemplates'

// ─── Sidebar: Table Tree ─────────────────────────────────────

export const TableBrowserSidebar: React.FC = () => {
  const {
    tables, tablesLoading, tablesError,
    setTables, setTablesLoading, setTablesError,
    selectedTable, setSelectedTable
  } = useTableBrowserStore()
  const [filter, setFilter] = useState('')
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())

  const loadTables = useCallback(async () => {
    setTablesLoading(true)
    setTablesError(null)
    try {
      const list = await fetchTableList()
      setTables(list)
    } catch (err) {
      setTablesError(`Failed to load tables: ${err}`)
    } finally {
      setTablesLoading(false)
    }
  }, [setTables, setTablesLoading, setTablesError])

  useEffect(() => {
    if (tables.length === 0 && !tablesLoading) loadTables()
  }, [])

  // Group tables by viewGroup
  const grouped = useMemo(() => {
    const filtered = filter
      ? tables.filter(t =>
          t.tableName.toLowerCase().includes(filter.toLowerCase()) ||
          t.tableDescription.toLowerCase().includes(filter.toLowerCase())
        )
      : tables
    const groups: Record<string, TableInfo[]> = {}
    for (const t of filtered) {
      const g = t.viewGroup || 'Other'
      if (!groups[g]) groups[g] = []
      groups[g].push(t)
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
  }, [tables, filter])

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      next.has(group) ? next.delete(group) : next.add(group)
      return next
    })
  }

  // When filtering, auto-expand all groups
  useEffect(() => {
    if (filter) {
      setExpandedGroups(new Set(grouped.map(([g]) => g)))
    }
  }, [filter])

  return (
    <div className="h-full flex flex-col bg-[#252526]">
      <div className="px-4 py-2 border-b border-[#414141] flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#858585]">Table Browser</span>
        <button
          onClick={loadTables}
          className="p-1 hover:bg-[#383838] rounded text-[#858585] hover:text-white transition-colors"
          title="Refresh table list"
        >
          <RefreshCw size={12} className={tablesLoading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Search filter */}
      <div className="p-2 border-b border-[#414141]">
        <div className="relative">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter tables..."
            className="w-full bg-[#1e1e1e] border border-[#414141] rounded pl-7 pr-2 py-1.5 text-xs text-white placeholder-[#6e6e6e] focus:outline-none focus:ring-1 focus:ring-[#007acc]/50"
          />
          <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#6e6e6e]" />
          {filter && (
            <button
              onClick={() => setFilter('')}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#6e6e6e] hover:text-white"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Table tree */}
      <div className="flex-1 overflow-y-auto">
        {tablesError && (
          <div className="p-3 text-[10px] text-[#f48771]">{tablesError}</div>
        )}
        {tablesLoading && tables.length === 0 && (
          <div className="p-8 flex items-center justify-center">
            <RefreshCw size={20} className="animate-spin text-[#555555]" />
          </div>
        )}
        {!tablesLoading && tables.length === 0 && !tablesError && (
          <div className="p-4 text-center text-[#555555] text-xs">
            <Database size={32} className="mx-auto mb-2 opacity-20" />
            <p className="text-[10px]">No tables loaded</p>
            <button onClick={loadTables} className="mt-2 text-[#569cd6] hover:underline text-[10px]">
              Load Tables
            </button>
          </div>
        )}
        {grouped.map(([group, groupTables]) => (
          <div key={group}>
            <button
              onClick={() => toggleGroup(group)}
              className="w-full flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#858585] hover:bg-[#2d2d2d] sticky top-0 bg-[#252526] z-10"
            >
              {expandedGroups.has(group) ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
              {group}
              <span className="ml-auto text-[#555555] font-normal">{groupTables.length}</span>
            </button>
            {expandedGroups.has(group) && groupTables.map(t => (
              <button
                key={t.tableName}
                onClick={() => {
                  setSelectedTable(t)
                  useShellStore.getState().setBottomPanelVisible(true)
                  useShellStore.getState().setActiveBottomTabId('table-detail')
                }}
                className={`w-full flex items-center gap-2 pl-6 pr-3 py-1 text-left hover:bg-[#2d2d2d] transition-colors ${
                  selectedTable?.tableName === t.tableName ? 'bg-[#37373d] text-white' : 'text-[#cccccc]'
                }`}
              >
                <Table2 size={12} className="shrink-0 text-[#569cd6]" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs truncate">{t.tableName}</div>
                  {t.tableDescription && t.tableDescription !== t.tableName && (
                    <div className="text-[10px] text-[#858585] truncate">{t.tableDescription}</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Table count */}
      <div className="px-3 py-1.5 border-t border-[#414141] text-[10px] text-[#555555]">
        {tables.length} tables{filter ? ` (${grouped.reduce((n, [, g]) => n + g.length, 0)} shown)` : ''}
      </div>
    </div>
  )
}

// ─── Main Detail Panel ───────────────────────────────────────

export const TableBrowserDetail: React.FC = () => {
  const { selectedTable, activeDetailTab, setActiveDetailTab } = useTableBrowserStore()

  if (!selectedTable) {
    return (
      <div className="h-full bg-[#1e1e1e] flex flex-col items-center justify-center text-[#555555] gap-3 select-none">
        <Database size={48} className="opacity-10" />
        <div className="text-sm opacity-30 font-bold">Select a table</div>
        <div className="text-[10px] opacity-20">Choose a table from the sidebar to view its details</div>
      </div>
    )
  }

  const tabs: { id: typeof activeDetailTab; label: string; icon: React.ReactNode }[] = [
    { id: 'columns', label: 'Columns', icon: <Columns3 size={12} /> },
    { id: 'search', label: 'Search Records', icon: <Search size={12} /> },
    { id: 'results', label: 'Results', icon: <Table2 size={12} /> },
    { id: 'record', label: 'Record View', icon: <Eye size={12} /> },
    { id: 'recordOps', label: 'Record Operations', icon: <FileEdit size={12} /> },
  ]

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Table header */}
      <div className="px-4 py-2 bg-[#252526] border-b border-[#414141] flex items-center gap-3">
        <Table2 size={16} className="text-[#569cd6]" />
        <div>
          <div className="text-sm font-bold text-white">{selectedTable.tableName}</div>
          {selectedTable.tableDescription && (
            <div className="text-[10px] text-[#858585]">{selectedTable.tableDescription}</div>
          )}
        </div>
        <div className="ml-auto flex items-center gap-4 text-[10px] text-[#858585]">
          {selectedTable.parentTableName && (
            <span>Parent: <span className="text-[#569cd6]">{selectedTable.parentTableName}</span></span>
          )}
          {selectedTable.accessKeyPrefix && (
            <span>Key: <span className="font-mono text-[#ce9178]">{selectedTable.accessKeyPrefix}</span></span>
          )}
          <span>{selectedTable.field.length} columns</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex bg-[#252526] border-b border-[#1e1e1e] h-8 items-center">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveDetailTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 h-full text-[11px] border-r border-[#1e1e1e] transition-colors ${
              activeDetailTab === tab.id
                ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]'
                : 'text-[#858585] hover:bg-[#2d2d2d]'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {activeDetailTab === 'columns' && <ColumnsTab />}
        {activeDetailTab === 'search' && <SearchTab />}
        {activeDetailTab === 'results' && <ResultsTab />}
        {activeDetailTab === 'record' && <RecordTab />}
        {activeDetailTab === 'recordOps' && <RecordOpsTab />}
      </div>
    </div>
  )
}

// ─── Columns Tab ─────────────────────────────────────────────

const ColumnsTab: React.FC = () => {
  const { selectedTable, columnFilter, setColumnFilter } = useTableBrowserStore()
  if (!selectedTable) return null

  const fields = columnFilter
    ? selectedTable.field.filter(f =>
        f.columnName.toLowerCase().includes(columnFilter.toLowerCase()) ||
        f.columnDescription.toLowerCase().includes(columnFilter.toLowerCase())
      )
    : selectedTable.field

  return (
    <div className="h-full flex flex-col">
      {/* Filter bar */}
      <div className="px-3 py-2 border-b border-[#414141] flex items-center gap-2">
        <Filter size={12} className="text-[#6e6e6e]" />
        <input
          type="text"
          value={columnFilter}
          onChange={e => setColumnFilter(e.target.value)}
          placeholder="Filter columns..."
          className="flex-1 bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1 text-xs text-white placeholder-[#6e6e6e] focus:outline-none focus:ring-1 focus:ring-[#007acc]/50"
        />
        <span className="text-[10px] text-[#555555]">{fields.length} / {selectedTable.field.length}</span>
      </div>

      {/* Column table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-[#252526] z-10">
            <tr className="text-[10px] text-[#858585] uppercase tracking-wider">
              <th className="text-left px-3 py-1.5 font-medium">#</th>
              <th className="text-left px-3 py-1.5 font-medium">Column Name</th>
              <th className="text-left px-3 py-1.5 font-medium">Description</th>
              <th className="text-left px-3 py-1.5 font-medium">Type</th>
              <th className="text-left px-3 py-1.5 font-medium">Null</th>
              <th className="text-left px-3 py-1.5 font-medium">Max Len</th>
              <th className="text-left px-3 py-1.5 font-medium">Default</th>
              <th className="text-left px-3 py-1.5 font-medium">Reference</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f, i) => (
              <tr
                key={f.columnName}
                className={`border-t border-[#2d2d2d] hover:bg-[#2d2d2d] transition-colors ${
                  i % 2 === 0 ? '' : 'bg-[#1e1e1e]/50'
                }`}
              >
                <td className="px-3 py-1.5 text-[#555555] font-mono">{f.columnOrdinal}</td>
                <td className="px-3 py-1.5 font-mono text-[#9cdcfe]">{f.columnName}</td>
                <td className="px-3 py-1.5 text-[#cccccc]">{f.columnDescription}</td>
                <td className="px-3 py-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-[#383838] text-[#ce9178] text-[10px]">
                    {f.dataType}
                  </span>
                </td>
                <td className="px-3 py-1.5 text-center">
                  {f.nullAllowed === 'Y' ? (
                    <span className="text-[#6a9955]">Y</span>
                  ) : (
                    <span className="text-[#f48771]">N</span>
                  )}
                </td>
                <td className="px-3 py-1.5 font-mono text-[#b5cea8]">
                  {f.maximumLength || ''}
                </td>
                <td className="px-3 py-1.5 text-[#858585] truncate max-w-[150px]">
                  {f.defaultContents}
                </td>
                <td className="px-3 py-1.5">
                  {f.referenceTableName && (
                    <ReferenceLink tableName={f.referenceTableName} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Metadata footer */}
      <TableMetadataFooter />
    </div>
  )
}

const ReferenceLink: React.FC<{ tableName: string }> = ({ tableName }) => {
  const { tables, setSelectedTable } = useTableBrowserStore()
  return (
    <button
      onClick={() => {
        const t = tables.find(t => t.tableName === tableName)
        if (t) {
          setSelectedTable(t)
          useShellStore.getState().setBottomPanelVisible(true)
          useShellStore.getState().setActiveBottomTabId('table-detail')
        }
      }}
      className="flex items-center gap-1 text-[#569cd6] hover:underline text-[10px]"
    >
      <ExternalLink size={10} />
      {tableName}
    </button>
  )
}

const TableMetadataFooter: React.FC = () => {
  const { selectedTable } = useTableBrowserStore()
  if (!selectedTable) return null
  const t = selectedTable

  return (
    <div className="px-3 py-2 border-t border-[#414141] bg-[#252526] flex flex-wrap gap-x-6 gap-y-1 text-[10px]">
      {t.parentTableName && (
        <div><span className="text-[#858585]">Parent:</span> <ReferenceLink tableName={t.parentTableName} /></div>
      )}
      {t.defaultsTableName && (
        <div><span className="text-[#858585]">Defaults:</span> <ReferenceLink tableName={t.defaultsTableName} /></div>
      )}
      {t.childTable.length > 0 && (
        <div className="text-[#858585]">
          Children: {t.childTable.map((c, i) => (
            <React.Fragment key={c.tableName}>
              {i > 0 && ', '}
              <ReferenceLink tableName={c.tableName} />
            </React.Fragment>
          ))}
        </div>
      )}
      {t.reference.length > 0 && (
        <div className="text-[#858585]">
          References: {t.reference.map((r, i) => (
            <React.Fragment key={`${r.tableName}-${r.columnName}`}>
              {i > 0 && ', '}
              <ReferenceLink tableName={r.tableName} />
              <span className="text-[#555555]">({r.columnName})</span>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Search Tab ──────────────────────────────────────────────

const SearchTab: React.FC = () => {
  const {
    selectedTable, filters, filtersLoading,
    setFilters, setFiltersLoading,
    setSearchResults, setSearchLoading, setActiveDetailTab
  } = useTableBrowserStore()
  const [selectedFilter, setSelectedFilter] = useState<SearchFilter | null>(null)
  const [paramValues, setParamValues] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!selectedTable) return
    setFiltersLoading(true)
    fetchSearchFilters(selectedTable.tableName)
      .then(f => {
        setFilters(f)
        if (f.length > 0) setSelectedFilter(f[0])
      })
      .catch(() => setFilters([]))
      .finally(() => setFiltersLoading(false))
  }, [selectedTable?.tableName])

  useEffect(() => {
    setParamValues({})
  }, [selectedFilter?.filterName])

  const handleSearch = async () => {
    if (!selectedTable || !selectedFilter) return
    setSearchLoading(true)
    setActiveDetailTab('results')
    try {
      const params = selectedFilter.parameter.map(p => ({
        columnName: p.columnName,
        value: paramValues[p.columnName] || ''
      })).filter(p => p.value)

      // If no column-based params but there's a single unnamed param, use first value
      if (params.length === 0 && Object.values(paramValues).some(v => v)) {
        const firstVal = Object.values(paramValues).find(v => v)
        if (firstVal) params.push({ columnName: '', value: firstVal })
      }

      const data = await searchTable(selectedTable.tableName, selectedFilter.filterName, params)
      const rows = data.resultRows || []
      const columns = data.selectColumnName || (rows.length > 0
        ? Object.keys(rows[0]).filter(k => k !== 'serial')
        : [])
      setSearchResults(rows, columns, data.totalHitCount || rows.length)
    } catch (err) {
      console.error('Search failed:', err)
      setSearchResults([], [], 0)
    } finally {
      setSearchLoading(false)
    }
  }

  if (!selectedTable) return null

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 space-y-3">
        {filtersLoading ? (
          <div className="flex items-center gap-2 text-xs text-[#858585]">
            <RefreshCw size={12} className="animate-spin" /> Loading filters...
          </div>
        ) : filters.length === 0 ? (
          <div className="text-xs text-[#858585] italic">No search filters available for this table</div>
        ) : (
          <>
            {/* Filter selector */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#858585]">Search Filter</label>
              <select
                value={selectedFilter?.filterName || ''}
                onChange={e => {
                  const f = filters.find(f => f.filterName === e.target.value)
                  setSelectedFilter(f || null)
                }}
                className="w-full bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007acc]/50"
              >
                {filters.map(f => (
                  <option key={f.filterName} value={f.filterName}>
                    {f.filterDescription || f.filterName}
                  </option>
                ))}
              </select>
            </div>

            {/* Parameters */}
            {selectedFilter && selectedFilter.parameter.length > 0 && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#858585]">Parameters</label>
                {selectedFilter.parameter.map(p => (
                  <div key={p.columnName} className="flex items-center gap-2">
                    <span className="text-[10px] text-[#9cdcfe] font-mono min-w-[120px]">{p.columnName}</span>
                    <input
                      type="text"
                      value={paramValues[p.columnName] || ''}
                      onChange={e => setParamValues(prev => ({ ...prev, [p.columnName]: e.target.value }))}
                      onKeyDown={e => { if (e.key === 'Enter') handleSearch() }}
                      placeholder={p.dataType || 'value'}
                      className="flex-1 bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1 text-xs text-white placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-[#007acc]/50"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* If no named params, show a generic search box */}
            {selectedFilter && selectedFilter.parameter.length === 0 && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#858585]">Search Value</label>
                <input
                  type="text"
                  value={paramValues['_default'] || ''}
                  onChange={e => setParamValues({ _default: e.target.value })}
                  onKeyDown={e => { if (e.key === 'Enter') handleSearch() }}
                  placeholder="Enter search value..."
                  className="w-full bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1.5 text-xs text-white placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-[#007acc]/50"
                />
              </div>
            )}

            <button
              onClick={handleSearch}
              className="flex items-center gap-2 px-4 py-1.5 bg-[#007acc] hover:bg-[#006bb3] rounded text-white text-xs font-medium transition-colors"
            >
              <Search size={12} />
              Search
            </button>
          </>
        )}
      </div>

      {/* Code examples */}
      {selectedFilter && (
        <div className="flex-1 overflow-hidden flex flex-col">
          <CodeExamples
            xmlCode={searchXmlTemplate(selectedTable.tableName, selectedFilter)}
            jsCode={searchJsTemplate(selectedTable.tableName, selectedFilter)}
          />
        </div>
      )}
    </div>
  )
}

// ─── Record Operations Tab ───────────────────────────────────

const RecordOpsTab: React.FC = () => {
  const { selectedTable } = useTableBrowserStore()
  const [operation, setOperation] = useState<RecordOperation>('V')

  if (!selectedTable) return null

  const xmlCode = recordXmlTemplate(selectedTable, operation)
  const jsCode = recordJsTemplate(selectedTable, operation)

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-[#414141]">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#858585]">Operation</label>
          <div className="flex gap-1">
            {RECORD_OPERATIONS.map(op => (
              <button
                key={op.value}
                onClick={() => setOperation(op.value)}
                className={`flex-1 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded transition-colors ${
                  operation === op.value
                    ? 'bg-[#007acc] text-white'
                    : 'bg-[#383838] text-[#858585] hover:text-[#cccccc]'
                }`}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <CodeExamples xmlCode={xmlCode} jsCode={jsCode} />
      </div>
    </div>
  )
}

// ─── Shared Code Examples Component ──────────────────────────

const CodeExamples: React.FC<{ xmlCode: string; jsCode: string }> = ({ xmlCode, jsCode }) => {
  const [tab, setTab] = useState<'xml' | 'js'>('js')
  const code = tab === 'xml' ? xmlCode : jsCode
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center bg-[#252526] border-b border-[#414141] h-7 shrink-0">
        <button
          onClick={() => setTab('xml')}
          className={`px-3 h-full text-[10px] uppercase tracking-wider border-b-2 transition-colors ${
            tab === 'xml' ? 'text-white border-white' : 'text-[#858585] border-transparent hover:text-[#cccccc]'
          }`}
        >
          <Code size={10} className="inline mr-1" />XML
        </button>
        <button
          onClick={() => setTab('js')}
          className={`px-3 h-full text-[10px] uppercase tracking-wider border-b-2 transition-colors ${
            tab === 'js' ? 'text-white border-white' : 'text-[#858585] border-transparent hover:text-[#cccccc]'
          }`}
        >
          <Braces size={10} className="inline mr-1" />JavaScript
        </button>
        <div className="flex-1" />
        <button
          onClick={handleCopy}
          className="px-2 py-0.5 mr-1 text-[10px] text-[#858585] hover:text-white hover:bg-[#383838] rounded transition-colors"
        >
          {copied ? <span className="text-[#6a9955]">Copied!</span> : <><Copy size={10} className="inline mr-1" />Copy</>}
        </button>
      </div>
      <pre className="flex-1 overflow-auto p-3 text-[11px] font-mono leading-relaxed text-[#ce9178] bg-[#1e1e1e] whitespace-pre">
        {code}
      </pre>
    </div>
  )
}

// ─── Results Tab ─────────────────────────────────────────────

const ResultsTab: React.FC = () => {
  const {
    searchResults, searchColumns, totalHitCount, searchLoading,
    selectedTable, setViewingRecord, setRecordLoading, setActiveDetailTab
  } = useTableBrowserStore()

  const handleViewRecord = async (serial: string) => {
    if (!selectedTable) return
    setRecordLoading(true)
    setActiveDetailTab('record')
    try {
      const data = await viewRecord(selectedTable.tableName, serial)
      setViewingRecord(data, serial)
    } catch (err) {
      console.error('View record failed:', err)
      setViewingRecord(null, null)
    } finally {
      setRecordLoading(false)
    }
  }

  if (searchLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <RefreshCw size={24} className="animate-spin text-[#555555]" />
      </div>
    )
  }

  if (searchResults.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-[#555555] gap-2">
        <Table2 size={32} className="opacity-20" />
        <div className="text-xs opacity-40">No search results</div>
        <div className="text-[10px] opacity-20">Use the Search tab to query records</div>
      </div>
    )
  }

  const displayColumns = searchColumns.length > 0
    ? searchColumns
    : Object.keys(searchResults[0]).filter(k => k !== 'serial')

  return (
    <div className="h-full flex flex-col">
      {/* Results header */}
      <div className="px-3 py-1.5 border-b border-[#414141] bg-[#252526] flex items-center justify-between text-[10px] text-[#858585]">
        <span>{totalHitCount} total results ({searchResults.length} shown)</span>
      </div>

      {/* Results grid */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-[#252526] z-10">
            <tr className="text-[10px] text-[#858585] uppercase tracking-wider">
              <th className="text-left px-3 py-1.5 font-medium">Serial</th>
              {displayColumns.map(col => (
                <th key={col} className="text-left px-3 py-1.5 font-medium">{col}</th>
              ))}
              <th className="px-3 py-1.5 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((row, i) => (
              <tr
                key={row.serial || i}
                className={`border-t border-[#2d2d2d] hover:bg-[#2d2d2d] cursor-pointer transition-colors ${
                  i % 2 === 0 ? '' : 'bg-[#1e1e1e]/50'
                }`}
                onClick={() => row.serial && handleViewRecord(row.serial)}
              >
                <td className="px-3 py-1.5 font-mono text-[#569cd6]">{row.serial}</td>
                {displayColumns.map(col => (
                  <td key={col} className="px-3 py-1.5 text-[#cccccc] truncate max-w-[200px]">
                    {row[col] ?? ''}
                  </td>
                ))}
                <td className="px-3 py-1.5">
                  <Eye size={12} className="text-[#555555] hover:text-[#569cd6]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Record Tab ──────────────────────────────────────────────

const RecordTab: React.FC = () => {
  const {
    viewingRecord, viewingSerial, recordLoading,
    selectedTable, setActiveDetailTab
  } = useTableBrowserStore()

  if (recordLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <RefreshCw size={24} className="animate-spin text-[#555555]" />
      </div>
    )
  }

  if (!viewingRecord || !viewingSerial) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-[#555555] gap-2">
        <Eye size={32} className="opacity-20" />
        <div className="text-xs opacity-40">No record selected</div>
        <div className="text-[10px] opacity-20">Click a row in Results to view its details</div>
      </div>
    )
  }

  // Flatten nested response — record data may be nested under step/record/field
  const flatRecord = flattenRecord(viewingRecord)
  const entries = Object.entries(flatRecord).filter(([k]) =>
    !['@xmlns', 'xmlns', 'xmlns:v1'].includes(k)
  )

  return (
    <div className="h-full flex flex-col">
      {/* Record header */}
      <div className="px-4 py-2 border-b border-[#414141] bg-[#252526] flex items-center gap-3">
        <button
          onClick={() => setActiveDetailTab('results')}
          className="p-1 hover:bg-[#383838] rounded text-[#858585] hover:text-white"
        >
          <ArrowLeft size={14} />
        </button>
        <div>
          <div className="text-xs font-bold text-white">
            {selectedTable?.tableName} #{viewingSerial}
          </div>
        </div>
        <CopyRecordButton record={flatRecord} />
      </div>

      {/* Field list */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-[#252526] z-10">
            <tr className="text-[10px] text-[#858585] uppercase tracking-wider">
              <th className="text-left px-4 py-1.5 font-medium w-1/3">Field</th>
              <th className="text-left px-4 py-1.5 font-medium">Value</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([key, value], i) => (
              <tr
                key={key}
                className={`border-t border-[#2d2d2d] hover:bg-[#2d2d2d] ${
                  i % 2 === 0 ? '' : 'bg-[#1e1e1e]/50'
                }`}
              >
                <td className="px-4 py-1.5 font-mono text-[#9cdcfe]">{key}</td>
                <td className="px-4 py-1.5 text-[#cccccc] break-all">
                  {formatFieldValue(String(value ?? ''))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const CopyRecordButton: React.FC<{ record: Record<string, any> }> = ({ record }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(record, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={handleCopy}
      className="ml-auto flex items-center gap-1 px-2 py-1 text-[10px] text-[#858585] hover:text-white hover:bg-[#383838] rounded transition-colors"
    >
      <Copy size={10} />
      {copied ? 'Copied!' : 'Copy JSON'}
    </button>
  )
}

// ─── Helpers ─────────────────────────────────────────────────

function flattenRecord(data: any): Record<string, any> {
  // DirectXMLPostJSON response may nest the record data differently
  // Try common nesting patterns
  if (data.sequence?.transaction?.step?.record?.field) {
    const fields = data.sequence.transaction.step.record.field
    if (Array.isArray(fields)) {
      const result: Record<string, any> = {}
      for (const f of fields) {
        if (f.columnName && f.contents !== undefined) {
          result[f.columnName] = f.contents
        }
      }
      return result
    }
  }
  // Try flat field array
  if (Array.isArray(data.field)) {
    const result: Record<string, any> = {}
    for (const f of data.field) {
      if (f.columnName) result[f.columnName] = f.contents ?? ''
    }
    return result
  }
  // Already flat
  return data
}

function formatFieldValue(val: string): React.ReactNode {
  if (!val) return <span className="text-[#555555] italic">empty</span>
  // Highlight serials (numbers > 0)
  if (/^\d+$/.test(val) && val.length > 2) {
    return <span className="font-mono text-[#b5cea8]">{val}</span>
  }
  // Date patterns
  if (/^\d{4}-\d{2}-\d{2}/.test(val)) {
    return <span className="text-[#dcdcaa]">{val}</span>
  }
  return val
}
