import React, { useState, useEffect, useCallback } from 'react'
import { Folder, FolderOpen, ChevronRight, ArrowUp, Check, X, Home, Monitor, FileText, Code, Star } from 'lucide-react'

interface DirEntry {
  name: string
  path: string
}

interface Bookmark {
  name: string
  path: string
}

interface FolderPickerDialogProps {
  open: boolean
  onSelect: (path: string) => void
  onClose: () => void
}

const LAST_PATH_KEY = 'keyscript-last-folder-path'

async function browseDirs(dirPath: string): Promise<{ path: string; dirs: DirEntry[]; error?: string }> {
  try {
    const res = await fetch('/api/files/browse-dirs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: dirPath })
    })
    return await res.json()
  } catch {
    return { path: dirPath, dirs: [], error: 'Failed to browse' }
  }
}

async function getHomeInfo(): Promise<{ home: string; bookmarks: Bookmark[] }> {
  try {
    const res = await fetch('/api/files/home')
    return await res.json()
  } catch {
    return { home: '/workspace', bookmarks: [] }
  }
}

const bookmarkIcon = (name: string) => {
  switch (name) {
    case 'Home': return <Home size={13} />
    case 'Desktop': return <Monitor size={13} />
    case 'Documents': return <FileText size={13} />
    case 'Development': return <Code size={13} />
    default: return <Star size={13} />
  }
}

export const FolderPickerDialog: React.FC<FolderPickerDialogProps> = ({ open, onSelect, onClose }) => {
  const [currentPath, setCurrentPath] = useState('')
  const [dirs, setDirs] = useState<DirEntry[]>([])
  const [pathInput, setPathInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  const navigate = useCallback(async (dirPath: string) => {
    setLoading(true)
    setError(null)
    const result = await browseDirs(dirPath)
    setCurrentPath(result.path)
    setPathInput(result.path)
    setDirs(result.dirs)
    if (result.error) setError(result.error)
    setLoading(false)
    // Remember last visited path
    localStorage.setItem(LAST_PATH_KEY, result.path)
  }, [])

  useEffect(() => {
    if (!open) return
    getHomeInfo().then(({ home, bookmarks: bm }) => {
      setBookmarks(bm)
      // Start at last visited path, or home directory
      const lastPath = localStorage.getItem(LAST_PATH_KEY)
      navigate(lastPath || home)
    })
  }, [open, navigate])

  const handleGoUp = () => {
    const parent = currentPath.replace(/\/[^/]+\/?$/, '') || '/'
    navigate(parent)
  }

  const handlePathSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pathInput.trim()) navigate(pathInput.trim())
  }

  const handleSelect = () => {
    onSelect(currentPath)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-[#252526] border border-[#3c3c3c] rounded-lg shadow-2xl w-[580px] max-h-[75vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#3c3c3c]">
          <h2 className="text-sm font-semibold text-[#cccccc]">Open Folder</h2>
          <button onClick={onClose} className="text-[#858585] hover:text-white">
            <X size={16} />
          </button>
        </div>

        {/* Path input */}
        <form onSubmit={handlePathSubmit} className="flex items-center gap-2 px-4 py-2 border-b border-[#3c3c3c]">
          <button
            type="button"
            onClick={handleGoUp}
            className="p-1 rounded text-[#858585] hover:text-white hover:bg-[#3c3c3c]"
            title="Go up"
          >
            <ArrowUp size={16} />
          </button>
          <input
            type="text"
            value={pathInput}
            onChange={e => setPathInput(e.target.value)}
            onBlur={() => { if (pathInput !== currentPath) navigate(pathInput) }}
            className="flex-1 px-2 py-1 bg-[#3c3c3c] border border-[#555] rounded text-[#cccccc] text-xs font-mono focus:border-[#007acc] outline-none"
            placeholder="/path/to/folder"
          />
        </form>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar — Quick Access */}
          {bookmarks.length > 0 && (
            <div className="w-[150px] border-r border-[#3c3c3c] py-2 shrink-0 overflow-y-auto">
              <div className="px-3 pb-1.5 text-[10px] font-semibold text-[#858585] uppercase tracking-wider">
                Quick Access
              </div>
              {bookmarks.map(bm => (
                <div
                  key={bm.path}
                  className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer text-xs ${
                    currentPath === bm.path || currentPath.startsWith(bm.path + '/')
                      ? 'bg-[#37373d] text-white'
                      : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                  }`}
                  onClick={() => navigate(bm.path)}
                >
                  <span className="text-[#c09553] shrink-0">{bookmarkIcon(bm.name)}</span>
                  <span className="truncate">{bm.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Directory list */}
          <div className="flex-1 overflow-y-auto min-h-[200px] max-h-[400px]">
            {loading ? (
              <div className="p-4 text-[#858585] text-xs text-center">Loading...</div>
            ) : error ? (
              <div className="p-4 text-[#f44336] text-xs text-center">{error}</div>
            ) : dirs.length === 0 ? (
              <div className="p-4 text-[#858585] text-xs text-center">No subdirectories</div>
            ) : (
              dirs.map(dir => (
                <div
                  key={dir.path}
                  className={`flex items-center gap-2 px-4 py-1.5 cursor-pointer group ${
                    dir.path === currentPath ? 'bg-[#37373d]' : 'hover:bg-[#2a2d2e]'
                  }`}
                  onDoubleClick={() => navigate(dir.path)}
                  onClick={() => {
                    setCurrentPath(dir.path)
                    setPathInput(dir.path)
                  }}
                >
                  {dir.path === currentPath ? (
                    <FolderOpen size={14} className="text-[#dcb67a] shrink-0" />
                  ) : (
                    <Folder size={14} className="text-[#c09553] shrink-0" />
                  )}
                  <span className="text-xs text-[#cccccc] truncate flex-1">{dir.name}</span>
                  <ChevronRight size={12} className="text-[#555] opacity-0 group-hover:opacity-100" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#3c3c3c]">
          <span className="text-[10px] text-[#858585] font-mono truncate max-w-[340px]" title={currentPath}>
            {currentPath}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-[#cccccc] bg-[#3c3c3c] hover:bg-[#4c4c4c] rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSelect}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-white bg-[#007acc] hover:bg-[#006bb3] rounded"
            >
              <Check size={12} />
              Select Folder
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
