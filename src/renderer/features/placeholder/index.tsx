import { registerFeature } from '../../shell/FeatureRegistry'

export const registerPlaceholderFeature = () => {
  registerFeature({
    id: 'placeholder',
    name: 'Placeholder Feature',
    sidebarPanels: [],
    bottomTabs: [],
    toolbarItems: [],
    statusBarItems: [
      {
        id: 'branch',
        position: 'right',
        render: () => <div className="flex items-center gap-1 font-mono text-gray-500">main</div>
      }
    ]
  })
}
