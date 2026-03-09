import { create } from 'zustand';

interface LoginResponse {
  userName?: string
  userSerial?: string
  JSESSIONID?: string
  databaseName?: string
  locationName?: string
  postingDate?: string
  deviceName?: string
  [key: string]: unknown
}

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  instance: string | null;
  jsessionId: string | null;
  loginData: LoginResponse | null;
  setLogin: (username: string, instance: string, jsessionId: string, loginData?: LoginResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  username: null,
  instance: null,
  jsessionId: null,
  loginData: null,
  setLogin: (username, instance, jsessionId, loginData) => set({
    isLoggedIn: true,
    username,
    instance,
    jsessionId,
    loginData: loginData || null
  }),
  logout: () => set({
    isLoggedIn: false,
    username: null,
    instance: null,
    jsessionId: null,
    loginData: null
  })
}));
