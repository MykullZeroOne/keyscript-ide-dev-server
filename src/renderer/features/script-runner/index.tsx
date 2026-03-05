import { FeatureDefinition } from '../types';
import RunButton from './RunButton';

const ScriptRunnerFeature: FeatureDefinition = {
  id: 'script-runner',
  name: 'Script Runner',
  toolbarItems: [
    {
      id: 'run-button',
      component: RunButton
    }
  ]
};

export default ScriptRunnerFeature;
