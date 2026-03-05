import { FeatureDefinition } from '../types';
import InspectorTab from './InspectorTab';

const InspectorFeature: FeatureDefinition = {
  id: 'inspector',
  name: 'Inspector',
  bottomTabs: [
    {
      id: 'inspector',
      label: 'Inspector',
      component: InspectorTab,
    },
  ],
};

export default InspectorFeature;
