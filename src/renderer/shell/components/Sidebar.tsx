import { useFeatureRegistry } from '../FeatureRegistry'
import { useShellStore } from '../ShellStore'

export const Sidebar = () => {
  const features = useFeatureRegistry((state) => state.features)
  const { activeSidebarId } = useShellStore()

  const activePanel = features
    .flatMap((f) => f.sidebarPanels || [])
    .find((p) => p.id === activeSidebarId)

  if (!activeSidebarId || !activePanel) return null

  return (
    <div className="h-full bg-[#252526] flex flex-col min-w-0">
      <div className="h-8 flex items-center px-4 text-[11px] font-semibold text-[#bbbbbb] uppercase tracking-wide select-none shrink-0">
        {activePanel.name}
      </div>
      <div className="flex-1 overflow-auto min-w-0">
        {activePanel.render()}
      </div>
    </div>
  )
}
