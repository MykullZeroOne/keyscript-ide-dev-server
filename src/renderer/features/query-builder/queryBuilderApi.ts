/**
 * Query Builder API — loads query language types and posts queries.
 * Types come from /KeyScript/query-language.json served by Keystone.
 */

// ─── Types (matching actual Keystone response format) ────────

export interface QLProperty {
  name: string
  type: string            // Text, TextArea, Money, Count, Date, Time, Serial, Option, Rate, Binary, Document
  required: boolean
  passed: boolean         // Can be passed in request
  returned: boolean       // Returned in response
  doc?: string
  defaultValue?: string
}

export interface QLContainer {
  name: string            // XML element name (e.g. "record", "field")
  type: string            // References another QLType name (e.g. "Record", "Field")
  required: boolean
  passed: boolean
  returned: boolean
  doc?: string
}

export interface QLAttribute {
  name: string
  type: string
  required: boolean
  passed: boolean
  returned: boolean
}

export interface QLType {
  type: string            // Type name (e.g. "Record", "Search", "Step")
  properties: QLProperty[]
  containers: QLContainer[]
  attributes: QLAttribute[]
}

export interface QueryNode {
  id: string
  typeName: string        // QLType.type reference
  elementName: string     // XML element name (from container.name or lowercase of type)
  label: string           // Display label
  properties: Record<string, string>
  children: QueryNode[]
  expanded: boolean
}

export interface PostResult {
  success: boolean
  result: string
  exceptions: { text: string; severity?: string }[]
  responseData?: any
}

// ─── API ────────────────────────────────────────────────────

let cachedTypes: QLType[] | null = null

export async function loadQueryLanguageTypes(): Promise<QLType[]> {
  if (cachedTypes) return cachedTypes
  const res = await fetch('/Keyscript_IDE/KeyScript/query-language.json', { method: 'POST' })
  if (!res.ok) {
    throw new Error(`Failed to load query-language.json: ${res.status}`)
  }
  const data = await res.json()
  cachedTypes = (data.types || data) as QLType[]
  console.log(`[QueryBuilder] Loaded ${cachedTypes.length} query language types`)
  return cachedTypes
}

export function findType(types: QLType[], name: string): QLType | undefined {
  return types.find(t => t.type === name)
}

// ─── XML Serialization ──────────────────────────────────────

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export function serializeNodeToXml(node: QueryNode, types: QLType[], indent: number = 0): string {
  const pad = '  '.repeat(indent)
  const tag = node.elementName
  const nodeType = findType(types, node.typeName)
  const attrNames = new Set((nodeType?.attributes || []).map(a => a.name))

  const attrs: string[] = []
  const propElements: string[] = []

  for (const [key, value] of Object.entries(node.properties)) {
    if (!value) continue
    if (attrNames.has(key)) {
      attrs.push(`${key}="${escapeXml(value)}"`)
    } else {
      // Check if this is an Option-type property
      const prop = nodeType?.properties.find(p => p.name === key)
      if (prop?.type === 'Option') {
        propElements.push(`${pad}  <${key} option="${escapeXml(value)}"/>`)
      } else {
        propElements.push(`${pad}  <${key}>${escapeXml(value)}</${key}>`)
      }
    }
  }

  // Child nodes
  const childElements: string[] = []
  for (const child of node.children) {
    childElements.push(serializeNodeToXml(child, types, indent + 1))
  }

  const allInner = [...propElements, ...childElements]
  const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : ''

  if (allInner.length === 0) {
    return `${pad}<${tag}${attrStr}/>`
  }
  return `${pad}<${tag}${attrStr}>\n${allInner.join('\n')}\n${pad}</${tag}>`
}

export function generateQueryXml(root: QueryNode, types: QLType[]): string {
  const ns = 'http://www.corelationinc.com/queryLanguage/v1.0'
  const inner: string[] = []
  for (const child of root.children) {
    inner.push(serializeNodeToXml(child, types, 1))
  }
  return `<query xmlns="${ns}">\n${inner.join('\n')}\n</query>`
}

// ─── JavaScript Code Generation ─────────────────────────────

