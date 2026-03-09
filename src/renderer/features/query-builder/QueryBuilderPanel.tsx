import React, { useEffect, useCallback, useState, useMemo } from 'react'
import {
  ChevronRight, ChevronDown, Plus, Trash2, Play, CheckCircle, AlertTriangle,
  Code, Copy, RefreshCw, X, Braces
} from 'lucide-react'
import { useQueryBuilderStore } from './QueryBuilderStore'
import {
  loadQueryLanguageTypes, createDefaultTree, findType,
  generateQueryXml, generateJavaScript,
  postQuery, newNodeId,
  type QLType, type QLContainer, type QueryNode, type PostResult
} from './queryBuilderApi'

// ─── Helpers ─────────────────────────────────────────────────

function findNode(root: QueryNode, id: string): QueryNode | null {
  if (root.id === id) return root
  for (const c of root.children) {
    const found = findNode(c, id)
    if (found) return found
  }
  return null
}

function findParent(root: QueryNode, id: string): QueryNode | null {
  for (const c of root.children) {
    if (c.id === id) return root
    const found = findParent(c, id)
    if (found) return found
  }
  return null
}

function cloneTree(node: QueryNode): QueryNode {
  return JSON.parse(JSON.stringify(node))
}

// Get available child containers for a node
function getAvailableContainers(node: QueryNode, types: QLType[]): QLContainer[] {
  const nodeType = findType(types, node.typeName)
  if (!nodeType) return []
  // Filter to passed containers (ones the user can add)
  return nodeType.containers.filter(c => !c.returned || c.passed)
}

// ─── Main Panel ──────────────────────────────────────────────

