import { create } from 'zustand'
import { useAuthStore } from '../../store/useAuthStore'

interface ScriptOptionsState {
  personSerial: string
  accountSerial: string
  instance: string

  setPersonSerial: (value: string) => void
  setAccountSerial: (value: string) => void
  setInstance: (value: string) => void

  getScriptParameters: () => {
    crlogin: Record<string, string>
    crscript: Record<string, string>
  }
}

export const useScriptOptionsStore = create<ScriptOptionsState>((set, get) => ({
  personSerial: '',
  accountSerial: '',
  instance: '',

  setPersonSerial: (value) => set({ personSerial: value }),
  setAccountSerial: (value) => set({ accountSerial: value }),
  setInstance: (value) => set({ instance: value }),

  getScriptParameters: () => {
    const { personSerial, accountSerial, instance } = get()
    const auth = useAuthStore.getState()
    // Spread the full login response into crlogin so the CR framework
    // gets postingDate, locationName, databaseName, userSerial, etc.
    const loginFields: Record<string, string> = {}
    if (auth.loginData) {
      for (const [key, value] of Object.entries(auth.loginData)) {
        if (value !== null && value !== undefined) {
          loginFields[key] = String(value)
        }
      }
    }
    return {
      crlogin: {
        ...loginFields,
        instance,
        userName: auth.username || '',
        JSESSIONID: auth.jsessionId || '',
        isLoggedIn: auth.isLoggedIn ? 'true' : 'false'
      },
      crscript: {
        personSerial,
        accountSerial,
        scriptDefaultPanelId: 'ks-script-panel',
        scriptPanelId: 'ks-script-panel',
        hostPanelId: 'ks-host-panel'
      }
    }
  }
}))
