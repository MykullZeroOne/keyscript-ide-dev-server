# Feature: Coding Agent Integration

## Overview

Embed AI coding agents (Claude Code, OpenAI Codex) directly into the Keyscript IDE with deep context awareness of the CR framework, ExtJS 3.x patterns, and Keystone APIs. Users should be able to prompt an agent to write, edit, and debug Keyscript code without leaving the IDE.

## Goals

- Provide an in-IDE chat interface for interacting with coding agents
- Support multiple agent backends (Claude Code CLI, OpenAI Codex CLI, extensible to others)
- Automatically inject CR framework, ExtJS, and Keystone context so agents produce correct code
- Sync agent file edits back into the Monaco editor in real time
- Work in both Electron and Web/Docker deployment modes

## Architecture

### Agent Subprocess Management

Agents are spawned as child processes in the workspace directory, similar to how the terminal feature works today via `node-pty`.

**New IPC channels (Electron mode):**

| Channel | Direction | Purpose |
|---------|-----------|---------|
| `agent:start` | renderer -> main | Spawn agent process with selected backend |
| `agent:prompt` | renderer -> main | Send user message + context to agent stdin |
| `agent:stream` | main -> renderer | Stream agent stdout/stderr back to UI |
| `agent:stop` | renderer -> main | Kill agent process |
| `agent:status` | main -> renderer | Process lifecycle events (started, exited, error) |

**Web/Docker mode:** WebSocket endpoint at `/ws/agent` following the same pattern as `/ws/terminal`.

### Agent Backends

Each backend is a thin adapter that knows how to spawn and communicate with a specific CLI tool.

```
src/renderer/features/code-agent/
  backends/
    claude-code.ts    # Spawns `claude` CLI with --json/--print flags
    openai-codex.ts   # Spawns `codex` CLI
    types.ts          # Common AgentBackend interface
```

**AgentBackend interface:**

```typescript
interface AgentBackend {
  id: string;
  name: string;
  available: boolean;           // CLI detected on PATH
  spawn(opts: AgentSpawnOpts): AgentProcess;
}

interface AgentSpawnOpts {
  workspacePath: string;
  systemPrompt?: string;        // CR/ExtJS context injected here
  model?: string;
  env?: Record<string, string>;
}

interface AgentProcess {
  send(message: string): void;
  onData(cb: (chunk: string) => void): void;
  onExit(cb: (code: number) => void): void;
  kill(): void;
}
```

### CR/ExtJS Context Strategy

Context is provided to agents through multiple layers:

**Layer 1 — CLAUDE.md in workspace (zero-config for Claude Code)**

A curated `CLAUDE.md` placed in the workspace root. Claude Code reads this automatically. Contains:
- CR.XML API with query-building examples
- CR.Core.ajaxRequest patterns
- CR.Login / CR.Script object shapes
- Common ExtJS 3.x patterns (grids, stores, panels, forms)
- Keystone XML query format and DirectXMLPostJSON response shapes
- 5-10 annotated example scripts

**Layer 2 — System prompt injection**

For agents that support a system prompt (Codex, or Claude via `--system-prompt`), prepend the same context automatically when spawning.

Source material already exists:
- `src/renderer/features/editor/cr-types.ts` — 52KB of TypeScript declarations for the CR namespace
- `src/renderer/features/editor/monaco-setup.ts` — completion snippets

These should be distilled into prose + examples rather than raw type definitions.

**Layer 3 (Future) — MCP Server for live Keystone introspection**

A Model Context Protocol server that gives agents live access to:
- `get_table_schema(tableName)` — column names, types, relationships
- `get_script_examples(pattern)` — search existing scripts in workspace
- `run_xml_query(xml)` — test queries against the connected Keystone instance
- `get_login_context()` — current CR.Login values (instance, user, session)

This requires the agent backend to support MCP (Claude Code does natively).

### Feature Registration