export const QueryBuilderPanel: React.FC = () => {
  const {
    types, typesLoading, typesError,
    setTypes, setTypesLoading, setTypesError,
    root, setRoot, selectedNodeId, setSelectedNodeId,
    codeTab, setCodeTab,
    lastResult, setLastResult, posting, setPosting,
    showPassed, showReturned, toggleShowPassed, toggleShowReturned
  } = useQueryBuilderStore()

  useEffect(() => {
    if (types.length > 0) return
    setTypesLoading(true)
    loadQueryLanguageTypes()
      .then(t => {
        setTypes(t)
        setRoot(createDefaultTree())
        // Auto-select the Step node
      })
      .catch(e => setTypesError(String(e)))
      .finally(() => setTypesLoading(false))
  }, [])

  const selectedNode = useMemo(() => {
    if (!root || !selectedNodeId) return null
    return findNode(root, selectedNodeId)
  }, [root, selectedNodeId])

  const availableContainers = useMemo(() => {
    if (!selectedNode) return []
    return getAvailableContainers(selectedNode, types)
  }, [selectedNode, types])

  const addChild = useCallback((container: QLContainer) => {
    if (!root || !selectedNodeId) return
    const newRoot = cloneTree(root)
    const parent = findNode(newRoot, selectedNodeId)
    if (!parent) return

    const childType = findType(types, container.type)
    const newNode: QueryNode = {
      id: newNodeId(),
      typeName: container.type,
      elementName: container.name,
      label: container.name,
      properties: {},
      children: [],
      expanded: true
    }
    // Initialize required property defaults
    if (childType) {
      for (const prop of childType.properties) {
        if (prop.defaultValue) {
          newNode.properties[prop.name] = prop.defaultValue
        }
      }
    }
    parent.children.push(newNode)
    setRoot(newRoot)
    setSelectedNodeId(newNode.id)
  }, [root, selectedNodeId, types, setRoot, setSelectedNodeId])

  const deleteNode = useCallback(() => {
    if (!root || !selectedNodeId) return
    const newRoot = cloneTree(root)
    const parent = findParent(newRoot, selectedNodeId)
    if (!parent) return
    parent.children = parent.children.filter(c => c.id !== selectedNodeId)
    setRoot(newRoot)
    setSelectedNodeId(parent.id)
  }, [root, selectedNodeId, setRoot, setSelectedNodeId])

  const updateProperty = useCallback((key: string, value: string) => {
    if (!root || !selectedNodeId) return
    const newRoot = cloneTree(root)
    const node = findNode(newRoot, selectedNodeId)
    if (!node) return
    node.properties[key] = value
    setRoot(newRoot)
  }, [root, selectedNodeId, setRoot])

  const handlePost = useCallback(async (verify: boolean) => {
    if (!root) return
    setPosting(true)
    setLastResult(null)
    try {
      const result = await postQuery(cloneTree(root), types, verify)
      setLastResult(result)
    } catch (e) {
      setLastResult({ success: false, result: 'error', exceptions: [{ text: String(e) }] })
    } finally {
      setPosting(false)
    }
  }, [root, types, setPosting, setLastResult])

  const handleReset = useCallback(() => {
    setRoot(createDefaultTree())
    setSelectedNodeId(null)
    setLastResult(null)
  }, [setRoot, setSelectedNodeId, setLastResult])

  const xmlCode = useMemo(() => root ? generateQueryXml(root, types) : '', [root, types])
  const jsCode = useMemo(() => root ? generateJavaScript(root, types) : '', [root, types])

  // Get properties to show based on toggles
  const visibleProps = useMemo(() => {
    if (!selectedNode) return []
    const nodeType = findType(types, selectedNode.typeName)
    if (!nodeType) return []
    return nodeType.properties.filter(p => {
      if (p.passed && showPassed) return true
      if (p.returned && showReturned) return true
      if (!p.passed && !p.returned) return true  // always show untagged
      return false
    })
  }, [selectedNode, types, showPassed, showReturned])

  if (typesLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-[#1e1e1e]">
        <RefreshCw size={24} className="animate-spin text-[#555555]" />
      </div>
    )
  }

  if (typesError) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#1e1e1e] text-[#f48771] gap-2">
        <AlertTriangle size={24} />
        <div className="text-xs">{typesError}</div>
        <button
          onClick={() => {
            setTypesError(null)
            setTypesLoading(true)
            loadQueryLanguageTypes()
              .then(t => { setTypes(t); setRoot(createDefaultTree()) })
              .catch(e => setTypesError(String(e)))
              .finally(() => setTypesLoading(false))
          }}
          className="text-[10px] text-[#569cd6] hover:underline"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Toolbar */}
      <div className="h-9 flex items-center px-3 gap-2 bg-[#252526] border-b border-[#414141] shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#858585] mr-2">Query Builder</span>
        <button
          onClick={() => handlePost(true)}
          disabled={posting}
          className="flex items-center gap-1 px-2 py-1 text-[10px] bg-[#383838] hover:bg-[#4a4a4a] rounded text-[#cccccc] disabled:opacity-50 transition-colors"
          title="Verify query without posting"
        >
          <CheckCircle size={10} />
          Verify
        </button>
        <button
          onClick={() => handlePost(false)}
          disabled={posting}
          className="flex items-center gap-1 px-2 py-1 text-[10px] bg-[#007acc] hover:bg-[#006bb3] rounded text-white disabled:opacity-50 transition-colors"
          title="Post query to database"
        >
          <Play size={10} />
          Post
        </button>
        <div className="flex-1" />
        <button
          onClick={handleReset}
          className="flex items-center gap-1 px-2 py-1 text-[10px] text-[#858585] hover:text-white hover:bg-[#383838] rounded transition-colors"
        >
          <RefreshCw size={10} />
          Reset
        </button>
      </div>

      {lastResult && <ResultBanner result={lastResult} onClose={() => setLastResult(null)} />}

      {/* Main content: 3-panel layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Element palette */}
        <div className="w-52 border-r border-[#414141] flex flex-col shrink-0">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#858585] border-b border-[#414141] bg-[#252526]">
            Elements
          </div>
          <ElementPalette containers={availableContainers} onAdd={addChild} selectedNode={selectedNode} />
        </div>

        {/* Center: Query tree + Code */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-auto p-2 border-b border-[#414141]">
            {root && (
              <TreeNode
                node={root}
                depth={0}
                selectedId={selectedNodeId}
                onSelect={setSelectedNodeId}
                onToggle={(id) => {
                  if (!root) return
                  const newRoot = cloneTree(root)
                  const n = findNode(newRoot, id)
                  if (n) n.expanded = !n.expanded
                  setRoot(newRoot)
                }}
              />
            )}
          </div>

          {/* Code panel */}
          <div className="h-[40%] min-h-[120px] flex flex-col shrink-0">
            <div className="flex items-center bg-[#252526] border-b border-[#414141] h-7">
              <button
                onClick={() => setCodeTab('xml')}
                className={`px-3 h-full text-[10px] uppercase tracking-wider border-b-2 transition-colors ${
                  codeTab === 'xml' ? 'text-white border-white' : 'text-[#858585] border-transparent hover:text-[#cccccc]'
                }`}
              >
                <Code size={10} className="inline mr-1" />XML
              </button>
              <button
                onClick={() => setCodeTab('javascript')}
                className={`px-3 h-full text-[10px] uppercase tracking-wider border-b-2 transition-colors ${
                  codeTab === 'javascript' ? 'text-white border-white' : 'text-[#858585] border-transparent hover:text-[#cccccc]'
                }`}
              >
                <Braces size={10} className="inline mr-1" />JavaScript
              </button>
              <div className="flex-1" />
              <CopyButton text={codeTab === 'xml' ? xmlCode : jsCode} />
            </div>
            <pre className="flex-1 overflow-auto p-3 text-[11px] font-mono leading-relaxed text-[#ce9178] bg-[#1e1e1e] whitespace-pre">
              {codeTab === 'xml' ? xmlCode : jsCode}
            </pre>
          </div>
        </div>

        {/* Right: Properties */}
        <div className="w-72 border-l border-[#414141] flex flex-col shrink-0">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#858585] border-b border-[#414141] bg-[#252526] flex items-center gap-2">
            <span className="flex-1">Properties</span>
            <button
              onClick={toggleShowPassed}
              className={`px-1.5 py-0.5 rounded text-[9px] transition-colors ${showPassed ? 'bg-[#007acc33] text-[#569cd6]' : 'text-[#555555] hover:text-[#858585]'}`}
              title="Show passed parameters"
            >P</button>
            <button
              onClick={toggleShowReturned}
              className={`px-1.5 py-0.5 rounded text-[9px] transition-colors ${showReturned ? 'bg-[#007acc33] text-[#569cd6]' : 'text-[#555555] hover:text-[#858585]'}`}
              title="Show returned values"
            >R</button>
            {selectedNode && selectedNodeId !== root?.id && (
              <button
                onClick={deleteNode}
                className="p-0.5 hover:bg-[#5a1d1d] rounded text-[#858585] hover:text-[#f48771] transition-colors"
                title="Delete node"
              >
                <Trash2 size={10} />
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto">
            {selectedNode ? (
              <PropertyEditor
                node={selectedNode}
                properties={visibleProps}
                types={types}
                onUpdate={updateProperty}
              />
            ) : (
              <div className="p-4 text-[10px] text-[#555555] italic text-center">
                Select a node to edit its properties
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Element Palette ─────────────────────────────────────────

const ElementPalette: React.FC<{
  containers: QLContainer[]
  onAdd: (container: QLContainer) => void
  selectedNode: QueryNode | null
}> = ({ containers, onAdd, selectedNode }) => {
  const [filter, setFilter] = useState('')

  const filtered = filter
    ? containers.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    : containers

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {containers.length > 10 && (
        <div className="p-1 border-b border-[#414141]">
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Filter..."
            className="w-full bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1 text-[10px] text-white placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-[#007acc]/50"
          />
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-1">
        {!selectedNode ? (
          <div className="p-3 text-[10px] text-[#555555] italic text-center">Select a node first</div>
        ) : filtered.length === 0 ? (
          <div className="p-3 text-[10px] text-[#555555] italic text-center">
            {filter ? 'No matching elements' : 'No child elements available'}
          </div>
        ) : (
          filtered.map(ct => (
            <button
              key={ct.name}
              onClick={() => onAdd(ct)}
              className="w-full flex items-center gap-2 px-2 py-1 text-left text-xs text-[#cccccc] hover:bg-[#2d2d2d] rounded transition-colors group"
              title={ct.doc?.split('\n')[0] || ct.name}
            >
              <Plus size={10} className="text-[#6a9955] shrink-0" />
              <span className="truncate">{ct.name}</span>
              <span className="text-[9px] text-[#555555] ml-auto shrink-0 group-hover:text-[#858585]">{ct.type}</span>
            </button>
          ))
        )}
      </div>
    </div>
  )
}

// ─── Tree Node Component ─────────────────────────────────────

const TreeNode: React.FC<{
  node: QueryNode
  depth: number
  selectedId: string | null
  onSelect: (id: string) => void
  onToggle: (id: string) => void
}> = ({ node, depth, selectedId, onSelect, onToggle }) => {
  const isSelected = node.id === selectedId
  const hasChildren = node.children.length > 0
  const pad = depth * 16

  const summary = Object.entries(node.properties)
    .filter(([, v]) => v)
    .slice(0, 3)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ')

  return (
    <div>
      <div
        onClick={() => onSelect(node.id)}
        className={`flex items-center gap-1 px-1 py-0.5 cursor-pointer rounded text-xs transition-colors ${
          isSelected ? 'bg-[#37373d] text-white' : 'text-[#cccccc] hover:bg-[#2d2d2d]'
        }`}
        style={{ paddingLeft: `${pad + 4}px` }}
      >
        {hasChildren ? (
          <button onClick={(e) => { e.stopPropagation(); onToggle(node.id) }} className="shrink-0">
            {node.expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </button>
        ) : (
          <span className="w-3 shrink-0" />
        )}
        <NodeIcon type={node.elementName} />
        <span className="font-medium">{node.label}</span>
        {summary && (
          <span className="text-[10px] text-[#858585] truncate ml-1">{summary}</span>
        )}
      </div>
      {node.expanded && node.children.map(child => (
        <TreeNode key={child.id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} onToggle={onToggle} />
      ))}
    </div>
  )
}

const NODE_COLORS: Record<string, string> = {
  query: '#569cd6', sequence: '#c586c0', transaction: '#dcdcaa', step: '#4ec9b0',
  search: '#6a9955', record: '#ce9178', field: '#9cdcfe', tableList: '#d7ba7d',
  monetary: '#d4a017', postingRequest: '#d4a017',
}

const NodeIcon: React.FC<{ type: string }> = ({ type }) => {
  const color = NODE_COLORS[type] || '#858585'
  return (
    <span className="shrink-0 w-3 h-3 rounded-sm flex items-center justify-center text-[8px] font-bold"
      style={{ backgroundColor: color + '33', color }}>
      {type[0]?.toUpperCase()}
    </span>
  )
}

// ─── Property Editor ─────────────────────────────────────────

const PropertyEditor: React.FC<{
  node: QueryNode
  properties: { name: string; type: string; required: boolean; passed: boolean; returned: boolean; doc?: string }[]
  types: QLType[]
  onUpdate: (key: string, value: string) => void
}> = ({ node, properties, types, onUpdate }) => {
  // Also show attributes
  const nodeType = findType(types, node.typeName)
  const attrs = nodeType?.attributes || []

  if (properties.length === 0 && attrs.length === 0) {
    return <div className="p-3 text-[10px] text-[#555555] italic">No editable properties</div>
  }

  return (
    <div className="divide-y divide-[#2d2d2d]">
      {/* Node info */}
      <div className="px-3 py-2 bg-[#252526]">
        <div className="text-[10px] text-[#858585]">
          <span className="text-[#9cdcfe] font-mono">&lt;{node.elementName}&gt;</span>
          <span className="ml-2 text-[#555555]">Type: {node.typeName}</span>
        </div>
      </div>

      {/* Attributes */}
      {attrs.filter(a => a.name !== 'type').map(attr => (
        <div key={`attr:${attr.name}`} className="px-3 py-2">
          <label className="text-[10px] text-[#dcdcaa] block mb-1">
            @{attr.name}
            <span className="ml-1 text-[#555555]">(attr)</span>
          </label>
          <input
            type="text"
            value={node.properties[attr.name] || ''}
            onChange={e => onUpdate(attr.name, e.target.value)}
            className="w-full bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1 text-xs text-white font-mono placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-[#007acc]/50"
          />
        </div>
      ))}

      {/* Properties */}
      {properties.map(prop => (
        <div key={prop.name} className="px-3 py-2">
          <label className="text-[10px] text-[#858585] block mb-1">
            {prop.name}
            {prop.required && <span className="text-[#f48771] ml-0.5">*</span>}
            <span className="ml-1 text-[#555555]">
              ({prop.type}
              {prop.passed && !prop.returned && ', P'}
              {prop.returned && !prop.passed && ', R'}
              {prop.passed && prop.returned && ', P/R'}
              )
            </span>
          </label>
          {prop.doc && (
            <div className="text-[9px] text-[#555555] mb-1 truncate" title={prop.doc}>
              {prop.doc.split('\n')[0]}
            </div>
          )}
          <PropertyInput
            propType={prop.type}
            value={node.properties[prop.name] || ''}
            onChange={(v) => onUpdate(prop.name, v)}
          />
        </div>
      ))}
    </div>
  )
}

const PropertyInput: React.FC<{
  propType: string
  value: string
  onChange: (value: string) => void
}> = ({ propType, value, onChange }) => {
  if (propType === 'Option') {
    return (
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007acc]/50"
      >
        <option value="">—</option>
        <option value="Y">Y</option>
        <option value="N">N</option>
      </select>
    )
  }

  if (propType === 'TextArea' || propType === 'Document') {
    return (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={3}
        className="w-full bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-[#007acc]/50 resize-y"
      />
    )
  }

  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={propType}
      className="w-full bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1 text-xs text-white font-mono placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-[#007acc]/50"
    />
  )
}

// ─── Result Banner ───────────────────────────────────────────

const ResultBanner: React.FC<{
  result: PostResult
  onClose: () => void
}> = ({ result, onClose }) => {
  const isSuccess = result.success
  return (
    <div className={`px-3 py-2 flex items-start gap-2 text-xs border-b ${
      isSuccess ? 'bg-[#1e3a1e] border-[#2d5a2d] text-[#6a9955]' : 'bg-[#3a1e1e] border-[#5a2d2d] text-[#f48771]'
    }`}>
      {isSuccess ? <CheckCircle size={14} className="shrink-0 mt-0.5" /> : <AlertTriangle size={14} className="shrink-0 mt-0.5" />}
      <div className="flex-1 min-w-0">
        <div className="font-medium">
          {result.result === 'posted' && 'Query posted successfully'}
          {result.result === 'verified' && 'Query verified successfully'}
          {result.result === 'failed' && 'Query failed'}
          {result.result === 'error' && 'Error executing query'}
        </div>
        {result.exceptions.length > 0 && (
          <div className="mt-1 space-y-0.5">
            {result.exceptions.map((e: { text: string }, i: number) => (
              <div key={i} className="text-[10px] opacity-80">{e.text}</div>
            ))}
          </div>
        )}
      </div>
      <button onClick={onClose} className="shrink-0 hover:opacity-70"><X size={12} /></button>
    </div>
  )
}

// ─── Copy Button ─────────────────────────────────────────────

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button onClick={handleCopy} className="px-2 py-0.5 mr-1 text-[10px] text-[#858585] hover:text-white hover:bg-[#383838] rounded transition-colors">
      {copied ? <span className="text-[#6a9955]">Copied!</span> : <><Copy size={10} className="inline mr-1" />Copy</>}
    </button>
  )
}
