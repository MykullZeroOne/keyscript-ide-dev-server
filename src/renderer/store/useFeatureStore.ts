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
  runScript: (path: string, paramsId?: string) => void;
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
          runScript: (path: string, paramsId?: string) => get().runScript(path, paramsId)
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

  runScript: (path, paramsId) => {
    const { openTabs } = get();
    const label = `Preview: ${path.split('/').pop()}`;
    const id = `preview-${path}`;
    const existing = openTabs.find(t => t.id === id);
    
    // Construct URL with optional paramsId
    let previewPath = path;
    if (paramsId) {
      previewPath += `&scriptParametersId=${paramsId}`;
    }

    if (existing) {
      // Update existing preview tab with new path/params if needed
      set((state) => ({
        openTabs: state.openTabs.map(t => t.id === id ? { ...t, path: previewPath } : t),
        activeTabId: id
      }));
    } else {
      set({ 
        openTabs: [...openTabs, { id, path: previewPath, label, type: 'preview' }],
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
