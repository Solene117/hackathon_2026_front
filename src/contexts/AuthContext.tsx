import { useEffect, type ReactNode } from "react";
import { useAuthStore, useAuth, getAuthErrorMessage } from "../stores/authStore";

export { useAuth, getAuthErrorMessage };

export function AuthProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    void useAuthStore.getState().initialize();
  }, []);

  return children;
}
