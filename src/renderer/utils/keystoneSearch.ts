/**
 * Build Keystone SearchJSON XML request and parse response.
 * Mirrors the CR.XML structure used by the original ExtJS Keyscript IDE.
 *
 * XML is built as a plain string to exactly match the format Keystone expects.
 */

export interface SearchParams {
  tableName: string
  filterName?: string
  query: string
  returnLimit?: number
  columnName?: string
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export function determinePersonFilter(input: string): string {
  if (!input) return 'BY_LAST_FIRST_MIDDLE_NAME'

  let allDigits = true
  let atCount = 0
  let hasSpace = false
  let hasDotAfterAt = false

  for (const ch of input) {
    if (ch >= '0' && ch <= '9') continue
    allDigits = false
    if (ch === '@') atCount++
    else if (ch === ' ') hasSpace = true
    else if (ch === '.' && atCount === 1) hasDotAfterAt = true
  }

  if (/^\d{3}-\d{2}-\d{4}$/.test(input) || /^\d{2}-\d{7}$/.test(input)) return 'BY_TIN'
  if (/^\d{3}[.\-]\d{3}[.\-]\d{4}$/.test(input) || /^\(\d{3}\)\d{3}-\d{4}$/.test(input)) return 'BY_PHONE_NUMBER'
  if (!hasSpace && hasDotAfterAt && atCount === 1) return 'BY_EMAIL_ADDRESS'
  // Numbers → assume account number (most common person lookup)
  if (allDigits && input.length > 0) return 'BY_ACCOUNT_NUMBER'
  return 'BY_LAST_FIRST_MIDDLE_NAME'
}

function buildSearchXml(params: SearchParams): string {
  const p = 'v1'
  const ns = 'http://www.corelationinc.com/queryLanguage/v1.0'
  const limit = params.returnLimit ?? 20
  const q = escapeXml(params.query)

  let parameterXml = ''
  if (params.columnName) {
    parameterXml = `<${p}:parameter><${p}:columnName>${escapeXml(params.columnName)}</${p}:columnName><${p}:contents>${q}</${p}:contents></${p}:parameter>`
  } else {
    parameterXml = `<${p}:parameter><${p}:contents>${q}</${p}:contents></${p}:parameter>`
  }

  const filterXml = params.filterName
    ? `<${p}:filterName>${escapeXml(params.filterName)}</${p}:filterName>`
    : ''

  return `<${p}:query xmlns:${p}="${ns}"><${p}:sequence><${p}:transaction><${p}:step><${p}:search>` +
    `<${p}:tableName>${escapeXml(params.tableName)}</${p}:tableName>` +
    filterXml +
    `<${p}:includeSelectColumns option="Y"/>` +
    `<${p}:includeTotalHitCount option="Y"/>` +
    `<${p}:returnLimit>${limit}</${p}:returnLimit>` +
    parameterXml +
    `</${p}:search></${p}:step></${p}:transaction></${p}:sequence></${p}:query>`
}

export interface SearchResult {
  serial: string
  rowDescription: string
  rowStatus?: string
}

export interface SearchResponse {
  results: SearchResult[]
  totalHitCount: number
}

export async function keystoneSearch(params: SearchParams): Promise<SearchResponse> {
  const xml = buildSearchXml(params)

  const response = await fetch('/SearchJSON', {
    method: 'POST',
    headers: { 'Content-Type': 'text/xml' },
    body: xml
  })

  const data = await response.json()

  // SearchJSON returns { resultRows: [...], totalHitCount: N }
  const rows = data.resultRows || []
  return {
    results: rows.map((r: any) => ({
      serial: r.serial || '',
      rowDescription: r.rowDescription || '',
      rowStatus: r.rowStatus || ''
    })),
    totalHitCount: data.totalHitCount || 0
  }
}

export const PERSON_FILTERS = [
  { value: 'AUTO', label: 'Auto-detect' },
  { value: 'BY_LAST_FIRST_MIDDLE_NAME', label: 'Name' },
  { value: 'BY_ACCOUNT_NUMBER', label: 'Account Number' },
  { value: 'BY_TIN', label: 'TIN / SSN' },
  { value: 'BY_PHONE_NUMBER', label: 'Phone Number' },
  { value: 'BY_EMAIL_ADDRESS', label: 'Email Address' },
  { value: 'BY_CARD_NUMBER', label: 'Card Number' },
  { value: 'BY_SERIAL', label: 'Serial' },
] as const

export const ACCOUNT_FILTERS = [
  { value: 'BY_ACCOUNT_NUMBER', label: 'Account Number' },
  { value: 'BY_SERIAL', label: 'Serial' },
  { value: 'BY_ACCOUNT_TITLE', label: 'Account Title' },
  { value: 'BY_VIN', label: 'Vehicle ID (VIN)' },
  { value: 'BY_EXTERNAL_ACCOUNT_NUMBER', label: 'External Account Number' },
] as const

export async function searchPerson(query: string, filter?: string): Promise<SearchResponse> {
  const filterName = (!filter || filter === 'AUTO')
    ? determinePersonFilter(query)
    : filter
  return keystoneSearch({ tableName: 'PERSON', filterName, query })
}

export async function searchAccount(query: string, filter?: string): Promise<SearchResponse> {
  return keystoneSearch({ tableName: 'ACCOUNT', filterName: filter || 'BY_ACCOUNT_NUMBER', query })
}
