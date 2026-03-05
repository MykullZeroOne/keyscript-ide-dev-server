# Keyscript IDE -- Plugin Architecture Rebuild

## Mission

You are rebuilding the **Keyscript IDE** -- a Corelation Keystone development tool -- from its original ExtJS-based web app into a modern **Electron + React + Monaco Editor** desktop application with a **plugin/feature registry architecture**.

The original IDE lives in this repo as a Node.js/Express dev server that proxies to a Keystone core banking server. Your job is to:

1. **Analyze the original codebase** to understand every feature, API call, and UI component
2. **Decompose those features into self-registering plugins**
3. **Rebuild the IDE** as an Electron app where each feature is a plugin that registers itself into a shell layout

---

## Step 1: Understand the Original

### What to Analyze

The original IDE is an Express server + ExtJS web application. You need to examine:

**Server (`server/main.ts`):**
- How it proxies POST and GET requests to the upstream Keystone server
- How it handles authentication (UserLogin endpoint, JSESSIONID cookies, cookie path rewriting)
- How it passes script parameters (SessionStore flow -- local interception + UUID remapping)
- How it serves the IDE page, RunScript page, and script files
- The `KeybridgeEndpoints` list -- which endpoints get instance-prefixed
- How URL paths are stripped/rewritten (`/{Instance}/Keyscript_IDE/` prefix handling)
- The device identification flow (`/GetDeviceInformation` from a Go companion service on port 51763)

**Views (`views/`):**
- `keyscript_ide.html` -- the main IDE entry point (loads `JSCSSLoader`, calls `CR.mainPage()`)
- `iframe-target.html` -- the script execution shell (how scripts are loaded with parameters)
- `templates/head-section.html` -- the ExtJS + CR runtime includes

**Static Assets (`public/`):**
- `KeyScript/js/keyscript-all.js` -- the CR framework runtime (used by scripts at runtime)
- `KeyScript/js/ide-all.js` -- the original IDE code (THIS IS YOUR PRIMARY REFERENCE for feature decomposition)
- `ext-3.2.2/` -- ExtJS 3.2.2 framework
- `scripts/` -- example Keyscript files

**The IDE JavaScript (`public/KeyScript/js/ide-all.js`):**
This is the most important file. It contains ALL the original IDE functionality as minified ExtJS code. You need to extract and document:
- Every `CR.*` class and its purpose
- The `CR.ScriptManager` -- how scripts are loaded, executed, and managed
- The `CR.Script` object -- what properties scripts expect (`personSerial`, `accountSerial`, `scriptPanelId`, `scriptDefaultPanelId`, `hostPanelId`, etc.)
- The `CR.Login` object -- session management, what fields are set on login
- How `CR.PersonSearch` and `CR.RecordSearch` work (XML query construction)
- How `CR.Core.ajaxRequest` works (the central AJAX handler)
- How `CR.XML` builds query documents
- How `CR.FMPanel` and field types work (CRUD panels)
- The `CR.DevelopmentScriptsPanel` and `CR.InstalledScriptsPanel` (script tree views)
- The menu system, toolbar, and status bar

**Example Scripts (`scripts/` or `public/scripts/`):**
- Examine how scripts use `CR.Script.*`, `CR.L[package-lock.json](package-lock.json)ogin.*`, `CR.Core.ajaxRequest`, `DirectXMLPostJSON`
- Note which scripts create `Ext.Viewport`, `CR.Panel`, `CR.Window`
- Check if any are webpack bundles (large files that use `createRoot` or React)
- Check how scripts construct API URLs (some check `window.location.href` for patterns like "RunScript")

### What to Document

After analysis, produce a feature decomposition document that maps every original IDE capability to a plugin. Include:

1. **API Protocol Reference** -- every POST/GET endpoint, its content type, request/response format, XML schema examples
2. **Authentication Flow** -- full login sequence including device identification, cookie handling, session management
3. **Script Execution Flow** -- how scripts get parameters, how the execution shell works, what runtime objects must be available
4. **Feature Map** -- original ExtJS component -> new plugin name, what it registers (sidebar panel, bottom tab, toolbar item, status bar item)

---

## Step 2: Design the Plugin Architecture

### Feature Registry

Create a central registry where features self-register:

