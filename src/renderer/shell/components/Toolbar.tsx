import { useFeatureRegistry } from '../FeatureRegistry'

export const Toolbar = () => {
  const features = useFeatureRegistry((state) => state.features)

  const toolbarItems = features.flatMap((f) => f.toolbarItems || [])
  const leftItems = toolbarItems.filter((i) => i.position !== 'right')
  const rightItems = toolbarItems.filter((i) => i.position === 'right')

  return (
    <div className="h-8 bg-[#323233] flex items-center px-3 shrink-0 select-none gap-3 border-b border-[#252526]">
      <span className="text-[11px] font-semibold text-[#cccccc] mr-2">KeyScript IDE</span>

      <div className="flex-1 flex gap-2 items-center">
        {leftItems.map((item) => (
          <div key={item.id}>{item.render()}</div>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        {rightItems.map((item) => (
          <div key={item.id}>{item.render()}</div>
        ))}
      </div>
    </div>
  )
}
