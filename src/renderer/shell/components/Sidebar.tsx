import { useFeatureRegistry } from '../FeatureRegistry'
import { useShellStore } from '../ShellStore'

export const Sidebar = () => {
  const features = useFeatureRegistry((state) => state.getFeatures())
  const { activeSidebarId } = useShellStore()
  
  const activePanel = features
    .flatMap((f) => f.sidebarPanels || [])
    .find((p) => p.id === activeSidebarId)
  
  if (!activeSidebarId || !activePanel) return null
  
  return (
    <div className="h-full bg-gray-900 border-r border-gray-800 flex flex-col min-w-0">
      <div className="h-9 flex items-center px-4 uppercase text-[11px] font-bold text-gray-500 tracking-wider select-none shrink-0 border-b border-gray-800">
        {activePanel.name}
      </div>
      <div className="flex-1 overflow-auto min-w-0">
        {activePanel.render()}
      </div>
    </div>
  )
}
