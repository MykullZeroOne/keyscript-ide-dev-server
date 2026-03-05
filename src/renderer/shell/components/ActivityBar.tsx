import { Settings, User } from 'lucide-react'
import { useFeatureRegistry } from '../FeatureRegistry'
import { useShellStore } from '../ShellStore'

export const ActivityBar = () => {
  const features = useFeatureRegistry((state) => state.getFeatures())
  const { activeSidebarId, setActiveSidebarId } = useShellStore()
  
  // Collect all sidebar panels from features
  const sidebarPanels = features.flatMap((f) => f.sidebarPanels || [])
  
  return (
    <div className="w-12 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4 flex-shrink-0 select-none">
      <div className="flex-1 flex flex-col items-center gap-4">
        {sidebarPanels.map((panel) => {
          const Icon = panel.icon
          const isActive = activeSidebarId === panel.id
          
          return (
            <button
              key={panel.id}
              onClick={() => setActiveSidebarId(isActive ? null : panel.id)}
              className={`p-2 rounded cursor-pointer transition-colors ${
                isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
              title={panel.name}
            >
              <Icon size={24} strokeWidth={1.5} />
            </button>
          )
        })}
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <button className="p-2 text-gray-500 hover:text-gray-300 cursor-pointer">
          <User size={24} strokeWidth={1.5} />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-300 cursor-pointer">
          <Settings size={24} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
