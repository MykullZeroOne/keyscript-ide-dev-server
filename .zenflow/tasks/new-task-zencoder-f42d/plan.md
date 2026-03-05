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

### [x] Step: Investigation & Analysis
- Analyze `server/main.ts` for proxy and auth logic
- Analyze `ide-all.js` and `keyscript-all.js` for feature decomposition
- Document API protocol and auth flow
- Map original components to new plugin architecture

### [x] Step: Design Plugin Architecture
<!-- chat-id: 0f4637e1-3515-4e4b-96f1-405fa0740943 -->
- Define `FeatureDefinition` interface
- Design central `FeatureRegistry`
- Design state management with Zustand
- Define layout with Allotment (VS Code style)

### [x] Step: Initialize Electron Project
<!-- chat-id: a0035ab4-6dfc-4f53-9b5f-0a2d4d48c06a -->
- Set up `electron-vite` with React + Tailwind v4
- Configure `.gitignore`
- Set up project structure (`src/main`, `src/renderer/features`, `src/renderer/shell`)

### [x] Step: Port Proxy Server
<!-- chat-id: 546d8a85-73cd-4d8d-803b-5bf7327ea3f3 -->
- Move `server/main.ts` logic into Electron main process
- Handle `JSESSIONID` cookie rewriting
- Implement `/SessionStore` interception
- Serve static assets and renderer build

### [x] Step: Implement Feature Registry & Shell
<!-- chat-id: ae010a17-4877-40ea-b157-f0760739fcd6 -->
- Implement `registerFeature` and `useFeatureRegistry`
- Build layout with Activity Bar, Sidebar, Editor Area, Bottom Panel, and Status Bar
- Implement resizable panes using `allotment`

### [x] Step: Implement Core Features
<!-- chat-id: 7dc1a3ca-961a-41fd-ba62-e8daed792764 -->
- [x] **Login**: Auth dialog, session persistence, status bar indicator
- [x] **Script Explorer**: File tree with IPC filesystem integration
- [x] **Editor**: Monaco integration, tab management, save functionality
- [x] **Script Runner**: Webview integration, parameter passing via `/SessionStore`
- [x] **Search**: Utility for Person/Account search (used for parameters)
- [x] **Console/Inspector**: Capture webview logs and network requests

### [x] Step: Implement Terminal Feature
- [x] Create main process terminal backend with `node-pty`
- [x] Create renderer terminal feature with `xterm.js`
- [x] Register feature in the shell registry

### [x] Step: Verification & Testing
<!-- chat-id: a9f66184-572d-46ee-9d46-66fd2a2ab1e3 -->
- [x] Test login and session persistence
- [x] Test script execution with sample scripts
- [x] Verify complex ExtJS/React scripts render correctly
- [x] Run lint and typecheck
