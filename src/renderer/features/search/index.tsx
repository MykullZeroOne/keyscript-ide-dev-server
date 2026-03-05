
import { Search } from 'lucide-react'
import { registerFeature } from '../../shell/FeatureRegistry'
import { SearchPanel } from './SearchPanel'

export const registerSearchFeature = () => {
  registerFeature({
    id: 'search',
    name: 'Search',
    sidebarPanels: [
      {
        id: 'search-panel',
        name: 'Search',
        icon: Search,
        render: () => <SearchPanel />
      }
    ]
  })
}
