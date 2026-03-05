import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { create } from 'zustand'

export interface SidebarPanel {
  id: string
  name: string
  icon: LucideIcon
  render: () => ReactNode
}

export interface BottomTab {
  id: string
  name: string
  render: () => ReactNode
}

export interface ToolbarItem {
  id: string
  render: () => ReactNode
  position?: 'left' | 'right'
}

export interface StatusBarItem {
  id: string
  render: () => ReactNode
  position?: 'left' | 'right'
}

export interface MainPanel {
  id: string
  render: () => ReactNode
}

export interface FeatureContext {
  // We can expand this later with API calls, IPC, etc.
}

export interface FeatureDefinition {
  id: string
  name: string
  requires?: string[]
  initialize?: (ctx: FeatureContext) => Promise<void>
  sidebarPanels?: SidebarPanel[]
  bottomTabs?: BottomTab[]
  toolbarItems?: ToolbarItem[]
  statusBarItems?: StatusBarItem[]
  mainPanels?: MainPanel[]
  overlays?: (() => ReactNode)[]
}

interface FeatureRegistryState {
  features: Map<string, FeatureDefinition>
  registerFeature: (feature: FeatureDefinition) => void
  getFeatures: () => FeatureDefinition[]
}

export const useFeatureRegistry = create<FeatureRegistryState>((set, get) => ({
  features: new Map(),
  registerFeature: (feature) => {
    set((state) => {
      const newFeatures = new Map(state.features)
      newFeatures.set(feature.id, feature)
      return { features: newFeatures }
    })
  },
  getFeatures: () => Array.from(get().features.values())
}))

export const registerFeature = (feature: FeatureDefinition) => {
  useFeatureRegistry.getState().registerFeature(feature)
}
