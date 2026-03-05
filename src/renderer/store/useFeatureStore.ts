import { create } from 'zustand';
import { FeatureDefinition, SidebarPanel, BottomTab, ToolbarItem, StatusBarItem } from '../features/types';

interface EditorTab {
  id: string;
  path: string;
  label: string;
  type: 'editor' | 'preview';
}

interface FeatureState {
  features: FeatureDefinition[];
  sidebarPanels: SidebarPanel[];
  bottomTabs: BottomTab[];
  toolbarItems: ToolbarItem[];
  statusBarItems: StatusBarItem[];
  
  openTabs: EditorTab[];
  activeTabId: string | null;
  
  registerFeature: (feature: FeatureDefinition) => void;
  initializeFeatures: () => Promise<void>;
  openEditor: (id: string, path: string, label: string) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
}

export const useFeatureStore = create<FeatureState>((set, get) => ({
  features: [],
  sidebarPanels: [],
  bottomTabs: [],
  toolbarItems: [],
  statusBarItems: [],
  
  openTabs: [],
  activeTabId: null,

  registerFeature: (feature) => {
    set((state) => ({
      features: [...state.features, feature],
      sidebarPanels: [...state.sidebarPanels, ...(feature.sidebarPanels || [])],
      bottomTabs: [...state.bottomTabs, ...(feature.bottomTabs || [])],
      toolbarItems: [...state.toolbarItems, ...(feature.toolbarItems || [])],
      statusBarItems: [...state.statusBarItems, ...(feature.statusBarItems || [])],
    }));
  },

  initializeFeatures: async () => {
    // Logic to initialize features in order if dependencies exist
    const { features } = get();
    for (const feature of features) {
      if (feature.initialize) {
        const ctx: FeatureContext = {
          setActiveSidebarPanel: (id: string) => {}, // Implement in shell context or here
          openEditor: (id: string, path: string, label: string) => get().openEditor(id, path, label),
          runScript: (path: string, paramsId: string) => {} // Handle later
        };
        await feature.initialize(ctx);
      }
    }
  },

  openEditor: (id, path, label) => {
    const { openTabs } = get();
    const existing = openTabs.find(t => t.id === id);
    if (existing) {
      set({ activeTabId: id });
    } else {
      set({ 
        openTabs: [...openTabs, { id, path, label, type: 'editor' }],
        activeTabId: id
      });
    }
  },

  closeTab: (id) => {
    set((state) => {
      const openTabs = state.openTabs.filter(t => t.id !== id);
      const activeTabId = state.activeTabId === id ? (openTabs[0]?.id || null) : state.activeTabId;
      return { openTabs, activeTabId };
    });
  },

  setActiveTab: (id) => set({ activeTabId: id })
}));