Registered as a standard IDE feature via `registerFeature()`:

```typescript
registerFeature({
  id: 'code-agent',
  name: 'Code Agent',
  sidebarPanels: [{
    id: 'agent-panel',
    name: 'Agent',
    icon: Bot,
    render: () => <AgentPanel />
  }],
  bottomTabs: [{
    id: 'agent-output',
    label: 'Agent',
    render: () => <AgentOutput />
  }],
  statusBarItems: [{
    id: 'agent-status',
    render: () => <AgentStatusIndicator />
  }]
});
```

### UI Components

**AgentPanel (sidebar):**
- Backend selector dropdown (Claude Code / Codex)
- Model selector (when backend supports multiple models)
- Context toggles (include CR docs, include open file, include project tree)
- Session history list

**AgentOutput (bottom tab):**
- Chat-style message thread (user prompts + agent responses)
- Streaming markdown rendering for agent output
- File diff viewer when agent proposes edits
- Accept / Reject buttons for file changes
- "Apply to Editor" action that updates EditorStore tabs

**AgentStatusIndicator (status bar):**
- Shows active/idle/error state
- Token usage (if available from backend)
- Click to focus agent panel

### Editor Sync

When an agent modifies files on disk:

1. File watcher (chokidar in main process) detects changes in workspace
2. For each changed file, check if it's open in `EditorStore`
3. If open and not dirty — silently update tab content
4. If open and dirty — show conflict notification with diff view
5. New files created by agents appear in Script Explorer automatically

### Authentication & Security

- Agent processes inherit the workspace environment but NOT the Keystone session
- API keys for Claude/OpenAI are stored via Electron `safeStorage` (same as credential caching)
- In web mode, API keys are provided via environment variables
- Agents never receive the JSESSIONID directly — Keystone access goes through the proxy

## File Structure

```
src/renderer/features/code-agent/
  index.tsx                 # Feature registration
  AgentPanel.tsx            # Sidebar panel component
  AgentOutput.tsx           # Bottom tab chat interface
  AgentStatusIndicator.tsx  # Status bar widget
  AgentStore.ts             # Zustand store for agent state
  backends/
    types.ts                # AgentBackend interface
    claude-code.ts          # Claude Code CLI adapter
    openai-codex.ts         # OpenAI Codex CLI adapter
  context/
    cr-framework.md         # Curated CR namespace docs + examples
    extjs-patterns.md       # Common ExtJS 3.x patterns
    keystone-api.md         # XML query and API docs

src/main/agent.ts           # Electron: agent process management
src/server/agentWs.ts       # Web: WebSocket agent endpoint
```

## Implementation Phases

### Phase 1 — Context docs + terminal usage
- Write CR/ExtJS/Keystone context documents
- Place CLAUDE.md in workspace for immediate Claude Code use via existing terminal
- No code changes required

### Phase 2 — Agent subprocess + chat UI
- Implement agent process management (IPC + WebSocket)
- Build AgentPanel and AgentOutput components
- Claude Code backend adapter
- Basic streaming chat interface

### Phase 3 — Editor integration
- File watcher for agent-initiated changes
- EditorStore sync with conflict detection
- "Apply changes" workflow with diff view
- OpenAI Codex backend adapter

### Phase 4 — MCP Server for live context
- Build Keystone MCP server for table schema introspection
- Integrate with Claude Code's MCP support
- Live query testing from agent context

## Dependencies

- `claude` CLI installed and authenticated (for Claude Code backend)
- `codex` CLI installed and authenticated (for OpenAI Codex backend)
- `chokidar` — file watching (already in use or easily added)
- No new heavy dependencies — agents are external processes

## Open Questions

- Should agents be able to execute scripts on Keystone (run button equivalent)?
- Rate limiting / cost controls for agent API usage?
- Should agent sessions persist across IDE restarts?
- Multi-file edit review UX — inline diffs vs. side-by-side vs. unified?
