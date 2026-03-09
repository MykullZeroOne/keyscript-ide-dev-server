import React, { useState, useEffect, useCallback } from 'react'
import { Folder, FolderOpen, ChevronRight, ArrowUp, Check, X } from 'lucide-react'

interface DirEntry {
  name: string
  path: string
}

interface FolderPickerDialogProps {
  open: boolean
  onSelect: (path: string) => void
  onClose: () => void
}

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

async function getWorkspace(): Promise<string> {
  try {
    const res = await fetch('/api/files/workspace')
    const data = await res.json()
    return data.workspace || '/workspace'
  } catch {
    return '/workspace'
  }
}

export const FolderPickerDialog: React.FC<FolderPickerDialogProps> = ({ open, onSelect, onClose }) => {
  const [currentPath, setCurrentPath] = useState('')
  const [dirs, setDirs] = useState<DirEntry[]>([])
  const [pathInput, setPathInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useCallback(async (dirPath: string) => {
    setLoading(true)
    setError(null)
    const result = await browseDirs(dirPath)
    setCurrentPath(result.path)
    setPathInput(result.path)
    setDirs(result.dirs)
    if (result.error) setError(result.error)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (open) {
      getWorkspace().then(ws => navigate(ws))
    }
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
        className="bg-[#252526] border border-[#3c3c3c] rounded-lg shadow-2xl w-[500px] max-h-[70vh] flex flex-col"
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
                className="flex items-center gap-2 px-4 py-1.5 hover:bg-[#2a2d2e] cursor-pointer group"
                onDoubleClick={() => navigate(dir.path)}
                onClick={() => {
                  setCurrentPath(dir.path)
                  setPathInput(dir.path)
                }}
              >
                {dir.path === currentPath ? (
                  <FolderOpen size={14} className="text-[#c09553] shrink-0" />
                ) : (
                  <Folder size={14} className="text-[#c09553] shrink-0" />
                )}
                <span className="text-xs text-[#cccccc] truncate flex-1">{dir.name}</span>
                <ChevronRight size={12} className="text-[#555] opacity-0 group-hover:opacity-100" />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#3c3c3c]">
          <span className="text-[10px] text-[#858585] font-mono truncate max-w-[300px]" title={currentPath}>
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
