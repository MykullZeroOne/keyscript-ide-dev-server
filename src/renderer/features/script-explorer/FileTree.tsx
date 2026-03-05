import React, { useState, useEffect } from 'react'
import { ChevronRight, ChevronDown, File, Folder, RefreshCw } from 'lucide-react'

interface FileNode {
  id: string
  text: string
  leaf?: boolean
  cls?: string
  scriptPath?: string
}

interface TreeItemProps {
  node: FileNode
  depth: number
  onFileClick: (node: FileNode) => void
}

const TreeItem: React.FC<TreeItemProps> = ({ node, depth, onFileClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [children, setChildren] = useState<FileNode[]>([])
  const [loading, setLoading] = useState(false)

  const toggle = async () => {
    if (node.leaf) {
      onFileClick(node)
      return
    }

    const nextOpen = !isOpen
    setIsOpen(nextOpen)

    if (nextOpen && children.length === 0) {
      setLoading(true)
      try {
        const response = await fetch('/KeyscriptServlet/List', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ node: node.id })
        })
        const data = await response.json()
        setChildren(data)
      } catch (err) {
        console.error('Failed to load children', err)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div>
      <div 
        className="flex items-center py-1 px-2 hover:bg-gray-800 cursor-pointer text-sm group transition-colors"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={toggle}
      >
        <span className="mr-1.5 text-gray-500 group-hover:text-gray-300">
          {!node.leaf ? (
            isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : (
            <div className="w-3.5" />
          )}
        </span>
        <span className="mr-2 text-blue-400 group-hover:text-blue-300">
          {!node.leaf ? <Folder size={14} /> : <File size={14} className="text-gray-400" />}
        </span>
        <span className={`${node.leaf ? 'text-gray-300' : 'text-gray-200 font-medium'} truncate`}>
          {node.text}
        </span>
        {loading && <RefreshCw size={12} className="ml-2 animate-spin text-gray-500" />}
      </div>
      
      {isOpen && children.map(child => (
        <TreeItem 
          key={child.id} 
          node={child} 
          depth={depth + 1} 
          onFileClick={onFileClick}
        />
      ))}
    </div>
  )
}

export const FileTree: React.FC<{ onFileClick: (node: FileNode) => void }> = ({ onFileClick }) => {
  const [rootNodes, setRootNodes] = useState<FileNode[]>([])
  const [loading, setLoading] = useState(true)

  const loadRoot = async () => {
    setLoading(true)
    try {
      const response = await fetch('/KeyscriptServlet/List', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ node: 'KeyScripts' })
      })
      const data = await response.json()
      setRootNodes(data)
    } catch (err) {
      console.error('Failed to load root nodes', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRoot()
  }, [])

  return (
    <div className="h-full flex flex-col bg-gray-900/50">
      <div className="px-4 py-2 flex items-center justify-between border-b border-gray-800/50">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Scripts</span>
        <button 
          onClick={loadRoot}
          className="p-1 hover:bg-gray-800 rounded text-gray-500 hover:text-gray-300 transition-colors"
        >
          <RefreshCw size={12} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {loading ? (
          <div className="p-4 flex items-center justify-center">
            <RefreshCw size={20} className="animate-spin text-gray-700" />
          </div>
        ) : (
          rootNodes.map(node => (
            <TreeItem 
              key={node.id} 
              node={node} 
              depth={0} 
              onFileClick={onFileClick}
            />
          ))
        )}
      </div>
    </div>
  )
}
