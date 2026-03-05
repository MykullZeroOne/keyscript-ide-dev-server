import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

interface MonacoEditorProps {
  path: string;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ path }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFile = async () => {
      setLoading(true);
      const data = await window.api.readFile(path);
      setContent(data || '');
      setLoading(false);
    };
    loadFile();
  }, [path]);

  const handleSave = async () => {
    const result = await window.api.writeFile(path, content);
    if (!result.success) {
      alert(`Failed to save: ${result.error}`);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="flex-1 flex flex-col h-full">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={content}
        onChange={(val) => setContent(val || '')}
        onMount={(editor) => {
          editor.addCommand(window.monaco.KeyMod.CtrlCmd | window.monaco.KeyCode.KeyS, () => {
            handleSave();
          });
        }}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default MonacoEditor;
