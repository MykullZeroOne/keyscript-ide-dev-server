import type { Monaco } from '@monaco-editor/react'

// ─── Custom Theme ────────────────────────────────────────────

export function registerKeyscriptTheme(monaco: Monaco) {
  monaco.editor.defineTheme('keyscript-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      // Keywords & control flow
      { token: 'keyword', foreground: 'C586C0' },
      { token: 'keyword.control', foreground: 'C586C0' },
      { token: 'keyword.operator', foreground: 'C586C0' },

      // Storage & modifiers
      { token: 'storage', foreground: '569CD6' },
      { token: 'storage.type', foreground: '569CD6' },
      { token: 'storage.modifier', foreground: '569CD6' },

      // Functions
      { token: 'entity.name.function', foreground: 'DCDCAA' },
      { token: 'support.function', foreground: 'DCDCAA' },
      { token: 'meta.function-call', foreground: 'DCDCAA' },

      // Variables & parameters
      { token: 'variable', foreground: '9CDCFE' },
      { token: 'variable.parameter', foreground: '9CDCFE' },
      { token: 'variable.other.readwrite', foreground: '9CDCFE' },

      // Types & classes
      { token: 'entity.name.type', foreground: '4EC9B0' },
      { token: 'entity.name.class', foreground: '4EC9B0' },
      { token: 'support.type', foreground: '4EC9B0' },
      { token: 'support.class', foreground: '4EC9B0' },

      // Strings
      { token: 'string', foreground: 'CE9178' },
      { token: 'string.template', foreground: 'CE9178' },
      { token: 'string.escape', foreground: 'D7BA7D' },

      // Numbers
      { token: 'constant.numeric', foreground: 'B5CEA8' },
      { token: 'number', foreground: 'B5CEA8' },

      // Constants & booleans
      { token: 'constant.language', foreground: '569CD6' },
      { token: 'constant', foreground: '4FC1FF' },

      // Comments
      { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
      { token: 'comment.block', foreground: '6A9955', fontStyle: 'italic' },
      { token: 'comment.line', foreground: '6A9955', fontStyle: 'italic' },

      // Operators & punctuation
      { token: 'keyword.operator.assignment', foreground: 'D4D4D4' },
      { token: 'delimiter', foreground: 'D4D4D4' },
      { token: 'delimiter.bracket', foreground: 'FFD700' },

      // Tags (HTML/XML)
      { token: 'tag', foreground: '569CD6' },
      { token: 'tag.attribute.name', foreground: '9CDCFE' },
      { token: 'tag.attribute.value', foreground: 'CE9178' },
      { token: 'metatag', foreground: '569CD6' },

      // CSS
      { token: 'attribute.name.css', foreground: '9CDCFE' },
      { token: 'attribute.value.css', foreground: 'CE9178' },
      { token: 'number.css', foreground: 'B5CEA8' },
      { token: 'string.css', foreground: 'CE9178' },

      // JSON
      { token: 'string.key.json', foreground: '9CDCFE' },
      { token: 'string.value.json', foreground: 'CE9178' },

      // Regex
      { token: 'regexp', foreground: 'D16969' },
    ],
    colors: {
      'editor.background': '#1e1e1e',
      'editor.foreground': '#d4d4d4',
      'editorLineNumber.foreground': '#858585',
      'editorLineNumber.activeForeground': '#c6c6c6',
      'editor.selectionBackground': '#264f78',
      'editor.selectionHighlightBackground': '#add6ff26',
      'editor.inactiveSelectionBackground': '#3a3d41',
      'editorIndentGuide.background': '#404040',
      'editorIndentGuide.activeBackground': '#707070',
      'editor.lineHighlightBackground': '#2a2d2e',
      'editor.lineHighlightBorder': '#282828',
      'editorCursor.foreground': '#aeafad',
      'editorWhitespace.foreground': '#3b3b3b',
      'editorBracketMatch.background': '#0064001a',
      'editorBracketMatch.border': '#888888',
      'editorBracketHighlight.foreground1': '#FFD700',
      'editorBracketHighlight.foreground2': '#DA70D6',
      'editorBracketHighlight.foreground3': '#179FFF',
      'editor.findMatchBackground': '#515c6a',
      'editor.findMatchHighlightBackground': '#ea5c0055',
      'editorOverviewRuler.findMatchForeground': '#d186167e',
      'editorGutter.background': '#1e1e1e',
      'editorWidget.background': '#252526',
      'editorWidget.border': '#454545',
      'editorSuggestWidget.background': '#252526',
      'editorSuggestWidget.border': '#454545',
      'editorSuggestWidget.selectedBackground': '#04395e',
      'editorSuggestWidget.highlightForeground': '#18a3ff',
      'editorHoverWidget.background': '#252526',
      'editorHoverWidget.border': '#454545',
      'peekView.border': '#007acc',
      'peekViewEditor.background': '#001f33',
      'peekViewTitle.background': '#1e1e1e',
      'minimap.background': '#1e1e1e',
      'scrollbarSlider.background': '#79797966',
      'scrollbarSlider.hoverBackground': '#646464b3',
      'scrollbarSlider.activeBackground': '#bfbfbf66',
    }
  })
}


// ─── Language Detection ──────────────────────────────────────

