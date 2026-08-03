# Feature: Git Integration

## Overview

Full Git version control integration into the Keyscript IDE, modeled after IntelliJ's VCS experience. Includes core Git operations, visual log/diff tools, and provider-specific features for GitHub and Bitbucket Cloud. Authentication is SSH-based.

## Goals

- Provide a complete Git workflow without leaving the IDE
- Visual commit graph, diff viewer, and blame annotations
- GitHub and Bitbucket Cloud integration (PRs, issues, CI status)
- Conflict resolution with merge tooling integrated into Monaco
- Work in both Electron and Web/Docker deployment modes

## UI Layout

Follows IntelliJ's layout conventions:

### Sidebar (Left)

**Commit Panel** — dedicated sidebar panel for staging and committing:
- Changed files list grouped by status (modified, added, deleted, untracked)
- Checkbox per file for staging (supports partial/hunk staging)
- Commit message textarea with history dropdown
- Amend checkbox, sign-off option
- Commit / Commit and Push buttons
- Changelist grouping (default + custom changelists)

**Branches Panel** — sidebar panel for branch management:
- Current branch indicator (also shown in status bar)
- Local and remote branch tree
- Create, checkout, merge, rebase, delete actions
- Search/filter branches
- Stash list with pop/apply/drop actions

### Bottom Tabs

**Git Log** — visual commit history:
- Commit graph with branch/merge lines (like IntelliJ's Log tab)
- Columns: graph, commit message, author, date, hash
- Branch/tag labels on commits
- Click commit to see diff in detail pane
- Filter by branch, author, date range, path
- Search commits by message or hash

**Diff Viewer** — side-by-side or unified diff:
- File tree of changed files (left) + diff content (right)
- Syntax-highlighted diffs using Monaco's diff editor
- Navigate between hunks with keyboard shortcuts
- Inline controls: stage hunk, revert hunk, copy

**Merge / Conflicts** — conflict resolution (see Merge Editor section below)

### Status Bar

- Current branch name (click to show branch switcher popup)
- Sync status: ahead/behind remote counts
- Incoming/outgoing commit indicators
- Push/pull quick actions

## Core Git Operations

All Git operations use `isomorphic-git` for in-process Git (no CLI dependency) with fallback to spawning `git` CLI for operations isomorphic-git doesn't support well.

### Operation Matrix

| Operation | Library | Notes |
|-----------|---------|-------|
| status, diff, log | isomorphic-git | Fast, in-process |
| add, commit, reset | isomorphic-git | In-process |
| branch, checkout | isomorphic-git | In-process |
| push, pull, fetch | isomorphic-git + SSH | Uses SSH agent for auth |
| merge | git CLI | Complex merge strategies need native git |
| rebase | git CLI | Interactive rebase needs native git |
| stash | git CLI | Not supported by isomorphic-git |
| blame | git CLI | Performance — native is faster for large files |
| conflict detection | isomorphic-git | Read conflict markers |

### SSH Authentication

- Uses the system SSH agent (`SSH_AUTH_SOCK`) — no key management in the IDE
- Electron mode: inherits SSH agent from the user's environment
- Web/Docker mode: SSH agent socket mounted as a Docker volume
- Supports SSH config (`~/.ssh/config`) for host aliases and key selection
- No OAuth, no token storage — SSH keys only

## Provider Integrations

### GitHub

Uses the `gh` CLI or GitHub REST API via `@octokit/rest`.

**Features:**
- **Pull Requests:** Create, list, view, review, merge PRs from the IDE
  - PR creation dialog with base/head branch, title, description, reviewers
  - PR list panel showing open PRs with status checks
  - Inline diff comments on PR files
  - Approve / Request Changes / Comment actions
- **Issues:** Browse repo issues, link to commits via `#123` in commit messages
- **CI/CD Status:** Show GitHub Actions check status on branches and PRs
  - Green/red/yellow indicator per commit in the log
  - Click to open workflow run details
- **Clone:** Clone from GitHub repo URL with SSH

### Bitbucket Cloud

Uses Bitbucket Cloud REST API v2.0.

**Features:**
- **Pull Requests:** Create, list, view, approve, merge PRs
  - Same UI as GitHub PRs — provider-agnostic PR panel
  - Reviewer assignment, default reviewers
- **Pipelines:** Show Bitbucket Pipelines status on branches/PRs
- **Issues:** Browse Bitbucket issues (if enabled on repo)
- **Clone:** Clone from Bitbucket repo URL with SSH

### Provider Detection

The IDE detects the provider by inspecting remote URLs:

```typescript
function detectProvider(remoteUrl: string): 'github' | 'bitbucket' | 'generic' {
  if (remoteUrl.includes('github.com')) return 'github';
  if (remoteUrl.includes('bitbucket.org')) return 'bitbucket';
  return 'generic';
}
```

Provider-specific panels only appear when a matching remote is detected.

## Blame / Annotate

- Gutter annotations in Monaco showing commit hash, author, and relative date per line
- Toggle via right-click context menu or command palette
- Hover on annotation to see full commit message
- Click annotation to open that commit in the Git Log
- Uses `git blame` CLI for performance

## Diff Viewer

Built on Monaco's built-in diff editor (`monaco.editor.createDiffEditor`):

- Side-by-side and inline/unified toggle
- Syntax highlighting matches file type
- Hunk-level actions: stage, revert, copy
- File navigation tree on the left
- Keyboard navigation between changes (F7 / Shift+F7 like IntelliJ)

## Merge Editor — Options Analysis

Three approaches for conflict resolution, with trade-offs:

### Option A: Monaco Inline Markers (Simplest)

Display conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) directly in the Monaco editor with decorations and quick-action buttons.

