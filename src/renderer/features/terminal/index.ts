import { FeatureDefinition } from '../types';
import TerminalTab from './TerminalTab';

const TerminalFeature: FeatureDefinition = {
  id: 'terminal',
  name: 'Terminal',
  bottomTabs: [
    {
      id: 'terminal',
      label: 'Terminal',
      component: TerminalTab,
    },
  ],
};

export default TerminalFeature;
