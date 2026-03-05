import React from 'react';

export interface SidebarPanel {
  id: string;
  icon: React.ReactNode;
  label: string;
  component: React.ComponentType;
}

export interface BottomTab {
  id: string;
  label: string;
  component: React.ComponentType;
}

export interface ToolbarItem {
  id: string;
  component: React.ComponentType;
}

export interface StatusBarItem {
  id: string;
  alignment: 'left' | 'right';
  component: React.ComponentType;
}

export interface FeatureContext {
  setActiveSidebarPanel: (id: string) => void;
  openEditor: (id: string, path: string, label: string) => void;
  runScript: (path: string, paramsId: string) => void;
}

export interface FeatureDefinition {
  id: string;
  name: string;
  requires?: string[];
  initialize?: (ctx: FeatureContext) => Promise<void>;
  sidebarPanels?: SidebarPanel[];
  bottomTabs?: BottomTab[];
  toolbarItems?: ToolbarItem[];
  statusBarItems?: StatusBarItem[];
}