**How it works:**
- Parse conflict markers in file content
- Add colored background decorations (green for ours, blue for theirs)
- Add inline buttons: "Accept Current", "Accept Incoming", "Accept Both"
- User can also manually edit the text

**Pros:**
- Simple to implement — just decorations and buttons on the existing editor
- No new editor component needed
- Users can manually edit freely

**Cons:**
- No side-by-side comparison of the two versions
- No view of the base (common ancestor) version
- Can be confusing for complex conflicts with many markers

**Effort:** Low — 1-2 days

### Option B: Monaco Dual-Pane Diff Editor (Middle Ground)

Use Monaco's `createDiffEditor` to show "ours" vs "theirs" side by side, with a result pane below or an apply mechanism.

**How it works:**
- Split the conflicting file into ours/theirs versions (strip markers)
- Show side-by-side diff in Monaco diff editor
- User picks hunks from either side
- Result is assembled from selections + manual edits

**Pros:**
- Clear visual comparison of both versions
- Leverages Monaco's built-in diff infrastructure
- Familiar to anyone who's used VS Code's merge editor

**Cons:**
- Two-pane only — no base version (not a true 3-way merge)
- Assembling the result from hunk selections requires custom logic
- Complex conflicts may still need manual editing

**Effort:** Medium — 3-5 days

### Option C: Full 3-Way Merge Editor (IntelliJ-Style)

Three-pane layout: Ours (left) | Result (center) | Theirs (right), with the common ancestor available as a toggle.

**How it works:**
- Extract base, ours, and theirs versions using `git show :1:file`, `:2:file`, `:3:file`
- Three Monaco editors side by side with synchronized scrolling
- Center pane is editable — the merge result
- Chevron buttons (>>  <<) to pull changes from left or right into center
- Color-coded: green (non-conflicting auto-merged), red (conflicting), gray (unchanged)
- "Accept Left" / "Accept Right" / "Accept Both" per conflict region
- Base version toggle shows the common ancestor for context

**Pros:**
- Full IntelliJ-level merge experience
- Users see both versions AND edit the result simultaneously
- Base version helps understand the intent of both changes
- Best UX for complex conflicts

**Cons:**
- Most complex to implement
- Three synchronized Monaco editors = more memory
- Requires extracting base/ours/theirs from Git index

**Effort:** High — 1-2 weeks

### Decision

**Option A first** — inline markers for immediate usability. Expand to **Option C** (3-way merge) later when the core Git integration is solid. Skip Option B — it doesn't add enough over A to justify the effort as a stepping stone.

## Feature Registration

