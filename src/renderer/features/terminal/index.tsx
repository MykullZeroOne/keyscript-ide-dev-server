import { registerFeature } from '../../shell/FeatureRegistry'
import { TerminalView } from './TerminalView'

export function registerTerminalFeature() {
  registerFeature({
    id: 'terminal',
    name: 'Terminal',
    bottomTabs: [
      {
        id: 'terminal-tab',
        name: 'Terminal',
        render: () => <TerminalView />
      }
    ]
  })
}
