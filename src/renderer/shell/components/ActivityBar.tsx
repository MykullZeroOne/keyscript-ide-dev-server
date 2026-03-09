import { Settings, User } from 'lucide-react'
import { useFeatureRegistry } from '../FeatureRegistry'
import { useShellStore } from '../ShellStore'
import { useAuthStore } from '../../store/useAuthStore'

export const ActivityBar = () => {
  const features = useFeatureRegistry((state) => state.features)
  const { activeSidebarId, setActiveSidebarId } = useShellStore()
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  const sidebarPanels = features.flatMap((f) => f.sidebarPanels || [])
  const topPanels = sidebarPanels.filter((p) => p.id !== 'settings' && p.id !== 'user-info')
  const settingsPanel = sidebarPanels.find((p) => p.id === 'settings')
  const userPanel = sidebarPanels.find((p) => p.id === 'user-info')

  const renderButton = (panelId: string, icon: React.ReactNode, title: string, badge?: React.ReactNode) => {
    const isActive = activeSidebarId === panelId
    return (
      <button
        key={panelId}
        onClick={() => setActiveSidebarId(isActive ? null : panelId)}
        className={`w-10 h-10 flex items-center justify-center rounded cursor-pointer transition-colors relative ${
          isActive ? 'text-white' : 'text-[#858585] hover:text-white'
        }`}
        title={title}
      >
        {isActive && (
          <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-white rounded-r" />
        )}
        {icon}
        {badge}
      </button>
    )
  }

  return (
    <div className="w-12 bg-[#252526] flex flex-col items-center py-2 flex-shrink-0 select-none border-r border-[#1e1e1e]">
      <div className="flex-1 flex flex-col items-center gap-1">
        {topPanels.map((panel) => {
          const Icon = panel.icon
          return renderButton(panel.id, <Icon size={22} strokeWidth={1.5} />, panel.name)
        })}
      </div>

      <div className="flex flex-col items-center gap-1">
        {userPanel && renderButton(
          'user-info',
          <User size={22} strokeWidth={1.5} />,
          'User Info',
          isLoggedIn ? (
            <span className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4ec9b0] ring-1 ring-[#252526]" />
          ) : null
        )}
        {settingsPanel && renderButton('settings', <Settings size={22} strokeWidth={1.5} />, 'Settings')}
      </div>
    </div>
  )
}
