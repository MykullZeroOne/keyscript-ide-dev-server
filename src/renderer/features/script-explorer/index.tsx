import React from 'react';
import { Files } from 'lucide-react';
import { FeatureDefinition } from '../types';
import { ScriptExplorerPanel } from './ScriptExplorerPanel';

const ScriptExplorerFeature: FeatureDefinition = {
  id: 'script-explorer',
  name: 'Script Explorer',
  sidebarPanels: [
    {
      id: 'script-explorer',
      icon: <Files size={18} />,
      label: 'Script Explorer',
      component: ScriptExplorerPanel
    }
  ]
};

export default ScriptExplorerFeature;
