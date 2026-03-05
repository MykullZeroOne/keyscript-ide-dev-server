# Auto

## Configuration
- **Artifacts Path**: {@artifacts_path} → `.zenflow/tasks/{task_id}`

---

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:
- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [x] Step: Planning
<!-- chat-id: bce4e3ee-f3f9-44cf-ab3f-16f76e760f94 -->
- Analyze the original codebase (Express server, ExtJS app, and KeyScript runtime)
- Document API protocols, authentication flow, and script execution flow
- Map original features to a new plugin architecture
- Create a detailed implementation plan for the Electron + React rebuild

### [x] Step: Electron Main Process & Proxy Port
- Set up `electron-vite` project structure
- Port proxy server from `server/main.ts` to Electron main process
- Handle `JSESSIONID` cookie rewriting and `SessionStore` interception
- Implement local routes for `KeyscriptServlet/List` and `GetDeviceInformation`

### [x] Step: Core Plugin Registry & Layout
- Implement feature registry system with Zustand
- Build the main shell layout with `allotment` (Activity Bar, Sidebar, Editor, Bottom Panel, Status Bar)
- Set up `FeatureContext` for plugins to interact with the shell

### [x] Step: Feature: Authentication (Login)
<!-- chat-id: 3d407b17-182f-426a-810a-2af6bf382085 -->
- Create login UI (Dialog)
- Implement `StatusBarItem` for auth status
- Wire up with proxied `/UserLogin` endpoint

### [ ] Step: Feature: Script Explorer (File Tree)
- Implement sidebar panel for browsing scripts
- Use `KeyscriptServlet/List` for fetching directory contents
- Open script files in the editor on click

### [x] Step: Feature: Editor (Monaco)
- Integrate Monaco editor into the main workspace
- Support multiple tabs for open scripts
- Implement Save functionality via IPC

### [ ] Step: Feature: Script Runner (Webview)
- Implement Main workspace view with `<webview>`
- Build the server-side runtime shell (`RunScript` route)
- Inject parameters and `keyscript-all.js` into the webview
- Add "Run" button to the toolbar

### [ ] Step: Features: Developer Tools (Console, Inspector, Terminal)
- Console: Capture `console.log` from the webview and display in a bottom tab
- Inspector: Log proxied network requests in a bottom tab
- Terminal: Integrate `node-pty` + `xterm.js` for an integrated shell

### [ ] Step: Final Integration & Testing
- Test login persistence
- Verify script execution with complex ExtJS components
- Ensure search (Person/Account) works correctly through the proxy
