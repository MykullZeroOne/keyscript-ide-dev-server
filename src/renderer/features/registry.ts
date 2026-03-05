import { useFeatureStore } from '../store/useFeatureStore';
import EditorFeature from './editor';
import LoginFeature from './login';
import ScriptExplorerFeature from './script-explorer';
import ScriptRunnerFeature from './script-runner';
import TerminalFeature from './terminal';
import ConsoleFeature from './console';
import InspectorFeature from './inspector';

export function registerAllFeatures() {
  const register = useFeatureStore.getState().registerFeature;

  register(LoginFeature);
  register(EditorFeature);
  register(ScriptExplorerFeature);
  register(ScriptRunnerFeature);
  register(TerminalFeature);
  register(ConsoleFeature);
  register(InspectorFeature);
}
