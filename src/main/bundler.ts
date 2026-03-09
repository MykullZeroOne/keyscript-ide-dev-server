/**
 * App Builder — esbuild-based bundler for multi-file projects.
 * Bundles React/JS projects into a single IIFE for Keystone deployment.
 */
import * as esbuild from 'esbuild'
import { existsSync } from 'fs'
import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'

// Resolve IDE root — works in both Electron (app.getAppPath()) and Docker (ROOT_PATH env)
function getIdeRoot(): string {
  if (process.env.ROOT_PATH) return process.env.ROOT_PATH
  try {
    // Electron context
    const { app } = require('electron')
    return app.getAppPath()
  } catch {
    // Standalone server — use cwd
    return process.cwd()
  }
}

// ─── Types ───────────────────────────────────────────────────

export interface BundleConfig {
  entry: string
  outfile: string
  format: 'iife' | 'esm'
  target: string
  minify: boolean
  external: string[]
  jsx: 'automatic' | 'transform'
  define: Record<string, string>
}

export interface BundleResult {
  success: boolean
  errors: { text: string; location?: string }[]
  warnings: { text: string; location?: string }[]
  outputPath: string
  outputSize: number
  duration: number
}

// ─── Config Detection ────────────────────────────────────────

const DEFAULT_CONFIG: BundleConfig = {
  entry: 'src/index.jsx',
  outfile: 'dist/bundle.js',
  format: 'iife',
  target: 'es2020',
  minify: false,
  external: [],
  jsx: 'automatic',
  define: {}
}

const ENTRY_CANDIDATES = [
  'src/index.tsx', 'src/index.jsx', 'src/index.ts', 'src/index.js',
  'src/main.tsx', 'src/main.jsx', 'src/main.ts', 'src/main.js',
  'index.tsx', 'index.jsx', 'index.ts', 'index.js'
]

export async function loadBundleConfig(projectPath: string): Promise<BundleConfig> {
  const configPath = path.join(projectPath, 'keyscript.bundle.json')
  let config = { ...DEFAULT_CONFIG }

  if (existsSync(configPath)) {
    try {
      const raw = await readFile(configPath, 'utf-8')
      const parsed = JSON.parse(raw)
      config = { ...config, ...parsed }
    } catch { /* use defaults */ }
  } else {
    // Auto-detect entry point
    for (const candidate of ENTRY_CANDIDATES) {
      if (existsSync(path.join(projectPath, candidate))) {
        config.entry = candidate
        break
      }
    }
  }

  return config
}

// ─── Build ───────────────────────────────────────────────────

export async function bundleProject(projectPath: string, configOverrides?: Partial<BundleConfig>): Promise<BundleResult> {
  const start = Date.now()
  const config = { ...(await loadBundleConfig(projectPath)), ...configOverrides }

  const entryPoint = path.join(projectPath, config.entry)
  const outfile = path.join(projectPath, config.outfile)

  if (!existsSync(entryPoint)) {
    return {
      success: false,
      errors: [{ text: `Entry point not found: ${config.entry}` }],
      warnings: [],
      outputPath: outfile,
      outputSize: 0,
      duration: Date.now() - start
    }
  }

  // Ensure output directory exists
  const outDir = path.dirname(outfile)
  if (!existsSync(outDir)) {
    await mkdir(outDir, { recursive: true })
  }

  // Use IDE's node_modules as fallback resolve path so users don't need to install React etc
  const ideRoot = getIdeRoot()
  const ideNodeModules = path.join(ideRoot, 'node_modules')
  const nodePaths = [ideNodeModules]

  // Also check if project has its own node_modules
  const projectNodeModules = path.join(projectPath, 'node_modules')
  if (existsSync(projectNodeModules)) {
    nodePaths.unshift(projectNodeModules)
  }

  try {
    const result = await esbuild.build({
      entryPoints: [entryPoint],
      bundle: true,
      outfile,
      format: config.format as 'iife' | 'esm',
      target: config.target,
      minify: config.minify,
      external: config.external,
      jsx: config.jsx === 'automatic' ? 'automatic' : 'transform',
      jsxImportSource: config.jsx === 'automatic' ? 'react' : undefined,
      sourcemap: !config.minify,
      metafile: true,
      nodePaths,
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
        '.tsx': 'tsx',
        '.jsx': 'jsx',
        '.css': 'css',
        '.png': 'dataurl',
        '.jpg': 'dataurl',
        '.svg': 'dataurl'
      },
      define: {
        'process.env.NODE_ENV': config.minify ? '"production"' : '"development"',
        ...config.define
      },
      banner: {
        js: '/* Bundled by Keyscript IDE App Builder */'
      }
    })

    const errors = result.errors.map(e => ({
      text: e.text,
      location: e.location ? `${e.location.file}:${e.location.line}:${e.location.column}` : undefined
    }))
    const warnings = result.warnings.map(w => ({
      text: w.text,
      location: w.location ? `${w.location.file}:${w.location.line}:${w.location.column}` : undefined
    }))

    // Get output size from metafile
    let outputSize = 0
    if (result.metafile) {
      for (const output of Object.values(result.metafile.outputs)) {
        outputSize += output.bytes
      }
    }

    return {
      success: errors.length === 0,
      errors,
      warnings,
      outputPath: outfile,
      outputSize,
      duration: Date.now() - start
    }
  } catch (e: any) {
    const errors = e.errors?.map((err: any) => ({
      text: err.text,
      location: err.location ? `${err.location.file}:${err.location.line}:${err.location.column}` : undefined
    })) || [{ text: e.message || String(e) }]

    return {
      success: false,
      errors,
      warnings: [],
      outputPath: outfile,
      outputSize: 0,
      duration: Date.now() - start
    }
  }
}

