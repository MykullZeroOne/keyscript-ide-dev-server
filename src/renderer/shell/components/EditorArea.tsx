import { useFeatureRegistry } from '../FeatureRegistry'

export const EditorArea = () => {
  const features = useFeatureRegistry((state) => state.getFeatures())
  
  // Collect all main panels from features
  const mainPanels = features.flatMap((f) => f.mainPanels || [])
  
  if (mainPanels.length === 0) {
    return (
      <div className="h-full bg-gray-950 flex flex-col items-center justify-center text-gray-500 gap-4 select-none">
        <div className="text-4xl font-bold opacity-20">Keyscript IDE</div>
        <div className="text-sm">Select a script to open it</div>
      </div>
    )
  }
  
  // For now, let's just render the first main panel (monaco editor usually)
  // Later we can implement tabs
  return (
    <div className="h-full bg-gray-950">
      {mainPanels[0].render()}
    </div>
  )
}
