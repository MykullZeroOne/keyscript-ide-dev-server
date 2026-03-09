import { X } from 'lucide-react'
import { useFeatureRegistry } from '../FeatureRegistry'
import { useShellStore } from '../ShellStore'

export const BottomPanel = () => {
  const features = useFeatureRegistry((state) => state.features)
  const { activeBottomTabId, setActiveBottomTabId, toggleBottomPanel, isBottomPanelVisible } =
    useShellStore()

  const bottomTabs = features.flatMap((f) => f.bottomTabs || [])
  const activeTab = bottomTabs.find((t) => t.id === activeBottomTabId)

  if (!isBottomPanelVisible || bottomTabs.length === 0) return null

  return (
    <div className="h-full bg-[#1e1e1e] border-t border-[#414141] flex flex-col min-w-0 select-none">
      <div className="h-8 flex items-center px-3 shrink-0 gap-4">
        <div className="flex-1 flex gap-4 h-full items-center text-[11px] font-medium">
          {bottomTabs.map((tab) => {
            const isActive = activeBottomTabId === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveBottomTabId(tab.id)}
                className={`h-full border-b cursor-pointer transition-colors uppercase tracking-wide text-[10px] ${
                  isActive
                    ? 'text-white border-white'
                    : 'text-[#858585] hover:text-[#cccccc] border-transparent'
                }`}
              >
                {tab.name}
              </button>
            )
          })}
        </div>
        <button
          onClick={toggleBottomPanel}
          className="p-1 hover:bg-[#383838] rounded text-[#858585] hover:text-white cursor-pointer"
          title="Close Panel"
        >
          <X size={14} />
        </button>
      </div>
      <div className="flex-1 overflow-auto min-w-0">
        {activeTab ? (
          activeTab.render()
        ) : (
          <div className="h-full flex items-center justify-center text-[#858585] italic text-xs">
            No tab selected
          </div>
        )}
      </div>
    </div>
  )
}