// ─── Dev Server ──────────────────────────────────────────────

let devContext: esbuild.BuildContext | null = null
let devServerPort: number | null = null

const DEV_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script src="/bundle.js"></script>
</body>
</html>`

export async function startDevServer(projectPath: string, configOverrides?: Partial<BundleConfig>): Promise<{ port: number } | { error: string }> {
  if (devContext) {
    await stopDevServer()
  }

  const config = { ...(await loadBundleConfig(projectPath)), ...configOverrides }
  const entryPoint = path.join(projectPath, config.entry)

  if (!existsSync(entryPoint)) {
    return { error: `Entry point not found: ${config.entry}` }
  }

  // Build to temp serve directory
  const serveDir = path.join(projectPath, '.keyscript', 'dev')
  if (!existsSync(serveDir)) {
    await mkdir(serveDir, { recursive: true })
  }

  // Write index.html for dev server
  await writeFile(path.join(serveDir, 'index.html'), DEV_HTML, 'utf-8')

  const ideRoot = getIdeRoot()
  const ideNodeModules = path.join(ideRoot, 'node_modules')
  const nodePaths = [ideNodeModules]
  const projectNodeModules = path.join(projectPath, 'node_modules')
  if (existsSync(projectNodeModules)) {
    nodePaths.unshift(projectNodeModules)
  }

  try {
    devContext = await esbuild.context({
      entryPoints: [entryPoint],
      bundle: true,
      outfile: path.join(serveDir, 'bundle.js'),
      format: 'iife',
      target: config.target,
      jsx: config.jsx === 'automatic' ? 'automatic' : 'transform',
      jsxImportSource: config.jsx === 'automatic' ? 'react' : undefined,
      sourcemap: true,
      nodePaths,
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
        '.tsx': 'tsx',
        '.jsx': 'jsx',
        '.css': 'css',
        '.png': 'dataurl',
        '.jpg': 'dataurl',
        '.svg': 'dataurl'
      },
      define: {
        'process.env.NODE_ENV': '"development"',
        ...config.define
      }
    })

    const { port } = await devContext.serve({
      servedir: serveDir,
      port: 0 // random available port
    })

    devServerPort = port
    console.log(`[AppBuilder] Dev server started on port ${port}`)
    return { port }
  } catch (e: any) {
    devContext = null
    return { error: e.message || String(e) }
  }
}

export async function stopDevServer(): Promise<void> {
  if (devContext) {
    await devContext.dispose()
    devContext = null
    devServerPort = null
    console.log('[AppBuilder] Dev server stopped')
  }
}

export function getDevServerPort(): number | null {
  return devServerPort
}

// ─── Project Scaffolding ─────────────────────────────────────

export interface TemplateFile {
  path: string
  content: string
}

export async function scaffoldProject(
  projectPath: string,
  files: TemplateFile[]
): Promise<{ success: boolean; error?: string; filesCreated: string[] }> {
  const created: string[] = []
  try {
    for (const file of files) {
      const fullPath = path.join(projectPath, file.path)
      const dir = path.dirname(fullPath)
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true })
      }
      await writeFile(fullPath, file.content, 'utf-8')
      created.push(file.path)
    }
    return { success: true, filesCreated: created }
  } catch (e: any) {
    return { success: false, error: e.message, filesCreated: created }
  }
}
