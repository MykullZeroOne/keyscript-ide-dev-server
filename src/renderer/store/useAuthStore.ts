import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  instance: string | null;
  jsessionId: string | null;
  setLogin: (username: string, instance: string, jsessionId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  username: null,
  instance: null,
  jsessionId: null,
  setLogin: (username, instance, jsessionId) => set({
    isLoggedIn: true,
    username,
    instance,
    jsessionId
  }),
  logout: () => set({
    isLoggedIn: false,
    username: null,
    instance: null,
    jsessionId: null
  })
}));
