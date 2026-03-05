import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronDown, FileCode, Folder } from 'lucide-react';
import { useFeatureStore } from '../../store/useFeatureStore';

interface ScriptNode {
  id: string;
  text: string;
  leaf?: boolean;
  cls: string;
  scriptPath?: string;
}

const TreeItem: React.FC<{ node: ScriptNode; depth: number }> = ({ node, depth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState<ScriptNode[]>([]);
  const [loading, setLoading] = useState(false);
  const { openEditor } = useFeatureStore();

  const toggleOpen = async () => {
    if (node.leaf) {
      if (node.scriptPath) {
        openEditor(node.id, node.scriptPath, node.text);
      }
      return;
    }

    if (!isOpen && children.length === 0) {
      setLoading(true);
      try {
        const response = await fetch('/KeyscriptServlet/List', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `node=${encodeURIComponent(node.id)}`
        });
        const data = await response.json();
        setChildren(data);
      } catch (e) {
        console.error('Failed to fetch scripts', e);
      } finally {
        setLoading(false);
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div 
        className="flex items-center py-1 px-2 hover:bg-slate-800 cursor-pointer select-none text-xs text-slate-300"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={toggleOpen}
      >
        {!node.leaf ? (
          <span className="mr-1">
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        ) : (
          <span className="mr-1 w-[14px]" />
        )}
        <span className="mr-2">
          {node.leaf ? <FileCode size={14} className="text-blue-400" /> : <Folder size={14} className="text-amber-400" />}
        </span>
        <span className="truncate">{node.text}</span>
        {loading && <span className="ml-2 animate-spin text-[10px]">...</span>}
      </div>
      {isOpen && !node.leaf && (
        <div>
          {children.map((child) => (
            <TreeItem key={child.id} node={child} depth={depth + 1} />
          ))}
          {children.length === 0 && !loading && (
            <div className="py-1 text-slate-500 italic text-[10px]" style={{ paddingLeft: `${(depth + 1) * 12 + 28}px` }}>
              (Empty)
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const ScriptExplorerPanel: React.FC = () => {
  const [rootNodes, setRootNodes] = useState<ScriptNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoot = async () => {
      try {
        const response = await fetch('/KeyscriptServlet/List', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'node=KeyScripts'
        });
        const data = await response.json();
        setRootNodes(data);
      } catch (e) {
        console.error('Failed to fetch root scripts', e);
      } finally {
        setLoading(false);
      }
    };

    fetchRoot();
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-900 overflow-y-auto">
      <div className="flex-1 py-2">
        {loading ? (
          <div className="p-4 text-xs text-slate-500">Loading scripts...</div>
        ) : (
          rootNodes.map(node => (
            <TreeItem key={node.id} node={node} depth={0} />
          ))
        )}
        {!loading && rootNodes.length === 0 && (
          <div className="p-4 text-xs text-slate-500 italic text-center">
            No scripts found in public/scripts
          </div>
        )}
      </div>
    </div>
  );
};
