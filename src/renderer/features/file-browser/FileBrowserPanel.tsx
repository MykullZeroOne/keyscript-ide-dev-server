import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
  ChevronRight, ChevronDown, FileCode, Folder, FolderOpen,
  FilePlus, FolderPlus, Trash2, Pencil, RefreshCw,
  FileJson, FileText, File, FolderOpenDot, X, Clock
} from 'lucide-react'
import { useEditorStore } from '../editor/EditorStore'
import { useProjectStore } from '../../store/useProjectStore'

interface FileEntry {
  name: string
  isDirectory: boolean
  path: string
}

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

const FileItem: React.FC<{
  entry: FileEntry
  depth: number
  onRefresh: () => void
  isAbsolute?: boolean
}> = ({ entry, depth, onRefresh, isAbsolute }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [children, setChildren] = useState<FileEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [newName, setNewName] = useState(entry.name)
  const renameRef = useRef<HTMLInputElement>(null)
  const openFile = useEditorStore((s) => s.openFile)

  const loadChildren = useCallback(async () => {
    setLoading(true)
    try {
      const entries = isAbsolute
        ? await window.api?.listAbsolute(entry.path)
        : await window.api?.listFiles(entry.path)
      setChildren(entries || [])
    } catch {
      setChildren([])
    } finally {
      setLoading(false)
    }
  }, [entry.path, isAbsolute])

  const handleClick = async () => {
    if (entry.isDirectory) {
      if (!isOpen && children.length === 0) await loadChildren()
      setIsOpen(!isOpen)
    } else {
      openFile(entry.path, entry.name)
    }
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const result = await window.api?.deleteFile(entry.path)
    if (result?.success) onRefresh()
  }

  const handleRename = async () => {
    if (newName === entry.name || !newName.trim()) { setRenaming(false); return }
    const dir = entry.path.substring(0, entry.path.lastIndexOf('/'))
    const newPath = dir ? `${dir}/${newName}` : newName
    const result = await window.api?.renameFile(entry.path, newPath)
    if (result?.success) onRefresh()
    setRenaming(false)
  }

  useEffect(() => {
    if (renaming && renameRef.current) { renameRef.current.focus(); renameRef.current.select() }
  }, [renaming])

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

        {renaming ? (
          <input
            ref={renameRef}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRename()
              if (e.key === 'Escape') setRenaming(false)
            }}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-[#1e1e1e] border border-[#007acc] text-[13px] text-white px-1 rounded-sm outline-none -my-px"
          />
        ) : (
          <span className="truncate flex-1">{entry.name}</span>
        )}

        {!isAbsolute && (
          <span className="hidden group-hover:flex items-center gap-px ml-auto pr-1">
            <button
              onClick={(e) => { e.stopPropagation(); setRenaming(true); setNewName(entry.name) }}
              className="w-5 h-5 flex items-center justify-center rounded-sm text-[#c5c5c5] hover:bg-[#383838]"
              title="Rename"
            >
              <Pencil size={12} />
            </button>
            <button
              onClick={handleDelete}
              className="w-5 h-5 flex items-center justify-center rounded-sm text-[#c5c5c5] hover:bg-[#383838] hover:text-[#f48771]"
              title="Delete"
            >
              <Trash2 size={12} />
            </button>
          </span>
        )}
      </div>

      {isOpen && entry.isDirectory && (
        <div>
          {children.map((child) => (
            <FileItem key={child.path} entry={child} depth={depth + 1} onRefresh={loadChildren} isAbsolute={isAbsolute} />
          ))}
          {children.length === 0 && !loading && (
            <div className="h-[26px] flex items-center text-[#5a5a5a] italic text-[12px]"
              style={{ paddingLeft: `${(depth + 1) * 16 + 24}px` }}>
              No files
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Project Explorer ────────────────────────────────────────

export const FileBrowserPanel: React.FC = () => {
  const { currentProject, recentProjects, setCurrentProject, loadRecent, addRecent, removeRecent } = useProjectStore()
  const [entries, setEntries] = useState<FileEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState<'file' | 'folder' | null>(null)
  const [createName, setCreateName] = useState('')
  const createRef = useRef<HTMLInputElement>(null)

  useEffect(() => { loadRecent() }, [loadRecent])

  const loadProjectDir = useCallback(async () => {
    if (!currentProject) { setEntries([]); return }
    setLoading(true)
    try {
      const result = await window.api?.listAbsolute(currentProject)
      setEntries(result || [])
    } catch {
      setEntries([])
    } finally {
      setLoading(false)
    }
  }, [currentProject])

  useEffect(() => { loadProjectDir() }, [loadProjectDir])

  useEffect(() => {
    if (creating && createRef.current) createRef.current.focus()
  }, [creating])

  const handleOpenFolder = async () => {
    const folder = await window.api?.openFolderDialog()
    if (folder) {
      setCurrentProject(folder)
      addRecent(folder)
    }
  }

  const handleSwitchProject = (path: string) => {
    setCurrentProject(path)
    addRecent(path)
  }

  const handleCreate = async () => {
    if (!createName.trim() || !creating || !currentProject) { setCreating(null); setCreateName(''); return }
    const fullPath = `${currentProject}/${createName}`
    const result = await window.api?.createFile(fullPath, creating === 'folder')
    if (result?.success) loadProjectDir()
    setCreating(null)
    setCreateName('')
  }

  const projectName = currentProject ? currentProject.split('/').pop() || currentProject : null

  // ─── No project open ────────────────────
  if (!currentProject) {
    return (
      <div className="flex flex-col h-full">
        {/* Open folder button */}
        <div className="p-3">
          <button
            onClick={handleOpenFolder}
            className="w-full flex items-center justify-center gap-2 h-[32px] text-[12px] text-white bg-[#007acc] hover:bg-[#1a8ad4] rounded-md transition-colors"
          >
            <FolderOpenDot size={14} />
            Open Folder
          </button>
        </div>

        {/* Recent projects */}
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
                    <div className="text-[10px] text-[#5a5a5a] truncate">{dir}</div>
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
              Open a folder to browse and edit project files
            </div>
          </div>
        )}
      </div>
    )
  }

  // ─── Project open ───────────────────────
  return (
    <div className="flex flex-col h-full">
      {/* Project header */}
      <div className="flex items-center h-[28px] px-2 gap-1 shrink-0">
        <FolderOpenDot size={13} className="text-[#c09553] shrink-0" />
        <span className="text-[12px] font-semibold text-[#cccccc] truncate flex-1" title={currentProject}>
          {projectName}
        </span>
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
        ) : (
          entries.map((entry) => (
            <FileItem key={entry.path} entry={entry} depth={0} onRefresh={loadProjectDir} isAbsolute />
          ))
        )}
      </div>

      {/* Footer: switch/open */}
      <div className="shrink-0 border-t border-[#2a2d2e] p-1.5 flex gap-1">
        <button
          onClick={handleOpenFolder}
          className="flex-1 flex items-center justify-center gap-1.5 h-[26px] text-[11px] text-[#cccccc] hover:text-white bg-[#2a2d2e] hover:bg-[#383838] rounded transition-colors"
        >
          <FolderOpenDot size={12} />
          Open Folder
        </button>
        <button
          onClick={() => setCurrentProject(null)}
          className="flex items-center justify-center gap-1 h-[26px] px-2 text-[11px] text-[#858585] hover:text-[#cccccc] bg-[#2a2d2e] hover:bg-[#383838] rounded transition-colors"
          title="Close project"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  )
}
