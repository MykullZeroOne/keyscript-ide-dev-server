
import { registerFeature } from '../../shell/FeatureRegistry'
import { CodeEditor } from './CodeEditor'

export const registerEditorFeature = () => {
  registerFeature({
    id: 'editor',
    name: 'Editor',
    mainPanels: [
      {
        id: 'code-editor',
        render: () => <CodeEditor />
      }
    ]
  })
}
