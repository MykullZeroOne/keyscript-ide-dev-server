
import { registerFeature } from '../../shell/FeatureRegistry'
import { LoginDialog } from './LoginDialog'
import { LoginStatusBar } from './LoginStatusBar'

export const registerLoginFeature = () => {
  registerFeature({
    id: 'login',
    name: 'Authentication',
    statusBarItems: [
      {
        id: 'login-status',
        render: () => <LoginStatusBar />,
        position: 'left'
      }
    ],
    overlays: [
      () => <LoginDialog />
    ]
  })
}
