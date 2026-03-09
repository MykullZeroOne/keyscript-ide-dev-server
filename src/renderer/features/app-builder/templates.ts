/**
 * Project templates for the App Builder.
 * Each template returns a list of files to scaffold.
 */

export interface TemplateInfo {
  id: string
  name: string
  description: string
  files: { path: string; content: string }[]
}

// ─── React + Keystone Template ───────────────────────────────

const reactKeystoneTemplate: TemplateInfo = {
  id: 'react-keystone',
  name: 'React + Keystone',
  description: 'React app with CR framework integration for Keystone queries',
  files: [
    {
      path: 'keyscript.bundle.json',
      content: JSON.stringify({
        entry: 'src/index.jsx',
        outfile: 'dist/bundle.js',
        format: 'iife',
        target: 'es2020',
        minify: false,
        external: [],
        jsx: 'automatic',
        define: {}
      }, null, 2)
    },
    {
      path: 'src/index.jsx',
      content: `import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Create mount point
const container = document.getElementById('root') || document.createElement('div')
if (!container.parentElement) {
  container.id = 'root'
  document.body.appendChild(container)
}

createRoot(container).render(<App />)
`
    },
    {
      path: 'src/App.jsx',
      content: `import React, { useState } from 'react'
import { queryKeystone, isKeystoneAvailable } from './keystone'

export default function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    try {
      if (isKeystoneAvailable()) {
        // Real Keystone query via CR framework
        const data = await queryKeystone()
        setResults(data)
      } else {
        // Mock data for local preview
        setResults({
          message: 'Preview mode — no Keystone connection',
          sampleData: [
            { id: 1, name: 'Sample Record 1' },
            { id: 2, name: 'Sample Record 2' }
          ]
        })
      }
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
      <h1>My Keystone App</h1>
      <p style={{ color: isKeystoneAvailable() ? '#4caf50' : '#ff9800' }}>
        {isKeystoneAvailable() ? 'Connected to Keystone' : 'Preview mode (no Keystone)'}
      </p>

      <button
        onClick={handleSearch}
        disabled={loading}
        style={{
          padding: '8px 16px',
          marginTop: 12,
          cursor: loading ? 'wait' : 'pointer',
          backgroundColor: '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: 4
        }}
      >
        {loading ? 'Loading...' : 'Run Query'}
      </button>

      {error && (
        <div style={{ marginTop: 12, padding: 12, background: '#ffebee', color: '#c62828', borderRadius: 4 }}>
          {error}
        </div>
      )}

      {results && (
        <pre style={{
          marginTop: 12,
          padding: 12,
          background: '#f5f5f5',
          borderRadius: 4,
          overflow: 'auto',
          maxHeight: 400
        }}>
          {JSON.stringify(results, null, 2)}
        </pre>
      )}
    </div>
  )
}
`
    },
    {
      path: 'src/keystone.js',
      content: `/**
 * Keystone integration helpers.
 * Uses CR.XML + CR.Core.ajaxRequest when running inside Keystone,
 * falls back gracefully when in standalone preview mode.
 */

/* global CR, Ext */

export function isKeystoneAvailable() {
  return typeof CR !== 'undefined' && typeof CR.XML !== 'undefined'
}

/**
 * Example: search a table via the CR framework.
 * Replace tableName and filterName with your actual values.
 */
export function queryKeystone() {
  return new Promise((resolve, reject) => {
    if (!isKeystoneAvailable()) {
      reject(new Error('CR framework not available'))
      return
    }

    var xml = new CR.XML()
    var sequence = xml.addContainer(xml.getRootElement(), 'sequence')
    var transaction = xml.addContainer(sequence, 'transaction')
    var step = xml.addContainer(transaction, 'step')
    var search = xml.addContainer(step, 'search')

    xml.setAttribute(search, 'label', 'my_search')
    xml.addText(search, 'tableName', 'Account')
    xml.addText(search, 'filterName', 'Account Number')
    xml.addOption(search, 'includeSelectColumns', 'Y')
    xml.addOption(search, 'includeTotalHitCount', 'Y')
    xml.addCount(search, 'returnLimit', 10)

    var parameter = xml.addContainer(search, 'parameter')
    xml.addText(parameter, 'columnName', 'Account Number')
    xml.addText(parameter, 'contents', '0000001')

    CR.Core.ajaxRequest({
      url: 'DirectXMLPostJSON',
      xmlData: xml.getXMLDocument(),
      success: function(response) {
        var searchResponse = null
        var tranResult = 'failed'
        var errorArray = []
        var responseJson = CR.JSON.parse(response.responseText)
        var query = responseJson.query

        if (query) {
          Ext.each(query.sequence, function(sequence) {
            Ext.each(sequence.transaction, function(transaction) {
              tranResult = transaction.$attr.result
              Ext.each(transaction.exception, function(exception) {
                errorArray.push(exception.message)
              })
              Ext.each(transaction.step, function(step) {
                if (step.tranResult &&
                    step.tranResult.category &&
                    step.tranResult.category.option === 'E') {
                  errorArray.push(step.tranResult.description)
                } else if (step.search &&
                           step.search.$attr &&
                           step.search.$attr.label === 'my_search') {
                  searchResponse = step.search
                }
              })
            })
          })
        }

        if (tranResult !== 'posted' || errorArray.length > 0) {
          reject(new Error(errorArray.join(', ') || 'Query failed'))
        } else {
          resolve(searchResponse)
        }
      }
    })
  })
}
`
    },
    {
      path: 'src/styles.css',
      content: `/* App styles — imported in your components or index.jsx */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #ffffff;
  color: #333;
}

.card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.2s;
}
.btn:hover { opacity: 0.85; }
.btn-primary { background: #007acc; color: white; }
.btn-danger { background: #c62828; color: white; }
`
    }
  ]
}