```typescript
// Sidebar panels
registerFeature({
  id: 'git',
  name: 'Git',
  sidebarPanels: [
    {
      id: 'git-commit',
      name: 'Commit',
      icon: GitCommitHorizontal,
      render: () => <CommitPanel />
    },
    {
      id: 'git-branches',
      name: 'Branches',
      icon: GitBranch,
      render: () => <BranchPanel />
    }
  ],
  bottomTabs: [
    {
      id: 'git-log',
      label: 'Log',
      render: () => <GitLogView />
    },
    {
      id: 'git-diff',
      label: 'Diff',
      render: () => <DiffViewer />
    }
  ],
  statusBarItems: [
    {
      id: 'git-branch-status',
      render: () => <BranchStatusBar />
    }
  ]
});
```

## File Structure

```
src/renderer/features/git/
  index.tsx                    # Feature registration
  GitStore.ts                  # Zustand store for git state

  # Sidebar panels
  panels/
    CommitPanel.tsx            # Staging, commit message, commit actions
    BranchPanel.tsx            # Branch tree, create, checkout, merge

  # Bottom tabs
  log/
    GitLogView.tsx             # Commit graph + detail pane
    CommitGraph.tsx            # Canvas/SVG branch graph renderer
    CommitRow.tsx              # Single commit row component
    LogFilters.tsx             # Branch, author, date filters
  diff/
    DiffViewer.tsx             # File tree + Monaco diff editor
    DiffFileTree.tsx           # Changed files tree
    HunkActions.tsx            # Stage/revert/copy per hunk
  merge/
    InlineConflictMarkers.tsx  # Option A: inline markers
    ThreeWayMerge.tsx          # Option C: 3-pane merge editor

  # Status bar
  BranchStatusBar.tsx          # Branch name + ahead/behind

  # Providers
  providers/
    types.ts                   # Provider interface
    github.ts                  # GitHub API integration
    bitbucket.ts               # Bitbucket Cloud API integration
    detection.ts               # Auto-detect provider from remote URL
  pr/
    PullRequestPanel.tsx       # Create, list, view PRs
    PullRequestReview.tsx      # Review UI with inline comments
    CIStatusBadge.tsx          # Pipeline/Actions status indicator

  # Git operations
  ops/
    git-core.ts                # isomorphic-git wrapper
    git-cli.ts                 # Fallback to git CLI for merge/rebase/stash/blame
    ssh.ts                     # SSH agent integration
    blame.ts                   # Blame data parsing + caching
    conflict.ts                # Conflict marker parsing

src/main/git.ts                # Electron: git CLI spawning, SSH agent access
src/server/gitRoutes.ts        # Web: REST API for git operations
```

## Implementation Phases

### Phase 1 — Core Git + Commit Panel
- Git status, diff, add, commit via isomorphic-git
- Commit sidebar panel with staging checkboxes and message input
- Branch indicator in status bar
- Basic diff viewer using Monaco diff editor

### Phase 2 — Log + Branches + Blame
- Git log with commit graph visualization
- Branch panel with create/checkout/delete
- Blame gutter annotations in Monaco
- Stash support via git CLI

### Phase 3 — Merge + Conflict Resolution
- Inline conflict markers (Option A) for quick resolution
- 3-way merge editor (Option C) for complex conflicts
- Merge and rebase operations

### Phase 4 — GitHub + Bitbucket Integration
- Provider auto-detection from remote URL
- PR creation and listing
- PR review with inline comments
- CI/CD status badges
- Issue browsing and commit linking

### Phase 5 — Advanced
- Interactive rebase UI
- Partial (hunk-level) staging
- Cherry-pick UI
- Git reflog viewer
- Submodule support

## Dependencies

- `isomorphic-git` — in-process Git operations (no git CLI required for basics)
- `@octokit/rest` — GitHub API client
- Native `git` CLI — fallback for merge, rebase, stash, blame
- Monaco diff editor — built into `monaco-editor` (already a dependency)
- SSH agent — system-level, no additional dependencies

## Open Questions

- Should we support Git LFS?
- Do we need `.gitignore` editor / visual management?
- Should commit signing (GPG/SSH) be configurable from the IDE?
- How should we handle large repos — lazy log loading, virtual scrolling?
- Should the commit graph renderer use Canvas, SVG, or a library like `react-flow`?
