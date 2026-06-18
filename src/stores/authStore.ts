import { create } from "zustand";
import * as authApi from "../api/auth";
import { ApiError, getToken } from "../api/client";
import type { RegisterPayload, User } from "../types/user";
import { bootstrapAuthenticatedData, resetAllStores } from "./index";

type AuthState = {
  user: User | null;
  isLoading: boolean;
  initialize: () => Promise<void>;
  login: (mail: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  refreshUser: () => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  initialize: async () => {
    set({ isLoading: true });

    if (!getToken()) {
      set({ user: null, isLoading: false });
      return;
    }

    try {
      const user = await authApi.fetchCurrentUser();
      set({ user, isLoading: false });
      await bootstrapAuthenticatedData();
    } catch {
      authApi.logout();
      resetAllStores();
      set({ user: null, isLoading: false });
    }
  },

  login: async (mail, password) => {
    const user = await authApi.login({ mail, password });
    set({ user });
    await bootstrapAuthenticatedData();
  },

  register: async (payload) => {
    const user = await authApi.register(payload);
    set({ user });
    await bootstrapAuthenticatedData();
  },

  refreshUser: async () => {
    if (!getToken()) return;

    try {
      set({ user: await authApi.fetchCurrentUser() });
    } catch {
      /* conserve l'utilisateur courant si le rafraîchissement échoue */
    }
  },

  logout: () => {
    authApi.logout();
    resetAllStores();
    set({ user: null, isLoading: false });
  },
}));

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const refreshUser = useAuthStore((state) => state.refreshUser);
  const logout = useAuthStore((state) => state.logout);

  return {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    register,
    refreshUser,
    logout,
  };
}

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Une erreur est survenue";
}
