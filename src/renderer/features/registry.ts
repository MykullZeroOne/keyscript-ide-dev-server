import { useFeatureStore } from '../store/useFeatureStore';
import EditorFeature from './editor';
// Import other features as they are created
// import LoginFeature from './login';
// import ScriptExplorerFeature from './script-explorer';

export function registerAllFeatures() {
  const register = useFeatureStore.getState().registerFeature;

  register(EditorFeature);
  // register(LoginFeature);
  // register(ScriptExplorerFeature);
}
