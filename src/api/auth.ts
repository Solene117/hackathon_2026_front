import { api, clearToken, setToken } from "./client";
import type { LoginPayload, LoginResponse, RegisterPayload, User } from "../types/user";

export async function login(payload: LoginPayload): Promise<User> {
  const { access_token } = await api<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  setToken(access_token);
  return fetchCurrentUser();
}

export async function register(payload: RegisterPayload): Promise<User> {
  await api<User>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return login({ mail: payload.mail, password: payload.password });
}

export async function fetchCurrentUser(): Promise<User> {
  return api<User>("/api/auth/me");
}

export function logout(): void {
  clearToken();
}

export function getStravaConnectUrl(): Promise<{ authorizationUrl: string }> {
  return api<{ authorizationUrl: string }>("/api/auth/strava/connect");
}
