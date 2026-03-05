import { FeatureDefinition } from '../types';
import ConsoleTab from './ConsoleTab';

const ConsoleFeature: FeatureDefinition = {
  id: 'console',
  name: 'Console',
  bottomTabs: [
    {
      id: 'console',
      label: 'Console',
      component: ConsoleTab,
    },
  ],
};

export default ConsoleFeature;
