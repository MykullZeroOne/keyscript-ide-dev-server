import { useFeatureRegistry } from '../FeatureRegistry'

export const StatusBar = () => {
  const features = useFeatureRegistry((state) => state.features)

  // Collect all status bar items from features
  const statusBarItems = features.flatMap((f) => f.statusBarItems || [])
  const leftItems = statusBarItems.filter((i) => i.position !== 'right')
  const rightItems = statusBarItems.filter((i) => i.position === 'right')

  return (
    <div className="h-6 bg-[#007acc] text-white flex items-center px-4 shrink-0 select-none text-[12px] gap-4">
      <div className="flex-1 flex gap-4 overflow-hidden">
        {leftItems.map((item) => (
          <div key={item.id} className="flex items-center gap-1 shrink-0 overflow-hidden whitespace-nowrap">
            {item.render()}
          </div>
        ))}
      </div>

      <div className="flex gap-4 shrink-0">
        {rightItems.map((item) => (
          <div key={item.id} className="flex items-center gap-1">
            {item.render()}
          </div>
        ))}
      </div>
    </div>
  )
}
