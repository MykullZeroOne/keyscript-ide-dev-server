/**
 * Table Browser API — fetches table metadata, columns, filters, and records from Keystone.
 *
 * Endpoints used:
 *   POST /TableBrowser  (no body → full table list)
 *   POST /TableBrowser  (step=searchList&tableName=X → search filters)
 *   POST /TableBrowser  (step=recordTreeList&tableName=X → record trees)
 *   POST /DirectXMLPostJSON  (XML body → search/record operations)
 */

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// ─── Types ──────────────────────────────────────────────────

export interface TableField {
  columnOrdinal: number
  columnName: string
  columnDescription: string
  dataType: string
  nullAllowed: string
  calculation: string
  extractFromDefaults: string
  defaultContents: string
  maximumLength: number
  maximumAbsoluteValue: number
  referenceTableName: string
  viewGroup: string
}

export interface TableInfo {
  tableName: string
  tableDescription: string
  parentTableName: string
  defaultsTableName: string
  accessKeyPrefix: string
  viewGroup: string
  childTable: { tableName: string; tableDescription?: string }[]
  reference: { tableName: string; columnName: string }[]
  field: TableField[]
}

export interface SearchFilter {
  filterName: string
  filterDescription: string
  parameter: { columnName: string; dataType: string }[]
}

export interface RecordRow {
  serial: string
  [key: string]: string
}

export interface SearchResultData {
  resultRows: RecordRow[]
  totalHitCount: number
  selectColumnName?: string[]
}

export interface RecordData {
  [key: string]: string | number | null
}

// ─── API calls ──────────────────────────────────────────────

/** Fetch full table metadata list from /TableBrowser (GET returns JSON array of tables) */
export async function fetchTableList(): Promise<TableInfo[]> {
  const res = await fetch('/TableBrowser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: ''
  })
  const text = await res.text()
  let data: any
  try {
    data = JSON.parse(text)
  } catch {
    console.error('[TableBrowser] Non-JSON response:', text.substring(0, 500))
    throw new Error('TableBrowser returned non-JSON response')
  }
  // Response is an array of table objects
  const tables = Array.isArray(data) ? data : (data.table || data.tables || [])
  console.log(`[TableBrowser] Loaded ${tables.length} tables`)
  return tables.map(normalizeTable)
}

/** Fetch search filters for a specific table.
 *  Response structure: { query: { sequence: [{ transaction: [{ step: [
 *    { searchList: { standardFilterName } },
 *    { search: { filterName, filterDescription, parameter: [...] } },
 *    ...
 *  ]}]}]}}
 */
export async function fetchSearchFilters(tableName: string): Promise<SearchFilter[]> {
  const res = await fetch('/TableBrowser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `step=searchList&tableName=${encodeURIComponent(tableName)}`
  })
  const text = await res.text()
  let data: any
  try {
    data = JSON.parse(text)
  } catch {
    console.error('[TableBrowser/searchList] Non-JSON response:', text.substring(0, 500))
    return []
  }
  console.log('[TableBrowser/searchList] Response keys:', Object.keys(data))

  // Navigate the nested query response
  try {
    const steps = data?.query?.sequence?.[0]?.transaction?.[0]?.step
    if (!Array.isArray(steps) || steps.length === 0) return []

    const filters: SearchFilter[] = []
    // First step has searchList with standardFilterName, subsequent steps have search objects
    for (const step of steps) {
      const search = step.search
      if (!search) continue
      const params = normalizeParams(search.parameter)
      filters.push({
        filterName: search.filterName || '',
        filterDescription: search.filterDescription || search.filterName || '',
        parameter: params
      })
    }
    return filters
  } catch {
    // Fallback: try flat array format
    const filters = Array.isArray(data) ? data : (data.filter || data.filters || [])
    return filters.map((f: any) => ({
      filterName: f.filterName || '',
      filterDescription: f.filterDescription || f.filterName || '',
      parameter: normalizeParams(f.parameter)
    }))
  }
}

function normalizeParams(raw: any): { columnName: string; dataType: string }[] {
  if (!raw) return []
  const arr = Array.isArray(raw) ? raw : [raw]
  return arr.map((p: any) => ({
    columnName: p.columnName || '',
    dataType: typeof p.dataType === 'object' ? p.dataType?.text || '' : (p.dataType || '')
  }))
}

