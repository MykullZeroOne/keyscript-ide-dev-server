
import { registerFeature } from '../../shell/FeatureRegistry'
import { ConsoleView } from './ConsoleView'
import { InspectorView } from './InspectorView'

export const registerConsoleInspectorFeature = () => {
  registerFeature({
    id: 'console-inspector',
    name: 'Console & Inspector',
    bottomTabs: [
      {
        id: 'console',
        name: 'Console',
        render: () => <ConsoleView />
      },
      {
        id: 'inspector',
        name: 'Inspector',
        render: () => <InspectorView />
      }
    ]
  })
}