const LANGUAGE_MAP: Record<string, string> = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  json: 'json',
  html: 'html',
  htm: 'html',
  xml: 'xml',
  css: 'css',
  scss: 'scss',
  less: 'less',
  md: 'markdown',
  markdown: 'markdown',
  sql: 'sql',
  py: 'python',
  sh: 'shell',
  bash: 'shell',
  zsh: 'shell',
  yaml: 'yaml',
  yml: 'yaml',
  txt: 'plaintext',
  log: 'plaintext',
  ini: 'ini',
  conf: 'ini',
  properties: 'ini',
  svg: 'xml',
}

export function getLanguageForFile(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase() || ''
  return LANGUAGE_MAP[ext] || 'javascript'
}


// ─── CR Framework Completions ────────────────────────────────

export function registerCRCompletions(monaco: Monaco) {
  const CompletionItemKind = monaco.languages.CompletionItemKind
  const CompletionItemInsertTextRule = monaco.languages.CompletionItemInsertTextRule

  monaco.languages.registerCompletionItemProvider('javascript', {
    triggerCharacters: ['.'],
    provideCompletionItems: (model: any, position: any) => {
      const word = model.getWordUntilPosition(position)
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      }

      // Get the text before cursor to detect context
      const lineContent = model.getLineContent(position.lineNumber)
      const textBefore = lineContent.substring(0, position.column - 1)

      const suggestions: any[] = []

      // ─── CR.XML completions ────────────────
      if (textBefore.endsWith('CR.')) {
        suggestions.push(
          { label: 'XML', kind: CompletionItemKind.Class, insertText: 'XML', detail: 'CR.XML — XML document builder', range },
          { label: 'JSON', kind: CompletionItemKind.Module, insertText: 'JSON', detail: 'CR.JSON — JSON parse/stringify', range },
          { label: 'Core', kind: CompletionItemKind.Module, insertText: 'Core', detail: 'CR.Core — Core utilities', range },
          { label: 'Login', kind: CompletionItemKind.Module, insertText: 'Login', detail: 'CR.Login — Session info', range },
          { label: 'Script', kind: CompletionItemKind.Module, insertText: 'Script', detail: 'CR.Script — Script execution', range },
          { label: 'Panel', kind: CompletionItemKind.Class, insertText: 'Panel', detail: 'CR.Panel — UI Panel', range },
          { label: 'Settings', kind: CompletionItemKind.Module, insertText: 'Settings', detail: 'CR.Settings — User/role settings', range },
          { label: 'Storage', kind: CompletionItemKind.Module, insertText: 'Storage', detail: 'CR.Storage — Local storage wrapper', range },
          { label: 'KeyStoneService', kind: CompletionItemKind.Module, insertText: 'KeyStoneService', detail: 'CR.KeyStoneService — Service endpoint', range },
        )
      }

      // ─── CR.Core.* completions ─────────────
      if (textBefore.endsWith('CR.Core.')) {
        suggestions.push(
          {
            label: 'ajaxRequest',
            kind: CompletionItemKind.Method,
            insertText: 'ajaxRequest({\n\turl: \'${1:DirectXMLPostJSON}\',\n\txmlData: ${2:xml.getXMLDocument()},\n\tsuccess: function(response) {\n\t\t${3}\n\t},\n\tfailure: function(error) {\n\t\tconsole.error(error);\n\t}\n})',
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Make AJAX request to Keystone',
            documentation: 'Send an AJAX request to the Keystone server. Handles XML/JSON serialization.',
            range
          },
          { label: 'displayExceptions', kind: CompletionItemKind.Method, insertText: 'displayExceptions({ items: ${1:errors} })', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Display error dialog', range },
          { label: 'viewPort', kind: CompletionItemKind.Property, insertText: 'viewPort', detail: 'Main Ext.Viewport reference', range },
          { label: 'defer', kind: CompletionItemKind.Method, insertText: 'defer(function() {\n\t${1}\n})', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Defer until Ext.onReady', range },
          { label: 'keyStoneWebAppURL', kind: CompletionItemKind.Property, insertText: 'keyStoneWebAppURL', detail: 'Keystone base URL', range },
          { label: 'extBaseURL', kind: CompletionItemKind.Property, insertText: 'extBaseURL', detail: 'ExtJS base URL', range },
        )
      }

      // ─── CR.Login.* completions ────────────
      if (textBefore.endsWith('CR.Login.')) {
        suggestions.push(
          { label: 'userName', kind: CompletionItemKind.Property, insertText: 'userName', detail: 'Current user name', range },
          { label: 'userSerial', kind: CompletionItemKind.Property, insertText: 'userSerial', detail: 'Current user serial', range },
          { label: 'sessionID', kind: CompletionItemKind.Property, insertText: 'sessionID', detail: 'Active session ID', range },
          { label: 'JSESSIONID', kind: CompletionItemKind.Property, insertText: 'JSESSIONID', detail: 'Java session ID', range },
          { label: 'postingDate', kind: CompletionItemKind.Property, insertText: 'postingDate', detail: 'Current posting date', range },
          { label: 'locationName', kind: CompletionItemKind.Property, insertText: 'locationName', detail: 'Current location', range },
          { label: 'databaseName', kind: CompletionItemKind.Property, insertText: 'databaseName', detail: 'Database name', range },
          { label: 'instance', kind: CompletionItemKind.Property, insertText: 'instance', detail: 'Keystone instance', range },
          { label: 'performLogin', kind: CompletionItemKind.Method, insertText: 'performLogin()', detail: 'Trigger login dialog', range },
        )
      }

      // ─── CR.Script.* completions ───────────
      if (textBefore.endsWith('CR.Script.')) {
        suggestions.push(
          { label: 'personSerial', kind: CompletionItemKind.Property, insertText: 'personSerial', detail: 'Script context person serial', range },
          { label: 'accountSerial', kind: CompletionItemKind.Property, insertText: 'accountSerial', detail: 'Script context account serial', range },
          { label: 'scriptDefaultPanelId', kind: CompletionItemKind.Property, insertText: 'scriptDefaultPanelId', detail: 'Default panel ID for script UI', range },
          { label: 'runScript', kind: CompletionItemKind.Method, insertText: 'runScript(\'${1:scriptName}\')', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Run another script', range },
          { label: 'runForm', kind: CompletionItemKind.Method, insertText: 'runForm(${1:config})', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Run a form script', range },
          { label: 'includeJSCSS', kind: CompletionItemKind.Method, insertText: 'includeJSCSS(${1:config})', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Include external JS/CSS', range },
          { label: 'scriptDescription', kind: CompletionItemKind.Property, insertText: 'scriptDescription', detail: 'Script description string', range },
        )
      }

      // ─── CR.JSON.* completions ─────────────
      if (textBefore.endsWith('CR.JSON.')) {
        suggestions.push(
          { label: 'parse', kind: CompletionItemKind.Method, insertText: 'parse(${1:jsonString})', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Parse JSON string', range },
          { label: 'stringify', kind: CompletionItemKind.Method, insertText: 'stringify(${1:value})', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Stringify to JSON', range },
        )
      }

      // ─── CR.XML instance methods ───────────
      if (/\b\w+\.(addContainer|addText|addOption|getRootElement|getXMLDocument)\s*$/.test(textBefore) === false
        && /\b(xml|doc|xdoc)\.$/.test(textBefore)) {
        suggestions.push(
          { label: 'getRootElement', kind: CompletionItemKind.Method, insertText: 'getRootElement()', detail: 'Get XML root element', range },
          { label: 'getXMLDocument', kind: CompletionItemKind.Method, insertText: 'getXMLDocument()', detail: 'Get the XML document string', range },
          { label: 'addContainer', kind: CompletionItemKind.Method, insertText: 'addContainer(${1:parent}, \'${2:name}\')', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Add container element', range },
          { label: 'addText', kind: CompletionItemKind.Method, insertText: 'addText(${1:parent}, \'${2:name}\', ${3:value})', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Add text element', range },
          { label: 'addOption', kind: CompletionItemKind.Method, insertText: 'addOption(${1:parent}, \'${2:name}\', \'${3:value}\')', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Add option element', range },
        )
      }

      // ─── Ext.* completions ─────────────────
      if (textBefore.endsWith('Ext.')) {
        suggestions.push(
          { label: 'Msg', kind: CompletionItemKind.Module, insertText: 'Msg', detail: 'Ext.Msg — Message dialogs', range },
          { label: 'each', kind: CompletionItemKind.Method, insertText: 'each(${1:array}, function(${2:item}) {\n\t${3}\n})', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Iterate over array', range },
          { label: 'apply', kind: CompletionItemKind.Method, insertText: 'apply(${1:target}, ${2:source})', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Copy properties from source to target', range },
          { label: 'Viewport', kind: CompletionItemKind.Class, insertText: 'Viewport', detail: 'ExtJS Viewport', range },
          { label: 'Panel', kind: CompletionItemKind.Class, insertText: 'Panel', detail: 'ExtJS Panel', range },
          { label: 'onReady', kind: CompletionItemKind.Method, insertText: 'onReady(function() {\n\t${1}\n})', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Run when DOM ready', range },
          { label: 'Ajax', kind: CompletionItemKind.Module, insertText: 'Ajax', detail: 'Ext.Ajax — AJAX utilities', range },
          { label: 'getCmp', kind: CompletionItemKind.Method, insertText: 'getCmp(\'${1:id}\')', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Get component by ID', range },
        )
      }

      if (textBefore.endsWith('Ext.Msg.')) {
        suggestions.push(
          { label: 'alert', kind: CompletionItemKind.Method, insertText: 'alert(\'${1:Title}\', \'${2:Message}\')', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Show alert dialog', range },
          { label: 'confirm', kind: CompletionItemKind.Method, insertText: 'confirm(\'${1:Title}\', \'${2:Message}\', function(btn) {\n\t${3}\n})', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Show confirm dialog', range },
          { label: 'prompt', kind: CompletionItemKind.Method, insertText: 'prompt(\'${1:Title}\', \'${2:Message}\', function(btn, text) {\n\t${3}\n})', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Show prompt dialog', range },
          { label: 'show', kind: CompletionItemKind.Method, insertText: 'show(${1:config})', insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Show message box', range },
        )
      }

      // ─── Snippet completions (top-level) ───
      if (!textBefore.includes('.') || textBefore.endsWith(' ') || textBefore.endsWith('\t') || textBefore.trim() === '') {
        suggestions.push(
          // -- XML / Transaction Snippets --
          {
            label: 'cr-xml-transaction',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'const xml = new CR.XML();',
              'const sequence = xml.addContainer(xml.getRootElement(), \'sequence\');',
              'const transaction = xml.addContainer(sequence, \'transaction\');',
              'const step = xml.addContainer(transaction, \'step\');',
              'const record = xml.addContainer(step, \'record\');',
              'xml.addText(record, \'tableName\', \'${1:TABLE}\');',
              'xml.addOption(record, \'operation\', \'${2|V,I,U,D|}\');',
              'xml.addText(record, \'targetSerial\', ${3:1});',
              'xml.addOption(record, \'includeAllColumns\', \'Y\');',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CR.XML transaction template',
            documentation: 'Create a complete XML transaction with sequence > transaction > step > record',
            range
          },
          {
            label: 'cr-xml-multi-step',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'const xml = new CR.XML();',
              'const sequence = xml.addContainer(xml.getRootElement(), \'sequence\');',
              'const transaction = xml.addContainer(sequence, \'transaction\');',
              '',
              '// Step 1: ${1:View record}',
              'const step1 = xml.addContainer(transaction, \'step\');',
              'const record1 = xml.addContainer(step1, \'record\');',
              'xml.addText(record1, \'tableName\', \'${2:TABLE}\');',
              'xml.addOption(record1, \'operation\', \'V\');',
              'xml.addText(record1, \'targetSerial\', ${3:serial});',
              'xml.addOption(record1, \'includeAllColumns\', \'Y\');',
              '',
              '// Step 2: ${4:Update record}',
              'const step2 = xml.addContainer(transaction, \'step\');',
              'const record2 = xml.addContainer(step2, \'record\');',
              'xml.addText(record2, \'tableName\', \'${5:TABLE}\');',
              'xml.addOption(record2, \'operation\', \'U\');',
              'xml.addText(record2, \'targetSerial\', ${6:serial});',
              '${7}',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Multi-step XML transaction',
            documentation: 'Transaction with multiple steps (view then update pattern)',
            range
          },
          {
            label: 'cr-xml-field',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'const field = xml.addContainer(${1:record}, \'field\');',
              'xml.addText(field, \'columnName\', \'${2:COLUMN_NAME}\');',
              'xml.addText(field, \'newContents\', ${3:value});',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Add field to XML record',
            documentation: 'Add a field update to a record step',
            range
          },
          // -- AJAX / Network Snippets --
          {
            label: 'cr-ajax-promise',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'new Promise((resolve, reject) => {',
              '\tCR.Core.ajaxRequest({',
              '\t\turl: \'DirectXMLPostJSON\',',
              '\t\txmlData: ${1:xml}.getXMLDocument(),',
              '\t\tsuccess: function(response) {',
              '\t\t\tconst data = CR.JSON.parse(response.responseText);',
              '\t\t\tresolve(data);',
              '\t\t},',
              '\t\tfailure: function(error) {',
              '\t\t\treject(error);',
              '\t\t}',
              '\t});',
              '})',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Promise-wrapped ajaxRequest',
            documentation: 'Ajax request wrapped in a Promise for async/await usage',
            range
          },
          {
            label: 'cr-ajax-function',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'async function ${1:fetchData}(${2:serial}) {',
              '\tconst xml = new CR.XML();',
              '\tconst sequence = xml.addContainer(xml.getRootElement(), \'sequence\');',
              '\tconst transaction = xml.addContainer(sequence, \'transaction\');',
              '\tconst step = xml.addContainer(transaction, \'step\');',
              '\tconst record = xml.addContainer(step, \'record\');',
              '\txml.addText(record, \'tableName\', \'${3:TABLE}\');',
              '\txml.addOption(record, \'operation\', \'V\');',
              '\txml.addText(record, \'targetSerial\', ${2:serial});',
              '\txml.addOption(record, \'includeAllColumns\', \'Y\');',
              '',
              '\treturn new Promise((resolve, reject) => {',
              '\t\tCR.Core.ajaxRequest({',
              '\t\t\turl: \'DirectXMLPostJSON\',',
              '\t\t\txmlData: xml.getXMLDocument(),',
              '\t\t\tsuccess: function(response) {',
              '\t\t\t\tconst records = [];',
              '\t\t\t\tconst errors = [];',
              '\t\t\t\tconst data = CR.JSON.parse(response.responseText);',
              '\t\t\t\tconst query = data.query;',
              '\t\t\t\tif (query) {',
              '\t\t\t\t\tExt.each(query.sequence, (seq) => {',
              '\t\t\t\t\t\tExt.each(seq.transaction, (tran) => {',
              '\t\t\t\t\t\t\tExt.each(tran.exception, (ex) => errors.push(ex.message));',
              '\t\t\t\t\t\t\tExt.each(tran.step, (s) => {',
              '\t\t\t\t\t\t\t\tif (s.record) records.push(s.record);',
              '\t\t\t\t\t\t\t});',
              '\t\t\t\t\t\t});',
              '\t\t\t\t\t});',
              '\t\t\t\t}',
              '\t\t\t\tif (errors.length) reject(errors);',
              '\t\t\t\telse resolve(records);',
              '\t\t\t},',
              '\t\t\tfailure: reject',
              '\t\t});',
              '\t});',
              '}',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Complete async data fetch function',
            documentation: 'Full async function: build XML, send request, parse response, return records',
            range
          },
          {
            label: 'cr-parse-response',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'const responseJson = CR.JSON.parse(${1:response}.responseText);',
              'const query = responseJson.query;',
              'const records = [];',
              'const errors = [];',
              'if (query) {',
              '\tExt.each(query.sequence, (sequence) => {',
              '\t\tExt.each(sequence.transaction, (transaction) => {',
              '\t\t\tExt.each(transaction.exception, (ex) => errors.push(ex.message));',
              '\t\t\tExt.each(transaction.step, (step) => {',
              '\t\t\t\tif (step.record) records.push(step.record);',
              '\t\t\t});',
              '\t\t});',
              '\t});',
              '}',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Parse DirectXMLPostJSON response',
            documentation: 'Standard response parsing: extract records and errors from query response',
            range
          },
          {
            label: 'cr-get-field-value',
            kind: CompletionItemKind.Snippet,
            insertText: '${1:record}.field.find(f => f.columnName === \'${2:COLUMN_NAME}\')?.newContents',
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Get field value from record',
            documentation: 'Extract a field value from a Keystone record response',
            range
          },
          // -- UI Component Snippets --
          {
            label: 'cr-grid-panel',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'const ${1:store} = new Ext.data.JsonStore({',
              '\tfields: [',
              '\t\t{ name: \'${2:serial}\', type: \'string\' },',
              '\t\t{ name: \'${3:description}\', type: \'string\' },',
              '\t\t${4}',
              '\t],',
              '\tdata: []',
              '});',
              '',
              'const ${5:grid} = new CR.GridPanel({',
              '\ttitle: \'${6:Grid Title}\',',
              '\tstore: ${1:store},',
              '\tcolumns: [',
              '\t\t{ header: \'${2:serial}\', dataIndex: \'${2:serial}\', width: 100 },',
              '\t\t{ header: \'${3:description}\', dataIndex: \'${3:description}\', width: 200 },',
              '\t],',
              '\tautoExpandColumn: \'${3:description}\',',
              '\tstripeRows: true,',
              '\theight: ${7:400},',
              '\tlisteners: {',
              '\t\trowclick: function(grid, rowIndex) {',
              '\t\t\tconst record = grid.getStore().getAt(rowIndex);',
              '\t\t\t${8}',
              '\t\t}',
              '\t}',
              '});',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CR.GridPanel with store and columns',
            documentation: 'Complete grid panel with JsonStore, column model, and row click handler',
            range
          },
          {
            label: 'cr-editor-grid',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'const ${1:grid} = new CR.EditorGridPanel({',
              '\ttitle: \'${2:Editable Grid}\',',
              '\tcrColumns: [',
              '\t\t{ header: \'${3:Column}\', dataIndex: \'${4:field}\', width: 150,',
              '\t\t  editor: new Ext.form.TextField() },',
              '\t\t${5}',
              '\t],',
              '\tcrAutoCommit: false,',
              '\tclicksToEdit: 1,',
              '\theight: ${6:400},',
              '\ttbar: [',
              '\t\t{ text: \'Add Row\', handler: function() { ${1:grid}.crAddRow(); } },',
              '\t\t{ text: \'Remove\', handler: function() { ${1:grid}.crRemoveSelected(); } },',
              '\t\t\'-\',',
              '\t\t{ text: \'Save\', handler: function() {',
              '\t\t\tconst modified = ${1:grid}.crGetModifiedRecords();',
              '\t\t\t${7}',
              '\t\t}},',
              '\t]',
              '});',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CR.EditorGridPanel with inline editing',
            documentation: 'Editable grid with add/remove/save toolbar',
            range
          },
          {
            label: 'cr-form-panel',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'const ${1:form} = new CR.FormPanel({',
              '\ttitle: \'${2:Form Title}\',',
              '\tlabelWidth: ${3:120},',
              '\tbodyStyle: \'padding: 10px\',',
              '\tdefaultType: \'textfield\',',
              '\titems: [',
              '\t\tnew CR.TextField({',
              '\t\t\tcrColumnName: \'${4:FIELD_NAME}\',',
              '\t\t\tcrColumnDescription: \'${5:Field Label}\',',
              '\t\t\twidth: 250',
              '\t\t}),',
              '\t\tnew CR.DateField({',
              '\t\t\tcrColumnName: \'${6:DATE_FIELD}\',',
              '\t\t\tcrColumnDescription: \'${7:Date Label}\'',
              '\t\t}),',
              '\t\tnew CR.MoneyField({',
              '\t\t\tcrColumnName: \'${8:AMOUNT}\',',
              '\t\t\tcrColumnDescription: \'${9:Amount Label}\'',
              '\t\t}),',
              '\t\t${10}',
              '\t],',
              '\tbuttons: [',
              '\t\t{ text: \'Save\', handler: function() {',
              '\t\t\tconst fields = CR.Core.findFields(${1:form});',
              '\t\t\t${11}',
              '\t\t}},',
              '\t\t{ text: \'Cancel\', handler: function() { ${1:form}.crFocusFirstField(); } }',
              '\t]',
              '});',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CR.FormPanel with CR fields',
            documentation: 'Form panel with TextField, DateField, MoneyField and save/cancel buttons',
            range
          },
          {
            label: 'cr-tab-panel',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'const ${1:tabs} = new CR.TabPanel({',
              '\tactiveTab: 0,',
              '\tregion: \'${2|center,north,south,east,west|}\',',
              '\titems: [',
              '\t\t{',
              '\t\t\ttitle: \'${3:Tab 1}\',',
              '\t\t\tlayout: \'fit\',',
              '\t\t\titems: [${4}]',
              '\t\t},',
              '\t\t{',
              '\t\t\ttitle: \'${5:Tab 2}\',',
              '\t\t\tlayout: \'fit\',',
              '\t\t\titems: [${6}]',
              '\t\t}',
              '\t]',
              '});',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CR.TabPanel with tabs',
            documentation: 'Tab panel with two tabs',
            range
          },
          {
            label: 'cr-viewport',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'const panel = new CR.Panel({',
              '\tregion: \'center\',',
              '\tlayout: \'${1|border,fit,card,anchor,column|}\',',
              '\titems: [${2}]',
              '});',
              '',
              'CR.Core.viewPort = new Ext.Viewport({',
              '\tlayout: \'border\',',
              '\titems: [panel]',
              '});',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Ext.Viewport with CR.Panel',
            documentation: 'Create main application viewport with a centered panel',
            range
          },
          {
            label: 'cr-window',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'const ${1:win} = new CR.Window({',
              '\ttitle: \'${2:Window Title}\',',
              '\twidth: ${3:500},',
              '\theight: ${4:400},',
              '\tmodal: true,',
              '\tlayout: \'fit\',',
              '\titems: [${5}],',
              '\tbuttons: [',
              '\t\t{ text: \'OK\', handler: function() { ${1:win}.close(); } },',
              '\t\t{ text: \'Cancel\', handler: function() { ${1:win}.close(); } }',
              '\t]',
              '});',
              '${1:win}.show();',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CR.Window modal dialog',
            documentation: 'Modal window with OK/Cancel buttons',
            range
          },
          {
            label: 'cr-option-field',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'new CR.OptionField({',
              '\tcrColumnName: \'${1:OPTION_FIELD}\',',
              '\tcrColumnDescription: \'${2:Select Option}\',',
              '\tcrOptions: [',
              '\t\t{ value: \'${3:Y}\', description: \'${4:Yes}\' },',
              '\t\t{ value: \'${5:N}\', description: \'${6:No}\' },',
              '\t\t${7}',
              '\t]',
              '})',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CR.OptionField dropdown',
            documentation: 'Option/select field with predefined choices',
            range
          },
          {
            label: 'cr-serial-field',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'new CR.SerialField({',
              '\tcrColumnName: \'${1:SERIAL}\',',
              '\tcrColumnDescription: \'${2:Serial}\',',
              '\tcrTableName: \'${3:TABLE_NAME}\',',
              '\twidth: 200',
              '})',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CR.SerialField with search',
            documentation: 'Serial number input field with table search capability',
            range
          },
          {
            label: 'cr-toolbar',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'tbar: [',
              '\t{ text: \'${1:Add}\', iconCls: \'${2:icon-add}\', handler: function() { ${3} } },',
              '\t{ text: \'${4:Edit}\', iconCls: \'${5:icon-edit}\', handler: function() { ${6} } },',
              '\t\'-\',',
              '\t{ text: \'${7:Delete}\', iconCls: \'${8:icon-delete}\', handler: function() { ${9} } },',
              '\t\'->\',' ,
              '\t{ text: \'${10:Refresh}\', handler: function() { ${11} } }',
              ']',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Panel toolbar with buttons',
            documentation: 'Toolbar with Add/Edit/Delete/Refresh buttons',
            range
          },
          // -- Full Script Templates --
          {
            label: 'cr-script-template',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'console.clear();',
              'console.log(\'-- ${1:Script Name} --\');',
              '',
              '/**',
              ' * ${2:Description of what this script does}',
              ' */',
              '',
              'function decodeExceptions(error) {',
              '\tconst items = [];',
              '\tif (!error) items.push(\'Undefined error\');',
              '\telse if (Array.isArray(error)) items.push(...error);',
              '\telse if (error instanceof Error) items.push(error.message);',
              '\telse if (typeof error === \'object\') items.push(error.statusText ?? error.message ?? \'Unspecified error\');',
              '\telse items.push(error.toString());',
              '\treturn items;',
              '}',
              '',
              'async function main() {',
              '\ttry {',
              '\t\t${3}',
              '\t} catch (errors) {',
              '\t\tCR.Core.displayExceptions({ items: decodeExceptions(errors) });',
              '\t}',
              '}',
              '',
              'main();',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Complete Keyscript template',
            documentation: 'Full script template with error handling, async main function',
            range
          },
          {
            label: 'cr-ui-script-template',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'console.clear();',
              'console.log(\'-- ${1:UI Script} --\');',
              '',
              '// Include additional CSS if needed',
              '// CR.Script.includeJSCSS({ css: [\'/KeyScript/css/custom.css\'] });',
              '',
              '// Create the main panel',
              'const mainPanel = new CR.Panel({',
              '\tregion: \'center\',',
              '\tlayout: \'border\',',
              '\tborder: false,',
              '\titems: [',
              '\t\t// North: header/toolbar area',
              '\t\tnew CR.Panel({',
              '\t\t\tregion: \'north\',',
              '\t\t\theight: 40,',
              '\t\t\thtml: \'<div style=\"padding:10px;font-weight:bold\">${2:Title}</div>\'',
              '\t\t}),',
              '\t\t// Center: main content',
              '\t\tnew CR.Panel({',
              '\t\t\tregion: \'center\',',
              '\t\t\tlayout: \'fit\',',
              '\t\t\titems: [${3}]',
              '\t\t})',
              '\t]',
              '});',
              '',
              '// Create viewport',
              'CR.Core.viewPort = new Ext.Viewport({',
              '\tlayout: \'border\',',
              '\titems: [mainPanel]',
              '});',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'UI script with Viewport layout',
            documentation: 'Full UI script template with border layout viewport, north header, center content',
            range
          },
          {
            label: 'cr-crud-script',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'console.clear();',
              '',
              '// ─── Data Functions ─────────────────────',
              '',
              'function loadRecords() {',
              '\tconst xml = new CR.XML();',
              '\tconst seq = xml.addContainer(xml.getRootElement(), \'sequence\');',
              '\tconst tran = xml.addContainer(seq, \'transaction\');',
              '\tconst step = xml.addContainer(tran, \'step\');',
              '\tconst rec = xml.addContainer(step, \'record\');',
              '\txml.addText(rec, \'tableName\', \'${1:TABLE}\');',
              '\txml.addOption(rec, \'operation\', \'V\');',
              '\txml.addText(rec, \'targetSerial\', \'*\');',
              '\txml.addOption(rec, \'includeAllColumns\', \'Y\');',
              '',
              '\tCR.Core.ajaxRequest({',
              '\t\turl: \'DirectXMLPostJSON\',',
              '\t\txmlData: xml.getXMLDocument(),',
              '\t\tsuccess: function(response) {',
              '\t\t\tconst data = CR.JSON.parse(response.responseText);',
              '\t\t\tconst records = [];',
              '\t\t\tconst query = data.query;',
              '\t\t\tif (query) {',
              '\t\t\t\tExt.each(query.sequence, (s) => {',
              '\t\t\t\t\tExt.each(s.transaction, (t) => {',
              '\t\t\t\t\t\tExt.each(t.step, (st) => {',
              '\t\t\t\t\t\t\tif (st.record) records.push(st.record);',
              '\t\t\t\t\t\t});',
              '\t\t\t\t\t});',
              '\t\t\t\t});',
              '\t\t\t}',
              '\t\t\tgrid.getStore().loadData(records);',
              '\t\t},',
              '\t\tfailure: function(e) { CR.Core.displayExceptions({ items: [e] }); }',
              '\t});',
              '}',
              '',
              '// ─── UI ─────────────────────────────────',
              '',
              'const store = new Ext.data.JsonStore({',
              '\tfields: [\'serial\', \'${2:field1}\', \'${3:field2}\'],',
              '\tdata: []',
              '});',
              '',
              'const grid = new CR.GridPanel({',
              '\tregion: \'center\',',
              '\tstore: store,',
              '\tcolumns: [',
              '\t\t{ header: \'Serial\', dataIndex: \'serial\', width: 80 },',
              '\t\t{ header: \'${2:field1}\', dataIndex: \'${2:field1}\', width: 150 },',
              '\t\t{ header: \'${3:field2}\', dataIndex: \'${3:field2}\', width: 150 },',
              '\t],',
              '\ttbar: [',
              '\t\t{ text: \'Refresh\', handler: loadRecords },',
              '\t]',
              '});',
              '',
              'CR.Core.viewPort = new Ext.Viewport({',
              '\tlayout: \'border\',',
              '\titems: [grid]',
              '});',
              '',
              'loadRecords();',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CRUD script with grid',
            documentation: 'Full CRUD script: data loading, grid display, toolbar actions',
            range
          },
          {
            label: 'cr-include-css',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'CR.Script.includeJSCSS({',
              '\tjs: [${1}],',
              '\tcss: [\'${2:/KeyScript/css/keyscript-all.css}\'],',
              '\tcallBackFunction: function(success) {',
              '\t\tif (success) {',
              '\t\t\t${3:// Initialize after resources loaded}',
              '\t\t}',
              '\t}',
              '});',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Include external JS/CSS',
            documentation: 'Load external JavaScript and CSS resources',
            range
          },
          {
            label: 'cr-record-view',
            kind: CompletionItemKind.Snippet,
            insertText: 'CR.Core.recordView({ tableName: \'${1:TABLE}\', targetSerial: ${2:serial} });',
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'View a record',
            documentation: 'Open the record viewer for a specific table/serial',
            range
          },
          {
            label: 'cr-search-prompt',
            kind: CompletionItemKind.Snippet,
            insertText: [
              'CR.Core.searchPrompt({',
              '\ttableName: \'${1:TABLE}\',',
              '\tcallback: function(serial) {',
              '\t\tif (serial) {',
              '\t\t\t${2}',
              '\t\t}',
              '\t}',
              '});',
            ].join('\n'),
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Search prompt dialog',
            documentation: 'Show a search dialog and get selected serial',
            range
          },
        )
      }

      return { suggestions }
    }
  })
}


// ─── Editor Options ──────────────────────────────────────────

export const defaultEditorOptions: import('monaco-editor').editor.IStandaloneEditorConstructionOptions = {
  fontSize: 14,
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Menlo, Monaco, 'Courier New', monospace",
  fontLigatures: true,
  lineHeight: 22,
  minimap: { enabled: true, maxColumn: 80 },
  automaticLayout: true,
  tabSize: 2,
  insertSpaces: true,
  detectIndentation: true,
  renderWhitespace: 'selection',
  bracketPairColorization: { enabled: true, independentColorPoolPerBracketType: true },
  guides: {
    bracketPairs: true,
    indentation: true,
    highlightActiveIndentation: true,
  },
  smoothScrolling: true,
  cursorBlinking: 'smooth',
  cursorSmoothCaretAnimation: 'on',
  mouseWheelZoom: true,
  formatOnPaste: true,
  formatOnType: false,
  suggestOnTriggerCharacters: true,
  quickSuggestions: { other: true, comments: false, strings: true },
  parameterHints: { enabled: true },
  autoClosingBrackets: 'always',
  autoClosingQuotes: 'always',
  autoSurround: 'languageDefined',
  folding: true,
  foldingStrategy: 'indentation',
  showFoldingControls: 'mouseover',
  matchBrackets: 'always',
  renderLineHighlight: 'all',
  scrollBeyondLastLine: false,
  wordWrap: 'off',
  links: true,
  colorDecorators: true,
  contextmenu: true,
  find: {
    addExtraSpaceOnTop: false,
    autoFindInSelection: 'multiline',
    seedSearchStringFromSelection: 'selection',
  },
  hover: { enabled: true, delay: 300 },
  suggest: {
    showMethods: true,
    showFunctions: true,
    showConstructors: true,
    showFields: true,
    showVariables: true,
    showClasses: true,
    showStructs: true,
    showInterfaces: true,
    showModules: true,
    showProperties: true,
    showEvents: true,
    showOperators: true,
    showUnits: true,
    showValues: true,
    showConstants: true,
    showEnums: true,
    showEnumMembers: true,
    showKeywords: true,
    showWords: true,
    showColors: true,
    showFiles: true,
    showReferences: true,
    showFolders: true,
    showSnippets: true,
    insertMode: 'insert',
    snippetsPreventQuickSuggestions: false,
    showIcons: true,
    preview: true,
    previewMode: 'subwordSmart',
  },
  inlayHints: { enabled: 'on' },
  stickyScroll: { enabled: true },
  padding: { top: 4, bottom: 4 },
}

export const largeFileEditorOptions: import('monaco-editor').editor.IStandaloneEditorConstructionOptions = {
  ...defaultEditorOptions,
  minimap: { enabled: false },
  wordWrap: 'off',
  folding: false,
  links: false,
  renderWhitespace: 'none',
  occurrencesHighlight: 'off',
  renderLineHighlight: 'none',
  quickSuggestions: false,
  parameterHints: { enabled: false },
  suggestOnTriggerCharacters: false,
  selectionHighlight: false,
  codeLens: false,
  hover: { enabled: false },
  matchBrackets: 'never',
  bracketPairColorization: { enabled: false },
  guides: { bracketPairs: false, indentation: false },
  stickyScroll: { enabled: false },
}


// ─── Keyboard Shortcuts ──────────────────────────────────────

export function registerExtraKeybindings(
  editor: import('monaco-editor').editor.IStandaloneCodeEditor,
  monaco: Monaco
) {
  // Duplicate line (Ctrl/Cmd+Shift+D)
  editor.addAction({
    id: 'duplicate-line',
    label: 'Duplicate Line',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyD],
    run: (ed) => {
      ed.getAction('editor.action.copyLinesDownAction')?.run()
    }
  })

  // Toggle comment (Ctrl/Cmd+/)
  editor.addAction({
    id: 'toggle-comment',
    label: 'Toggle Line Comment',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Slash],
    run: (ed) => {
      ed.getAction('editor.action.commentLine')?.run()
    }
  })

  // Move line up (Alt+Up)
  editor.addAction({
    id: 'move-line-up',
    label: 'Move Line Up',
    keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.UpArrow],
    run: (ed) => {
      ed.getAction('editor.action.moveLinesUpAction')?.run()
    }
  })

  // Move line down (Alt+Down)
  editor.addAction({
    id: 'move-line-down',
    label: 'Move Line Down',
    keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.DownArrow],
    run: (ed) => {
      ed.getAction('editor.action.moveLinesDownAction')?.run()
    }
  })

  // Select all occurrences (Ctrl/Cmd+Shift+L)
  editor.addAction({
    id: 'select-all-occurrences',
    label: 'Select All Occurrences',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyL],
    run: (ed) => {
      ed.getAction('editor.action.selectHighlights')?.run()
    }
  })

  // Format document (Ctrl/Cmd+Shift+F)
  editor.addAction({
    id: 'format-document',
    label: 'Format Document',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF],
    run: (ed) => {
      ed.getAction('editor.action.formatDocument')?.run()
    }
  })

  // Go to definition (F12)
  editor.addAction({
    id: 'go-to-definition',
    label: 'Go to Definition',
    keybindings: [monaco.KeyCode.F12],
    run: (ed) => {
      ed.getAction('editor.action.revealDefinition')?.run()
    }
  })
}