/** Search records in a table using DirectXMLPostJSON */
export async function searchTable(
  tableName: string,
  filterName: string,
  params: { columnName?: string; value: string }[],
  returnLimit: number = 50
): Promise<SearchResultData> {
  const p = 'v1'
  const ns = 'http://www.corelationinc.com/queryLanguage/v1.0'

  let parameterXml = ''
  for (const param of params) {
    if (param.columnName) {
      parameterXml += `<${p}:parameter><${p}:columnName>${escapeXml(param.columnName)}</${p}:columnName><${p}:contents>${escapeXml(param.value)}</${p}:contents></${p}:parameter>`
    } else {
      parameterXml += `<${p}:parameter><${p}:contents>${escapeXml(param.value)}</${p}:contents></${p}:parameter>`
    }
  }

  const xml = `<${p}:query xmlns:${p}="${ns}"><${p}:sequence><${p}:transaction><${p}:step><${p}:search>` +
    `<${p}:tableName>${escapeXml(tableName)}</${p}:tableName>` +
    `<${p}:filterName>${escapeXml(filterName)}</${p}:filterName>` +
    `<${p}:includeSelectColumns option="Y"/>` +
    `<${p}:includeTotalHitCount option="Y"/>` +
    `<${p}:returnLimit>${returnLimit}</${p}:returnLimit>` +
    parameterXml +
    `</${p}:search></${p}:step></${p}:transaction></${p}:sequence></${p}:query>`

  const res = await fetch('/SearchJSON', {
    method: 'POST',
    headers: { 'Content-Type': 'text/xml' },
    body: xml
  })
  return res.json()
}

/** View a single record by serial using DirectXMLPostJSON */
export async function viewRecord(tableName: string, serial: string): Promise<RecordData> {
  const p = 'v1'
  const ns = 'http://www.corelationinc.com/queryLanguage/v1.0'

  const xml = `<${p}:query xmlns:${p}="${ns}"><${p}:sequence><${p}:transaction><${p}:step><${p}:record>` +
    `<${p}:tableName>${escapeXml(tableName)}</${p}:tableName>` +
    `<${p}:operation>V</${p}:operation>` +
    `<${p}:targetSerial>${escapeXml(serial)}</${p}:targetSerial>` +
    `</${p}:record></${p}:step></${p}:transaction></${p}:sequence></${p}:query>`

  const res = await fetch('/DirectXMLPostJSON', {
    method: 'POST',
    headers: { 'Content-Type': 'text/xml' },
    body: xml
  })
  const data = await res.json()
  // Response usually has the record fields at the top level or nested
  return data
}

// ─── Helpers ────────────────────────────────────────────────

function normalizeTable(raw: any): TableInfo {
  const fields = Array.isArray(raw.field)
    ? raw.field
    : raw.field ? [raw.field] : []

  return {
    tableName: raw.tableName || '',
    tableDescription: raw.tableDescription || '',
    parentTableName: raw.parentTableName || '',
    defaultsTableName: raw.defaultsTableName || '',
    accessKeyPrefix: raw.accessKeyPrefix || '',
    viewGroup: raw.viewGroup || '',
    childTable: Array.isArray(raw.childTable)
      ? raw.childTable
      : raw.childTable ? [raw.childTable] : [],
    reference: Array.isArray(raw.reference)
      ? raw.reference
      : raw.reference ? [raw.reference] : [],
    field: fields.map((f: any) => ({
      columnOrdinal: f.columnOrdinal ?? 0,
      columnName: f.columnName || '',
      columnDescription: f.columnDescription || '',
      dataType: typeof f.dataType === 'object' ? f.dataType?.text || '' : (f.dataType || ''),
      nullAllowed: typeof f.nullAllowed === 'object' ? f.nullAllowed?.text || '' : (f.nullAllowed || ''),
      calculation: typeof f.calculation === 'object' ? f.calculation?.text || '' : (f.calculation || ''),
      extractFromDefaults: typeof f.extractFromDefaults === 'object' ? f.extractFromDefaults?.text || '' : (f.extractFromDefaults || ''),
      defaultContents: f.defaultContents || '',
      maximumLength: f.maximumLength ?? 0,
      maximumAbsoluteValue: f.maximumAbsoluteValue ?? 0,
      referenceTableName: f.referenceTableName || '',
      viewGroup: f.viewGroup || ''
    }))
  }
}