```typescript
interface FeatureDefinition {
  id: string
  name: string
  requires?: string[]              // dependency feature IDs
  initialize?: (ctx: FeatureContext) => Promise<void>
  sidebarPanels?: SidebarPanel[]   // entries in the left sidebar
  bottomTabs?: BottomTab[]         // tabs in the bottom panel
  toolbarItems?: ToolbarItem[]     // buttons/widgets in the toolbar
  statusBarItems?: StatusBarItem[] // items in the status bar
}
```

Each feature is a directory under `src/renderer/features/{name}/` with an `index.ts` that calls `registerFeature()` on import. The app imports all features in `App.tsx`, and the shell layout reads the registry to render UI.

### Target Features (map from original)

| Plugin ID | Original Source | Registers |
|---|---|---|
| `login` | `CR.Login`, `UserLogin` endpoint | StatusBar (login indicator), Dialog (login form) |
| `script-explorer` | `CR.DevelopmentScriptsPanel` | Sidebar (file tree) |
| `script-options` | Script parameter fields in original IDE | Sidebar (serial fields, search, run-in selector) |
| `script-runner` | `CR.ScriptManager.showScript` | Toolbar (run button), Main area (preview webview) |
| `console` | Browser console capture | Bottom tab |
| `inspector` | Network request capture | Bottom tab |
| `terminal` | New feature (not in original) | Bottom tab |
| `editor` | CodeMirror in original -> Monaco | Main area (code editor with tabs) |

### Layout (VS Code-style)

```
[Activity Bar] [Sidebar Panel] [Editor / Preview Pane]
                                [Bottom Panel (Console | Inspector | Terminal)]
[Status Bar]
```

Use `allotment` for resizable split panes.

---

## Step 3: Build It

### Tech Stack
- **Electron** with `electron-vite` for build tooling
- **React 19** for the renderer UI
- **Monaco Editor** (`@monaco-editor/react`) for code editing
- **Zustand** for state management
- **Tailwind CSS v4** for styling (dark theme, VS Code aesthetic)
- **Express** + `express-http-proxy` for the proxy server (runs in main process)
- **node-pty** + xterm.js for integrated terminal
- **allotment** for resizable panes
- **lucide-react** for icons

### Critical Implementation Details

**Same-Origin Requirement:**
The Electron renderer MUST load from `http://localhost:{port}/ide/` (served by the proxy), NOT from `file://`. This is because Keystone session cookies (`JSESSIONID`) must be sent with every `fetch()` call. Cross-origin `file://` -> `http://` requests won't include cookies even with `credentials: 'include'`. The proxy must serve the renderer build as static files at a route registered BEFORE the catch-all proxy.

**Script Execution in Webview:**
Scripts need the FULL ExtJS + CR runtime. They run in an Electron `<webview>` tag that loads an HTML shell from the proxy. This shell includes all the framework JS/CSS, sets up `CR.Login`, `CR.Script`, and then dynamically loads the user's script file. The webview is NOT a sandboxed iframe -- it needs real Keystone API access through the proxy.

**Proxy Architecture:**
Port the original `server/main.ts` proxy logic into the Electron main process. The proxy:
- Forwards all POST/GET requests to the upstream Keystone server
- Rewrites cookies (path normalization, Secure flag removal for HTTP)
- Intercepts SessionStore requests to manage script parameter passing
- Serves static assets (ExtJS, CR runtime, scripts, IDE renderer)
- Express route registration order matters -- local routes must come before the catch-all proxy

### Build Order
1. Main process: proxy server (port from original, all endpoints)
2. Main process: IPC handlers (file system, config, terminal)
3. Renderer: plugin registry + shell layout
4. Feature: login (first -- everything else needs auth)
5. Feature: script explorer (file tree)
6. Feature: editor (Monaco, tabs)
7. Feature: script options (serial fields, search)
8. Feature: script runner (preview webview)
9. Feature: console, inspector, terminal
10. Integration testing with real Keyscripts

### Validation
The rebuild is complete when:
- [ ] Login works and JSESSIONID persists across requests
- [ ] Script tree shows local scripts
- [ ] Monaco editor opens, edits, and saves scripts
- [ ] Person/account search returns results from Keystone
- [ ] Simple scripts (e.g., `sample-script.js`) execute in the preview pane
- [ ] Complex scripts (e.g., ExtJS Viewport scripts, webpack React bundles) render correctly
- [ ] Console captures script output
- [ ] Inspector shows proxied requests with XML/JSON bodies
- [ ] Terminal provides a shell in the scripts directory
