import { X } from 'lucide-react'
import { useFeatureRegistry } from '../FeatureRegistry'
import { useShellStore } from '../ShellStore'

export const BottomPanel = () => {
  const features = useFeatureRegistry((state) => state.getFeatures())
  const { activeBottomTabId, setActiveBottomTabId, toggleBottomPanel, isBottomPanelVisible } = useShellStore()
  
  // Collect all bottom tabs from features
  const bottomTabs = features.flatMap((f) => f.bottomTabs || [])
  
  const activeTab = bottomTabs.find((t) => t.id === activeBottomTabId)
  
  if (!isBottomPanelVisible || bottomTabs.length === 0) return null
  
  return (
    <div className="h-full bg-gray-900 border-t border-gray-800 flex flex-col min-w-0 select-none">
      <div className="h-9 flex items-center px-4 shrink-0 border-b border-gray-800 gap-6">
        <div className="flex-1 flex gap-6 h-full items-center uppercase text-[11px] font-bold text-gray-500 tracking-wider">
          {bottomTabs.map((tab) => {
            const isActive = activeBottomTabId === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveBottomTabId(tab.id)}
                className={`h-full border-b-2 cursor-pointer transition-colors ${
                  isActive ? 'text-white border-white' : 'text-gray-500 hover:text-gray-300 border-transparent'
                }`}
              >
                {tab.name}
              </button>
            )
          })}
        </div>
        <button
          onClick={toggleBottomPanel}
          className="p-1 hover:bg-gray-800 rounded text-gray-500 hover:text-gray-300 cursor-pointer"
          title="Close Panel"
        >
          <X size={14} />
        </button>
      </div>
      <div className="flex-1 overflow-auto min-w-0">
        {activeTab ? activeTab.render() : (
          <div className="h-full flex items-center justify-center text-gray-500 italic text-sm">
            No tab selected
          </div>
        )}
      </div>
    </div>
  )
}
