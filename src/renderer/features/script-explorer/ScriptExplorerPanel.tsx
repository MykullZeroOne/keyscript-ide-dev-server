import React, { useEffect, useState, useCallback, useRef } from 'react'
import {
  ChevronRight, ChevronDown, FileCode, Folder, FolderOpen,
  Play, RefreshCw, FolderOpenDot, X, FilePlus, FolderPlus,
  FileJson, FileText, File, Upload
} from 'lucide-react'
import { useEditorStore } from '../editor/EditorStore'
import { useProjectStore } from '../../store/useProjectStore'
import { useScriptOptionsStore } from '../script-options/ScriptOptionsStore'
import { FolderPickerDialog } from './FolderPickerDialog'
import * as fsAccess from '../../api/fsAccessApi'

interface FileEntry {
  name: string
  isDirectory: boolean
  path: string
}

const isWebMode = !(window as any).electron
// File System Access API available in Chrome/Edge
const hasFSAccess = isWebMode && typeof (window as any).showDirectoryPicker === 'function'

const getFileIcon = (name: string) => {
  const ext = name.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'js': case 'jsx': case 'ts': case 'tsx':
      return <FileCode size={14} className="text-[#e8bf6a]" />
    case 'json':
      return <FileJson size={14} className="text-[#6d8a88]" />
    case 'md': case 'txt': case 'log':
      return <FileText size={14} className="text-[#858585]" />
    default:
      return <File size={14} className="text-[#858585]" />
  }
}

async function storeParametersAndRun(relativePath: string) {
  // If using local File System Access, sync the file to the server first
  if (hasFSAccess && fsAccess.hasLocalFolder()) {
    await fsAccess.syncFileToServer(relativePath)
  }

  const params = useScriptOptionsStore.getState().getScriptParameters()
  let paramsId: string | undefined
  try {
    const response = await fetch('/SessionStore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ value: JSON.stringify(params) })
    })
    const data = await response.json()
    if (data.success && data.id) paramsId = data.id
  } catch {}
  useEditorStore.getState().runScriptSplit(relativePath, paramsId)
}

// ─── File Tree Item ────────────────────────────────────────

