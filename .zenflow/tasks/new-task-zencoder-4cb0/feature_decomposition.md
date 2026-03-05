# Keyscript IDE - Feature Decomposition & API Protocol

## 1. API Protocol Reference

The IDE acts as a proxy to the Keystone core banking server.

### Core Endpoints (Proxied to `/{Instance}/...`)

| Endpoint | Method | Content Type | Description |
|----------|--------|--------------|-------------|
| `/UserLogin` | POST | JSON | Authenticates user, returns `JSESSIONID` |
| `/DirectXMLPostJSON` | POST | JSON | Primary endpoint for XML-based queries/updates |
| `/LoginUserInterface` | POST | JSON | Fetches UI metadata/session info after login |
| `/TableListJSON` | POST | JSON | Lists available tables |
| `/TableBrowser` | POST | JSON | Browser for table records |
| `/SearchJSON` | POST | JSON | Search functionality for Person, Account, etc. |
| `/RetrieveBinary` | GET | Binary | Retrieves files/assets |
| `/SessionStore` | POST | Form | Temporary storage for passing script parameters |

### Local IDE Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/KeyscriptServlet/List` | POST | Lists local scripts from `./public/scripts/` (reads local FS) |
| `/GetDeviceInformation` | GET | Returns device info (MAC addresses) for license verification (Mocked on port 51764) |
| `/RunScript` | GET | Serves the `iframe-target.html` with injected parameters |
| `/JSCSSLoader` | GET | Serves loader script that includes ExtJS and `ide-all.js`/`keyscript-all.js` |

---

## 2. Authentication Flow

1. **Device Identification**:
   - Client fetches `/GetDeviceInformation` from the local service (port 51764).
   - Returns an XML document containing the device's MAC addresses.
2. **User Login**:
   - POST to `/UserLogin` with credentials and device info.
   - Server responds with a JSON body containing `JSESSIONID`.
3. **Session Management**:
   - The proxy server intercepts the `/UserLogin` response.
   - It rewrites the `Set-Cookie` header to ensure the `JSESSIONID` path is normalized to `/`.
   - All subsequent requests include this cookie.

---

## 3. Script Execution Flow

1. **Parameter Storing**:
   - IDE collects parameters from `Script Options` (south-west panel).
   - It constructs a `crlogin` and `crscript` object.
   - It calls `/SessionStore` (proxied) to save these objects.
   - Proxy intercepts the response to map the session ID to the parameters in its local `ideParamsData` cache.
2. **Execution Shell**:
   - IDE navigates the preview area to `/RunScript?scriptPath=...&scriptParametersId=...`.
3. **Runtime Injection**:
   - The server renders `iframe-target.html`.
   - It injects `head-section.html` (ExtJS 3.2.2 + `keyscript-all.js`).
   - It injects the `scriptParameters` retrieved from the local cache.
   - The script initializes `CR.Login` and `CR.Script` before dynamically loading the `.js` file from `/scripts/`.

---

## 4. Feature Map

| Original Component | Purpose | New Plugin ID |
|--------------------|---------|---------------|
| `CR.Login` | Auth & Session | `login` |
| `CR.DevelopmentScriptsPanel` | File Explorer | `script-explorer` |
| `Run Parameters` FieldSet | Script Params | `script-options` |
| `CR.ScriptManager` | Execution Engine | `script-runner` |
| `CR.Core.ajaxRequest` | Network Handler | `inspector` (passive) |
| `Ext.Window` / `Viewport` | UI Layout | `shell` (base) |
| `CodeMirror` (in `ide-all`) | Editor | `editor` (Monaco) |
| `console.log` capture | Logging | `console` |
| Network requests | Debugging | `inspector` |

---

## 5. Plugin Architecture Design

### Feature Interface
Each plugin MUST implement the following interface (see `src/renderer/features/types.ts`):

```typescript
interface SidebarPanel {
  id: string;
  icon: LucideIcon;
  label: string;
  component: React.ComponentType;
}

interface BottomTab {
  id: string;
  label: string;
  component: React.ComponentType;
}

interface FeatureDefinition {
  id: string;
  name: string;
  requires?: string[];
  initialize?: () => Promise<void>;
  sidebarPanels?: SidebarPanel[];
  bottomTabs?: BottomTab[];
  toolbarItems?: Array<{
    id: string;
    component: React.ComponentType;
  }>;
  statusBarItems?: Array<{
    id: string;
    alignment: 'left' | 'right';
    component: React.ComponentType;
  }>;
}
```

### Plugin Registry
A central store (Zustand) manages the registry. Plugins self-register on import.

### Target Plugins

- **login**: Registers `StatusBarItem` (Auth status) and `Dialog` (Login form).
- **script-explorer**: Registers `SidebarPanel` (File tree) using `/KeyscriptServlet/List`.
- **script-options**: Registers `SidebarPanel` (Form fields for `PERSON_SERIAL`, `ACCOUNT_SERIAL`, etc.).
- **script-runner**: Registers `ToolbarItem` (Run button) and Main area view (webview renderer).
- **editor**: Registers Main area view (Monaco editor instance).
- **console**: Registers `BottomTab` (Captures messages from webview).
- **inspector**: Registers `BottomTab` (Logs proxied requests/responses).
- **terminal**: Registers `BottomTab` (Xterm.js instance).
