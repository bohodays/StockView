import { create } from "zustand";

interface AuthState {
  isLogined: boolean;
  email: string | null;
  nickname: string | null;
  setAuth: (email: string, nickname: string) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogined: false,
  email: null,
  nickname: null,
  setAuth: (email, nickname) => set({ isLogined: true, email, nickname }),
  resetAuth: () => set({ isLogined: false, email: null, nickname: null }),
}));