// ─── Vanilla JS Multi-file Template ─────────────────────────

const vanillaJsTemplate: TemplateInfo = {
  id: 'vanilla-keystone',
  name: 'Vanilla JS + Keystone',
  description: 'Multi-file vanilla JavaScript with CR framework helpers',
  files: [
    {
      path: 'keyscript.bundle.json',
      content: JSON.stringify({
        entry: 'src/index.js',
        outfile: 'dist/bundle.js',
        format: 'iife',
        target: 'es2020',
        minify: false,
        external: [],
        jsx: 'transform',
        define: {}
      }, null, 2)
    },
    {
      path: 'src/index.js',
      content: `/**
 * Main entry point.
 * This file is bundled into a single script for Keystone.
 */
import { buildSearchXml, postQuery, isKeystoneAvailable } from './query-helpers'
import { renderTable, renderMessage } from './ui'

async function main() {
  const app = document.getElementById('root') || document.body

  if (!isKeystoneAvailable()) {
    renderMessage(app, 'Preview mode — CR framework not available. ' +
      'Bundle and run in Keystone to use real data.')
    renderTable(app, {
      columns: ['ID', 'Name', 'Status'],
      rows: [
        ['001', 'Sample Account', 'Active'],
        ['002', 'Test Account', 'Inactive']
      ]
    })
    return
  }

  renderMessage(app, 'Searching...')

  try {
    var xml = buildSearchXml('Account', 'Account Number', [
      { columnName: 'Account Number', contents: '0000001' }
    ])
    var result = await postQuery(xml, 'account_search')
    renderMessage(app, 'Results: ' + (result.totalHitCount || 0) + ' found')
    if (result.resultRow) {
      renderTable(app, {
        columns: result.selectColumn || [],
        rows: result.resultRow.map(function(row) { return row.column || [] })
      })
    }
  } catch (e) {
    renderMessage(app, 'Error: ' + e.message, true)
  }
}

main()
`
    },
    {
      path: 'src/query-helpers.js',
      content: `/**
 * CR framework query helpers.
 * Wraps CR.XML + CR.Core.ajaxRequest in reusable functions.
 */

/* global CR, Ext */

export function isKeystoneAvailable() {
  return typeof CR !== 'undefined' && typeof CR.XML !== 'undefined'
}

export function buildSearchXml(tableName, filterName, parameters) {
  var xml = new CR.XML()
  var sequence = xml.addContainer(xml.getRootElement(), 'sequence')
  var transaction = xml.addContainer(sequence, 'transaction')
  var step = xml.addContainer(transaction, 'step')
  var search = xml.addContainer(step, 'search')

  xml.setAttribute(search, 'label', tableName + '_search')
  xml.addText(search, 'tableName', tableName)
  xml.addText(search, 'filterName', filterName)
  xml.addOption(search, 'includeSelectColumns', 'Y')
  xml.addOption(search, 'includeTotalHitCount', 'Y')
  xml.addCount(search, 'returnLimit', 50)

  parameters.forEach(function(p) {
    var param = xml.addContainer(search, 'parameter')
    xml.addText(param, 'columnName', p.columnName)
    xml.addText(param, 'contents', p.contents)
  })

  return xml
}

export function postQuery(xml, searchLabel) {
  return new Promise(function(resolve, reject) {
    CR.Core.ajaxRequest({
      url: 'DirectXMLPostJSON',
      xmlData: xml.getXMLDocument(),
      success: function(response) {
        var searchResponse = null
        var tranResult = 'failed'
        var errors = []
        var json = CR.JSON.parse(response.responseText)

        if (json.query) {
          Ext.each(json.query.sequence, function(seq) {
            Ext.each(seq.transaction, function(txn) {
              tranResult = txn.$attr.result
              Ext.each(txn.exception, function(exc) {
                errors.push(exc.message)
              })
              Ext.each(txn.step, function(step) {
                if (step.tranResult &&
                    step.tranResult.category &&
                    step.tranResult.category.option === 'E') {
                  errors.push(step.tranResult.description)
                } else if (step.search &&
                           step.search.$attr &&
                           step.search.$attr.label === searchLabel) {
                  searchResponse = step.search
                }
              })
            })
          })
        }

        if (tranResult !== 'posted' || errors.length > 0) {
          reject(new Error(errors.join(', ') || 'Query failed'))
        } else {
          resolve(searchResponse || {})
        }
      }
    })
  })
}
`
    },
    {
      path: 'src/ui.js',
      content: `/**
 * Simple UI rendering helpers.
 * No framework needed — just DOM manipulation.
 */

export function renderMessage(container, text, isError) {
  var el = container.querySelector('.app-message')
  if (!el) {
    el = document.createElement('div')
    el.className = 'app-message'
    el.style.cssText = 'padding:12px;margin:8px 0;border-radius:4px;font-size:14px;'
    container.appendChild(el)
  }
  el.style.background = isError ? '#ffebee' : '#e3f2fd'
  el.style.color = isError ? '#c62828' : '#1565c0'
  el.textContent = text
}

export function renderTable(container, data) {
  var existing = container.querySelector('.app-table')
  if (existing) existing.remove()

  var table = document.createElement('table')
  table.className = 'app-table'
  table.style.cssText = 'width:100%;border-collapse:collapse;margin-top:12px;font-size:13px;'

  // Header
  var thead = document.createElement('thead')
  var headerRow = document.createElement('tr')
  data.columns.forEach(function(col) {
    var th = document.createElement('th')
    th.textContent = col
    th.style.cssText = 'text-align:left;padding:8px;border-bottom:2px solid #e0e0e0;background:#f5f5f5;'
    headerRow.appendChild(th)
  })
  thead.appendChild(headerRow)
  table.appendChild(thead)

  // Body
  var tbody = document.createElement('tbody')
  data.rows.forEach(function(row, i) {
    var tr = document.createElement('tr')
    tr.style.background = i % 2 === 0 ? '#ffffff' : '#fafafa'
    row.forEach(function(cell) {
      var td = document.createElement('td')
      td.textContent = cell
      td.style.cssText = 'padding:6px 8px;border-bottom:1px solid #eee;'
      tr.appendChild(td)
    })
    tbody.appendChild(tr)
  })
  table.appendChild(tbody)
  container.appendChild(table)
}
`
    }
  ]
}