export function generateJavaScript(root: QueryNode, types: QLType[]): string {
  const lines: string[] = []
  lines.push('var xml = new CR.XML();')
  lines.push('var root = xml.getRootElement();')
  lines.push('')

  for (const child of root.children) {
    generateJsForNode(child, 'root', types, lines, 0)
  }

  lines.push('')
  lines.push('CR.Core.ajaxRequest({')
  lines.push('  url: "DirectXMLPostJSON",')
  lines.push('  xmlData: xml.getXMLDocument(),')
  lines.push('  success: function(response) {')
  lines.push('    var tranResult = "failed";')
  lines.push('    var errorArray = [];')
  lines.push('    var responseJson = CR.JSON.parse(response.responseText);')
  lines.push('    var query = responseJson.query;')
  lines.push('    if (query) {')
  lines.push('      Ext.each(query.sequence, function(sequence) {')
  lines.push('        Ext.each(sequence.transaction, function(transaction) {')
  lines.push('          tranResult = transaction.$attr.result;')
  lines.push('          Ext.each(transaction.exception, function(exception) {')
  lines.push('            errorArray.push(exception.message);')
  lines.push('          });')
  lines.push('          Ext.each(transaction.step, function(step) {')
  lines.push('            if (step.tranResult &&')
  lines.push('                step.tranResult.category &&')
  lines.push('                step.tranResult.category.option === "E") {')
  lines.push('              errorArray.push(step.tranResult.description);')
  lines.push('            }')
  lines.push('            // Process step results here')
  lines.push('          });')
  lines.push('        });')
  lines.push('      });')
  lines.push('    }')
  lines.push('    if (tranResult !== "posted" || errorArray.length > 0) {')
  lines.push('      CR.Core.displayExceptions({ items: errorArray });')
  lines.push('    } else {')
  lines.push('      console.log("Success:", responseJson);')
  lines.push('    }')
  lines.push('  }')
  lines.push('});')
  return lines.join('\n')
}

function generateJsForNode(node: QueryNode, parentVar: string, types: QLType[], lines: string[], depth: number): void {
  const pad = '  '.repeat(depth)
  const varName = `v_${node.elementName}${depth}`
  const nodeType = findType(types, node.typeName)
  const attrNames = new Set((nodeType?.attributes || []).map(a => a.name))

  lines.push(`${pad}var ${varName} = xml.addContainer(${parentVar}, "${node.elementName}");`)

  for (const [key, value] of Object.entries(node.properties)) {
    if (!value) continue
    if (attrNames.has(key)) continue // attributes handled differently
    const prop = nodeType?.properties.find(p => p.name === key)
    if (prop?.type === 'Option') {
      lines.push(`${pad}xml.addOption(${varName}, "${key}", "${value}");`)
    } else {
      lines.push(`${pad}xml.addText(${varName}, "${key}", "${value}");`)
    }
  }

  for (const child of node.children) {
    generateJsForNode(child, varName, types, lines, depth + 1)
  }
}

// ─── Post/Verify Query ──────────────────────────────────────

export async function postQuery(root: QueryNode, types: QLType[], verify: boolean): Promise<PostResult> {
  // If verify, set postingMode property on transaction nodes
  if (verify) {
    setPostingMode(root, 'V')
  }

  const xml = generateQueryXml(root, types)

  // Clean up — remove postingMode if we added it for verify
  if (verify) {
    clearPostingMode(root)
  }

  const res = await fetch('/DirectXMLPostJSON', {
    method: 'POST',
    headers: { 'Content-Type': 'text/xml' },
    body: xml
  })

  const data = await res.json()
  const exceptions: { text: string; severity?: string }[] = []
  let result = 'failed'

  try {
    const seq = data?.query?.sequence
    if (Array.isArray(seq)) {
      for (const s of seq) {
        const txns = s.transaction || []
        for (const t of Array.isArray(txns) ? txns : [txns]) {
          const txnResult = t?.$attr?.result || t?.result
          if (txnResult) result = txnResult
          const excs = t?.exception || []
          for (const e of Array.isArray(excs) ? excs : [excs]) {
            exceptions.push({ text: e?.message || e?.text || String(e), severity: e?.severity })
          }
        }
      }
    }
  } catch {
    if (data.result) result = data.result
  }

  return { success: result === 'posted' || result === 'verified', result, exceptions, responseData: data }
}

function setPostingMode(node: QueryNode, mode: string): void {
  if (node.typeName === 'Transaction') {
    node.properties['postingMode'] = mode
  }
  for (const child of node.children) setPostingMode(child, mode)
}

function clearPostingMode(node: QueryNode): void {
  if (node.typeName === 'Transaction') {
    delete node.properties['postingMode']
  }
  for (const child of node.children) clearPostingMode(child)
}

// ─── Default Tree ───────────────────────────────────────────

let nodeIdCounter = 0
export function newNodeId(): string {
  return `qn_${++nodeIdCounter}`
}

export function createDefaultTree(): QueryNode {
  return {
    id: newNodeId(),
    typeName: 'Query',
    elementName: 'query',
    label: 'Query',
    properties: {},
    expanded: true,
    children: [{
      id: newNodeId(),
      typeName: 'Sequence',
      elementName: 'sequence',
      label: 'Sequence',
      properties: {},
      expanded: true,
      children: [{
        id: newNodeId(),
        typeName: 'Transaction',
        elementName: 'transaction',
        label: 'Transaction',
        properties: {},
        expanded: true,
        children: [{
          id: newNodeId(),
          typeName: 'Step',
          elementName: 'step',
          label: 'Step',
          properties: {},
          expanded: true,
          children: []
        }]
      }]
    }]
  }
}
