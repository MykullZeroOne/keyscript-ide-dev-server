import { useFeatureRegistry } from '../FeatureRegistry'

export const Toolbar = () => {
  const features = useFeatureRegistry((state) => state.getFeatures())
  
  // Collect all toolbar items from features
  const toolbarItems = features.flatMap((f) => f.toolbarItems || [])
  const leftItems = toolbarItems.filter((i) => i.position !== 'right')
  const rightItems = toolbarItems.filter((i) => i.position === 'right')
  
  return (
    <div className="h-9 bg-gray-900 border-b border-gray-800 flex items-center px-4 shrink-0 select-none gap-4">
      <div className="flex-1 flex gap-2 overflow-hidden items-center">
        {leftItems.map((item) => (
          <div key={item.id} className="flex items-center gap-1 shrink-0 overflow-hidden whitespace-nowrap">
            {item.render()}
          </div>
        ))}
      </div>
      
      <div className="flex gap-2 shrink-0 items-center">
        {rightItems.map((item) => (
          <div key={item.id} className="flex items-center gap-1">
            {item.render()}
          </div>
        ))}
      </div>
    </div>
  )
}
