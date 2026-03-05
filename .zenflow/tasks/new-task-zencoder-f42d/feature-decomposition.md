# Keyscript IDE - Feature Decomposition

## API Protocol Reference

### Keystone Core API (Proxied)
| Endpoint | Method | Format | Description |
| --- | --- | --- | --- |
| `/UserLogin` | POST | JSON | Authenticates user and returns `JSESSIONID` |
| `/DirectXMLPostJSON` | POST | JSON/XML | Central endpoint for queries and transactions |
| `/TableListJSON` | POST | JSON | Lists available tables in Keystone |
| `/SearchJSON` | POST | JSON | Executes searches across tables |
| `/TableBrowser` | POST | JSON | Fetches detailed table data |

### IDE Companion Service
| Endpoint | Method | Format | Description |
| --- | --- | --- | --- |
| `/GetDeviceInformation` | GET | XML | Returns MAC addresses for device identification |

### IDE Dev Server
| Endpoint | Method | Format | Description |
| --- | --- | --- | --- |
| `/KeyscriptServlet/List` | POST | JSON | Lists scripts in `public/scripts` |
| `/SessionStore` | POST | Proxy | Intercepted to map script parameters (UUID remapping) |
| `/RunScript` | GET | HTML | Serves `iframe-target.html` shell with injected script and parameters |

---

## Authentication Flow

1. **MAC Retrieval**: The IDE calls `/GetDeviceInformation` (mocked on port 3001) to get the identifier required by Keystone.
2. **User Login**: The user provides credentials, which are sent to `/UserLogin`.
3. **Session Interception**:
   - The proxy catches the `JSESSIONID` cookie.
   - It rewrites the `Path` attribute to `/` to ensure the session persists for all subsequent proxied requests.
4. **Parameter Remapping**:
   - When a script is about to be run, parameters are sent to `/SessionStore`.
   - The proxy intercepts this, assigns a local sequence ID, and maps it to the Keystone-returned `id`.
   - This allows the script in the `webview` to retrieve its parameters using the local ID.

---

## Script Execution Flow

1. **Selection**: User selects a script from the `script-explorer`.
2. **Configuration**: User sets parameters (Person, Account, etc.) in `script-options`.
3. **Execution**:
   - User clicks "Run".
   - The IDE opens a `<webview>` pointing to `/RunScript?scriptPath=...&scriptParametersId=...`.
   - The server renders `iframe-target.html`, which includes the ExtJS/CR runtime and the user's script.
4. **Communication**:
   - The script runs in the same-origin environment as the IDE (relative to the proxy).
   - Console logs and network requests are intercepted and sent to the `console` and `inspector` tabs.

---

## Feature Map

| Original Component | New Plugin ID | Description |
| --- | --- | --- |
| `CR.Login` | `login` | Authentication form, session management, and status bar status. |
| `CR.DevelopmentScriptsPanel` | `script-explorer` | File tree sidebar for browsing local scripts. |
| `scriptParameters` fields | `script-options` | Sidebar panel for defining script context (Serials). |
| `CR.ScriptManager.showScript` | `script-runner` | Main area tab with `<webview>` for execution. |
| Browser Console | `console` | Bottom panel for capturing script stdout/stderr. |
| Browser Network Tab | `inspector` | Bottom panel for visualizing proxied API payloads. |
| Monaco Editor | `editor` | Central code editor with tabbed interface. |
| N/A | `terminal` | Integrated xterm.js terminal for local script manipulation. |
