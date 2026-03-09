import { useFeatureRegistry } from '../FeatureRegistry'

export const EditorArea = () => {
  const features = useFeatureRegistry((state) => state.features)

  // Collect all main panels from features
  const mainPanels = features.flatMap((f) => f.mainPanels || [])

  if (mainPanels.length === 0) {
    return (
      <div className="h-full bg-[#1e1e1e] flex flex-col items-center justify-center text-[#858585] gap-4 select-none">
        <div className="text-4xl font-bold opacity-20">Keyscript IDE</div>
        <div className="text-sm">Select a script to open it</div>
      </div>
    )
  }

  return (
    <div className="h-full bg-[#1e1e1e]">
      {mainPanels[0].render()}
    </div>
  )
}