// ─── React Standalone Template ───────────────────────────────

const reactStandaloneTemplate: TemplateInfo = {
  id: 'react-standalone',
  name: 'React Standalone',
  description: 'Pure React app for prototyping — no CR framework dependency',
  files: [
    {
      path: 'keyscript.bundle.json',
      content: JSON.stringify({
        entry: 'src/index.jsx',
        outfile: 'dist/bundle.js',
        format: 'iife',
        target: 'es2020',
        minify: false,
        external: [],
        jsx: 'automatic',
        define: {}
      }, null, 2)
    },
    {
      path: 'src/index.jsx',
      content: `import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root') || document.createElement('div')
if (!container.parentElement) {
  container.id = 'root'
  document.body.appendChild(container)
}

createRoot(container).render(<App />)
`
    },
    {
      path: 'src/App.jsx',
      content: `import React, { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: 40, fontFamily: 'system-ui, sans-serif', textAlign: 'center' }}>
      <h1>Hello from React</h1>
      <p style={{ fontSize: 48, margin: '20px 0' }}>{count}</p>
      <button
        onClick={() => setCount(c => c + 1)}
        style={{
          padding: '12px 24px',
          fontSize: 16,
          backgroundColor: '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer'
        }}
      >
        Count +1
      </button>
    </div>
  )
}
`
    }
  ]
}

// ─── Export All Templates ────────────────────────────────────

export const TEMPLATES: TemplateInfo[] = [
  reactKeystoneTemplate,
  vanillaJsTemplate,
  reactStandaloneTemplate
]

export function getTemplate(id: string): TemplateInfo | undefined {
  return TEMPLATES.find(t => t.id === id)
}
