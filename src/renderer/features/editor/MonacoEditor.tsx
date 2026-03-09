import React, { useEffect, useState, useRef } from 'react'
import Editor, { type Monaco } from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import { useEditorStore } from './EditorStore'
import {
  registerKeyscriptTheme,
  registerCRCompletions,
  registerExtraKeybindings,
  getLanguageForFile,
  defaultEditorOptions,
  largeFileEditorOptions,
} from './monaco-setup'
import { CR_FRAMEWORK_TYPES } from './cr-types'

interface MonacoEditorProps {
  path: string
}

const isAbsolutePath = (p: string) => p.startsWith('/')

const LARGE_FILE_THRESHOLD = 500 * 1024

// One-time global Monaco setup
let monacoConfigured = false

function configureMonaco(monaco: Monaco) {
  if (monacoConfigured) return
  monacoConfigured = true

  registerKeyscriptTheme(monaco)
  registerCRCompletions(monaco)

  // Configure JavaScript defaults for better IntelliSense
  // Syntax errors only — semantic validation causes false positives
  // with CR framework (e.g. "property does not exist on type") since
  // we can't declare every possible CR method. The type declarations
  // still power IntelliSense/autocomplete without generating errors.
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: false,
  })

  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ESNext,
    allowNonTsExtensions: true,
    allowJs: true,
    checkJs: false,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  })

  // Add comprehensive CR framework + ExtJS type declarations
  monaco.languages.typescript.javascriptDefaults.addExtraLib(
    CR_FRAMEWORK_TYPES,
    'ts:cr-framework.d.ts'
  )
}


// ─── Component ───────────────────────────────────────────────

const MonacoEditor: React.FC<MonacoEditorProps> = ({ path }) => {
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const updateContent = useEditorStore((s) => s.updateContent)
  const tabId = `editor-${path}`

  const isLargeFile = content !== null && content.length > LARGE_FILE_THRESHOLD
  const language = getLanguageForFile(path)

  useEffect(() => {
    const loadFile = async (): Promise<void> => {
      setLoading(true)
      setError(null)
      try {
        const data = isAbsolutePath(path)
          ? await window.api.readAbsolute(path)
          : await window.api.readFile(path)
        if (data === null || data === undefined) {
          setError(`File not found: ${path}`)
          setContent(null)
        } else {
          setContent(data)
        }
      } catch (e) {
        setError(`Failed to load file: ${e}`)
        setContent(null)
      } finally {
        setLoading(false)
      }
    }
    loadFile()
  }, [path])

  // Use a ref for save so the keybinding always calls the latest logic
  const saveRef = useRef<() => Promise<void>>()
  saveRef.current = async () => {
    // Always read directly from the editor instance — never from stale state
    const currentContent = editorRef.current?.getValue() ?? ''

    setSaveStatus('saving')
    const result = isAbsolutePath(path)
      ? await window.api.writeAbsolute(path, currentContent)
      : await window.api.writeFile(path, currentContent)

    if (!result.success) {
      console.error(`Failed to save: ${result.error}`)
      setSaveStatus('error')
    } else {
      // Clear dirty flag
      useEditorStore.setState((state) => ({
        tabs: state.tabs.map((t) => (t.id === tabId ? { ...t, isDirty: false } : t))
      }))
      setSaveStatus('saved')

      // Hot reload: if split preview is open, refresh it
      const { splitPreview, reloadPreview } = useEditorStore.getState()
      if (splitPreview) reloadPreview()
    }

    // Clear status after a moment
    setTimeout(() => setSaveStatus('idle'), 1500)
  }

  const handleMount = (ed: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = ed

    // Save command — uses ref so it always calls the current save logic
    ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      saveRef.current?.()
    })

    // Register extra keybindings
    registerExtraKeybindings(ed, monaco)

    // For large files, track changes via editor events
    if (isLargeFile) {
      ed.onDidChangeModelContent(() => {
        updateContent(tabId, ed.getValue())
      })
    }

    // Focus editor
    ed.focus()
  }

  if (loading) {
    return <div className="h-full bg-[#1e1e1e] flex items-center justify-center text-[#858585] text-sm">Loading file...</div>
  }

  if (error) {
    return (
      <div className="h-full bg-[#1e1e1e] flex flex-col items-center justify-center text-[#858585] gap-2">
        <div className="text-sm text-[#f48771]">{error}</div>
        <div className="text-xs">Check that the file exists and is readable</div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full relative">
      {isLargeFile && (
        <div className="h-6 flex items-center px-3 bg-[#2a2d2e] text-[10px] text-[#858585] shrink-0">
          Large file ({(content!.length / 1024 / 1024).toFixed(1)} MB) — some features disabled for performance
        </div>
      )}

      {/* Save status indicator */}
      {saveStatus !== 'idle' && (
        <div className={`absolute top-2 right-4 z-10 px-2 py-1 rounded text-[11px] font-medium ${
          saveStatus === 'saving' ? 'bg-[#007acc]/80 text-white' :
          saveStatus === 'saved' ? 'bg-[#4ec9b0]/80 text-white' :
          'bg-[#f48771]/80 text-white'
        }`}>
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Save failed'}
        </div>
      )}

      <Editor
        height="100%"
        defaultLanguage={language}
        theme="keyscript-dark"
        beforeMount={configureMonaco}
        {...(isLargeFile
          ? { defaultValue: content ?? '' }
          : { value: content ?? '' }
        )}
        onChange={isLargeFile ? undefined : (val) => {
          setContent(val || '')
          updateContent(tabId, val || '')
        }}
        onMount={handleMount}
        loading={
          <div className="h-full bg-[#1e1e1e] flex items-center justify-center text-[#858585] text-sm">
            Initializing editor...
          </div>
        }
        options={isLargeFile ? largeFileEditorOptions : defaultEditorOptions}
      />
    </div>
  )
}

export default MonacoEditor