const FileTreeItem: React.FC<{
  entry: FileEntry
  depth: number
  projectRoot: string
  useLocalFS: boolean
  onRefresh: () => void
}> = ({ entry, depth, projectRoot, useLocalFS }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [children, setChildren] = useState<FileEntry[]>([])
  const [loading, setLoading] = useState(false)
  const openFile = useEditorStore((s) => s.openFile)

  const loadChildren = useCallback(async () => {
    setLoading(true)
    try {
      if (useLocalFS) {
        const entries = await fsAccess.listDirectory(entry.path)
        setChildren(entries)
      } else {
        const entries = await window.api?.listAbsolute(entry.path)
        setChildren(entries || [])
      }
    } catch {
      setChildren([])
    } finally {
      setLoading(false)
    }
  }, [entry.path, useLocalFS])

  const handleClick = async () => {
    if (entry.isDirectory) {
      if (!isOpen && children.length === 0) await loadChildren()
      setIsOpen(!isOpen)
    } else {
      if (useLocalFS) {
        // Open with relative path — Monaco will use fsAccess to read
        openFile(entry.path, entry.name)
      } else {
        openFile(entry.path, entry.name)
      }
    }
  }

  const handleRun = (e: React.MouseEvent) => {
    e.stopPropagation()
    let relativePath: string
    if (useLocalFS) {
      relativePath = entry.path
    } else {
      relativePath = entry.path.startsWith(projectRoot)
        ? entry.path.substring(projectRoot.length + 1)
        : entry.name
    }
    storeParametersAndRun(relativePath)
  }

  const isJsFile = entry.name.endsWith('.js')
  const FolderIcon = isOpen ? FolderOpen : Folder

  return (
    <div>
      <div
        className="group flex items-center h-[26px] px-1 hover:bg-[#2a2d2e] cursor-pointer select-none text-[13px] text-[#cccccc]"
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
        onClick={handleClick}
      >
        <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[#c5c5c5]">
          {entry.isDirectory
            ? (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)
            : null}
        </span>
        <span className="mr-1.5 shrink-0">
          {entry.isDirectory
            ? <FolderIcon size={14} className={isOpen ? 'text-[#dcb67a]' : 'text-[#c09553]'} />
            : getFileIcon(entry.name)}
        </span>
        <span className="truncate flex-1">{entry.name}</span>

        {isJsFile && (
          <button
            onClick={handleRun}
            className="hidden group-hover:flex w-5 h-5 items-center justify-center rounded-sm text-[#4ec9b0] hover:bg-[#383838] ml-auto"
            title="Run script"
          >
            <Play size={12} fill="currentColor" />
          </button>
        )}

        {loading && <span className="ml-2 text-[10px] text-[#5a5a5a]">...</span>}
      </div>

      {isOpen && entry.isDirectory && (
        <div>
          {children.map((child) => (
            <FileTreeItem
              key={child.path}
              entry={child}
              depth={depth + 1}
              projectRoot={projectRoot}
              useLocalFS={useLocalFS}
              onRefresh={loadChildren}
            />
          ))}
          {children.length === 0 && !loading && (
            <div
              className="h-[26px] flex items-center text-[#5a5a5a] italic text-[12px]"
              style={{ paddingLeft: `${(depth + 1) * 16 + 24}px` }}
            >
              Empty
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Main Explorer Panel ────────────────────────────────────

export const ScriptExplorerPanel: React.FC = () => {
  const { currentProject, recentProjects, setCurrentProject, loadRecent, addRecent, removeRecent } = useProjectStore()
  const [entries, setEntries] = useState<FileEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState<'file' | 'folder' | null>(null)
  const [createName, setCreateName] = useState('')
  const createRef = useRef<HTMLInputElement>(null)
  const [showFolderPicker, setShowFolderPicker] = useState(false)
  // Track whether we're using local File System Access API
  const [useLocalFS, setUseLocalFS] = useState(false)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => { loadRecent() }, [loadRecent])

  const loadProjectDir = useCallback(async () => {
    if (!currentProject) { setEntries([]); return }
    setLoading(true)
    try {
      if (useLocalFS && fsAccess.hasLocalFolder()) {
        const result = await fsAccess.listDirectory('')
        setEntries(result)
      } else {
        const result = await window.api?.listAbsolute(currentProject)
        setEntries(result || [])
      }
    } catch {
      setEntries([])
    } finally {
      setLoading(false)
    }
  }, [currentProject, useLocalFS])

  useEffect(() => { loadProjectDir() }, [loadProjectDir])

  useEffect(() => {
    if (creating && createRef.current) createRef.current.focus()
  }, [creating])

  // ─── Open Folder ─────────────────────────────────
  const handleOpenFolder = async () => {
    if (hasFSAccess) {
      // Use browser's native folder picker via File System Access API
      const folderName = await fsAccess.openLocalFolder()
      if (folderName) {
        setUseLocalFS(true)
        setCurrentProject(folderName)
        addRecent(folderName)
      }
      return
    }
    if (isWebMode) {
      // Fallback: server-side folder picker
      setShowFolderPicker(true)
      return
    }
    // Electron mode — native dialog
    const folder = await window.api?.openFolderDialog()
    if (folder) {
      setCurrentProject(folder)
      addRecent(folder)
    }
  }

  const handleFolderPicked = (folder: string) => {
    setShowFolderPicker(false)
    setUseLocalFS(false)
    setCurrentProject(folder)
    addRecent(folder)
  }

  const handleSwitchProject = (path: string) => {
    // If switching to a recent that was local FS, we need to re-open
    // (handles are lost on page reload, so recent local folders just re-prompt)
    if (hasFSAccess && !path.startsWith('/')) {
      handleOpenFolder()
      return
    }
    setUseLocalFS(false)
    setCurrentProject(path)
    addRecent(path)
  }

  const handleCreate = async () => {
    if (!createName.trim() || !creating || !currentProject) { setCreating(null); setCreateName(''); return }
    if (useLocalFS) {
      await fsAccess.createEntry(createName, creating === 'folder')
    } else {
      const fullPath = `${currentProject}/${createName}`
      await window.api?.createFile(fullPath, creating === 'folder')
    }
    loadProjectDir()
    setCreating(null)
    setCreateName('')
  }

  // Sync all local files to server (for running scripts)
  const handleSyncToServer = async () => {
    if (!useLocalFS) return
    setSyncing(true)
    try {
      const count = await fsAccess.syncAllToServer()
      console.log(`[Sync] ${count} files synced to server workspace`)
    } catch (e) {
      console.error('[Sync] Failed:', e)
    } finally {
      setSyncing(false)
    }
  }

  const projectName = currentProject ? currentProject.split('/').pop() || currentProject : null

  // ─── No project open — Welcome screen ─────────
  if (!currentProject) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-3 space-y-2">
          <button
            onClick={handleOpenFolder}
            className="w-full flex items-center justify-center gap-2 h-[32px] text-[12px] text-white bg-[#007acc] hover:bg-[#1a8ad4] rounded-md transition-colors"
          >
            <FolderOpenDot size={14} />
            Open Folder
          </button>
        </div>

        {recentProjects.length > 0 && (
          <div className="flex-1 px-1">
            <div className="px-2 py-1.5 text-[11px] font-semibold text-[#cccccc] uppercase tracking-wide">
              Recent
            </div>
            {recentProjects.map((p) => {
              const name = p.split('/').pop() || p
              const dir = p.substring(0, p.lastIndexOf('/'))
              return (
                <div
                  key={p}
                  className="group flex items-center h-[30px] px-2 hover:bg-[#2a2d2e] rounded-md cursor-pointer mx-1"
                  onClick={() => handleSwitchProject(p)}
                >
                  <Folder size={14} className="text-[#c09553] shrink-0 mr-2" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] text-[#cccccc] truncate">{name}</div>
                    {dir && <div className="text-[10px] text-[#5a5a5a] truncate">{dir}</div>}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeRecent(p) }}
                    className="opacity-0 group-hover:opacity-100 w-5 h-5 flex items-center justify-center rounded text-[#858585] hover:text-[#f48771] hover:bg-[#383838]"
                    title="Remove from recent"
                  >
                    <X size={12} />
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {recentProjects.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <FolderOpenDot size={28} className="text-[#5a5a5a]" strokeWidth={1} />
            <div className="text-[12px] text-[#5a5a5a] leading-relaxed">
              {hasFSAccess
                ? 'Open a local folder to start editing'
                : 'Open a folder to start working on your project'}
            </div>
          </div>
        )}

        <FolderPickerDialog
          open={showFolderPicker}
          onSelect={handleFolderPicked}
          onClose={() => setShowFolderPicker(false)}
        />
      </div>
    )
  }

  // ─── Project open — File tree ──────────────────
  return (
    <div className="flex flex-col h-full">
      {/* Project header */}
      <div className="flex items-center h-[28px] px-2 gap-1 shrink-0">
        <FolderOpenDot size={13} className="text-[#c09553] shrink-0" />
        <span className="text-[12px] font-semibold text-[#cccccc] truncate flex-1" title={currentProject}>
          {projectName}
        </span>
        {/* Sync to server (only for local FS mode) */}
        {useLocalFS && (
          <button
            onClick={handleSyncToServer}
            className={`w-[20px] h-[20px] flex items-center justify-center rounded-[3px] hover:bg-[#383838] ${
              syncing ? 'text-[#4ec9b0] animate-spin' : 'text-[#c5c5c5]'
            }`}
            title="Sync files to server for script execution"
            disabled={syncing}
          >
            <Upload size={13} />
          </button>
        )}
        <button
          onClick={() => { setCreating('file'); setCreateName('') }}
          className="w-[20px] h-[20px] flex items-center justify-center rounded-[3px] text-[#c5c5c5] hover:bg-[#383838]"
          title="New File"
        >
          <FilePlus size={13} />
        </button>
        <button
          onClick={() => { setCreating('folder'); setCreateName('') }}
          className="w-[20px] h-[20px] flex items-center justify-center rounded-[3px] text-[#c5c5c5] hover:bg-[#383838]"
          title="New Folder"
        >
          <FolderPlus size={13} />
        </button>
        <button
          onClick={loadProjectDir}
          className="w-[20px] h-[20px] flex items-center justify-center rounded-[3px] text-[#c5c5c5] hover:bg-[#383838]"
          title="Refresh"
        >
          <RefreshCw size={13} />
        </button>
      </div>

      {/* Local FS indicator */}
      {useLocalFS && (
        <div className="px-2 py-0.5">
          <div className="text-[10px] text-[#4ec9b0] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ec9b0] inline-block" />
            Local folder — changes save directly to your computer
          </div>
        </div>
      )}

      {/* Inline create */}
      {creating && (
        <div className="flex items-center h-[26px] px-2 gap-1.5">
          {creating === 'folder'
            ? <Folder size={14} className="text-[#c09553] shrink-0" />
            : <FileCode size={14} className="text-[#e8bf6a] shrink-0" />}
          <input
            ref={createRef}
            value={createName}
            onChange={(e) => setCreateName(e.target.value)}
            onBlur={handleCreate}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreate()
              if (e.key === 'Escape') { setCreating(null); setCreateName('') }
            }}
            placeholder={creating === 'folder' ? 'folder name' : 'filename.js'}
            className="flex-1 bg-[#1e1e1e] border border-[#007acc] rounded-sm px-1.5 py-0.5 text-[13px] text-white placeholder-[#5a5a5a] outline-none"
          />
        </div>
      )}

      {/* File tree */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-[13px] text-[#5a5a5a]">Loading...</div>
        ) : entries.length > 0 ? (
          entries.map((entry) => (
            <FileTreeItem
              key={entry.path}
              entry={entry}
              depth={0}
              projectRoot={currentProject}
              useLocalFS={useLocalFS}
              onRefresh={loadProjectDir}
            />
          ))
        ) : (
          <div className="p-4 text-[12px] text-[#5a5a5a] italic text-center">
            Empty folder
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-[#2a2d2e] p-1.5 flex gap-1">
        <button
          onClick={handleOpenFolder}
          className="flex-1 flex items-center justify-center gap-1.5 h-[26px] text-[11px] text-[#cccccc] hover:text-white bg-[#2a2d2e] hover:bg-[#383838] rounded transition-colors"
        >
          <FolderOpenDot size={12} />
          Open Folder
        </button>
        <button
          onClick={() => { setCurrentProject(null); setUseLocalFS(false) }}
          className="flex items-center justify-center gap-1 h-[26px] px-2 text-[11px] text-[#858585] hover:text-[#cccccc] bg-[#2a2d2e] hover:bg-[#383838] rounded transition-colors"
          title="Close project"
        >
          <X size={12} />
        </button>
      </div>

      <FolderPickerDialog
        open={showFolderPicker}
        onSelect={handleFolderPicked}
        onClose={() => setShowFolderPicker(false)}
      />
    </div>
  )
}
