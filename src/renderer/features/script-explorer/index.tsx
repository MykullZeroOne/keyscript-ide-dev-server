
import { FileText } from 'lucide-react'
import { registerFeature } from '../../shell/FeatureRegistry'
import { FileTree } from './FileTree'
import { useEditorStore } from '../editor/EditorStore'

export const registerScriptExplorerFeature = () => {
  registerFeature({
    id: 'script-explorer',
    name: 'Explorer',
    sidebarPanels: [
      {
        id: 'script-explorer',
        name: 'Explorer',
        icon: FileText,
        render: () => {
          const { openFile } = useEditorStore()
          return (
            <FileTree onFileClick={(node) => {
              if (node.leaf && node.scriptPath) {
                // The scriptPath from server is like "sample-script.js"
                // We want to fetch it from the server.
                openFile(`scripts/${node.scriptPath}`, node.text)
              }
            }} />
          )
        }
      }
    ]
  })
}
