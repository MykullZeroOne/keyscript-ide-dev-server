# Keyscript IDE - Architecture Design

## 1. Feature Definition & Registry

The core of the IDE is a plugin-based architecture where features self-register into a central registry.

### `FeatureDefinition` Interface

```typescript
import { LucideIcon } from 'lucide-react';

export interface SidebarPanel {
  id: string;
  title: string;
  icon: LucideIcon;
  component: React.ComponentType;
}

export interface BottomTab {
  id: string;
  title: string;
  component: React.ComponentType;
}

export interface ToolbarItem {
  id: string;
  component: React.ComponentType;
}

export interface StatusBarItem {
  id: string;
  alignment: 'left' | 'right';
  priority: number;
  component: React.ComponentType;
}

export interface MainPanel {
  id: string;
  title: string;
  component: React.ComponentType;
}

export interface FeatureContext {
  // Methods to interact with the shell and other features
  registerSidebarPanel: (panel: SidebarPanel) => void;
  registerBottomTab: (tab: BottomTab) => void;
  registerToolbarItem: (item: ToolbarItem) => void;
  registerStatusBarItem: (item: StatusBarItem) => void;
  registerMainPanel: (panel: MainPanel) => void;
}

export interface FeatureDefinition {
  id: string;
  name: string;
  requires?: string[]; // Dependency feature IDs
  initialize?: (ctx: FeatureContext) => Promise<void>;
}
```

### `FeatureRegistry`

The registry will be a singleton that manages the lifecycle of features.

```typescript
class FeatureRegistry {
  private features: Map<string, FeatureDefinition> = new Map();
  private sidebarPanels: SidebarPanel[] = [];
  private bottomTabs: BottomTab[] = [];
  private toolbarItems: ToolbarItem[] = [];
  private statusBarItems: StatusBarItem[] = [];
  private mainPanels: MainPanel[] = [];

  register(feature: FeatureDefinition) {
    this.features.set(feature.id, feature);
  }

  async initializeAll() {
    const context: FeatureContext = {
      registerSidebarPanel: (p) => this.sidebarPanels.push(p),
      registerBottomTab: (t) => this.bottomTabs.push(t),
      registerToolbarItem: (i) => this.toolbarItems.push(i),
      registerStatusBarItem: (s) => this.statusBarItems.push(s),
      registerMainPanel: (m) => this.mainPanels.push(m),
    };

    // Sort by dependencies and initialize
    // (Simple implementation: follow the order of registration for now)
    for (const feature of this.features.values()) {
      if (feature.initialize) {
        await feature.initialize(context);
      }
    }
  }

  // Getters for UI components
  getSidebarPanels() { return this.sidebarPanels; }
  getBottomTabs() { return this.bottomTabs; }
  getToolbarItems() { return this.toolbarItems; }
  getStatusBarItems() { return this.statusBarItems; }
  getMainPanels() { return this.mainPanels; }
}

export const featureRegistry = new FeatureRegistry();
```

## 2. State Management (Zustand)

We'll use Zustand for global shell state and individual feature state where necessary.

### Shell Store

```typescript
interface ShellState {
  activeSidebarId: string | null;
  activeBottomTabId: string | null;
  isSidebarOpen: boolean;
  isBottomPanelOpen: boolean;
  
  setActiveSidebar: (id: string | null) => void;
  setActiveBottomTab: (id: string | null) => void;
  toggleSidebar: () => void;
  toggleBottomPanel: () => void;
}

export const useShellStore = create<ShellState>((set) => ({
  activeSidebarId: 'script-explorer',
  activeBottomTabId: 'console',
  isSidebarOpen: true,
  isBottomPanelOpen: true,

  setActiveSidebar: (id) => set({ activeSidebarId: id, isSidebarOpen: !!id }),
  setActiveBottomTab: (id) => set({ activeBottomTabId: id, isBottomPanelOpen: !!id }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleBottomPanel: () => set((state) => ({ isBottomPanelOpen: !state.isBottomPanelOpen })),
}));
```

## 3. Layout (VS Code-style)

Using `allotment` for resizable panes.

```tsx
<div className="flex flex-col h-screen overflow-hidden bg-vscode-background text-vscode-foreground">
  <Toolbar />
  <div className="flex-1 overflow-hidden">
    <Allotment>
      <Allotment.Pane visible={isSidebarOpen} preferredSize={300} minSize={200}>
        <div className="flex h-full">
          <ActivityBar />
          <Sidebar />
        </div>
      </Allotment.Pane>
      <Allotment.Pane>
        <Allotment vertical>
          <Allotment.Pane>
            <MainArea />
          </Allotment.Pane>
          <Allotment.Pane visible={isBottomPanelOpen} preferredSize={200} minSize={100}>
            <BottomPanel />
          </Allotment.Pane>
        </Allotment>
      </Allotment.Pane>
    </Allotment>
  </div>
  <StatusBar />
</div>
```

## 4. Feature Implementation Strategy

Each feature resides in `src/renderer/features/{feature-id}/index.ts`.

Example: `src/renderer/features/login/index.ts`

```typescript
import { featureRegistry } from '../../shell/FeatureRegistry';
import { User } from 'lucide-react';
import { LoginStatus } from './components/LoginStatus';

featureRegistry.register({
  id: 'login',
  name: 'Authentication',
  initialize: async (ctx) => {
    ctx.registerStatusBarItem({
      id: 'login-status',
      alignment: 'right',
      priority: 100,
      component: LoginStatus,
    });
  },
});
```
