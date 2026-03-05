import { useFeatureStore } from '../store/useFeatureStore';
import EditorFeature from './editor';
import LoginFeature from './login';
// import ScriptExplorerFeature from './script-explorer';

export function registerAllFeatures() {
  const register = useFeatureStore.getState().registerFeature;

  register(LoginFeature);
  register(EditorFeature);
  // register(ScriptExplorerFeature);
}
