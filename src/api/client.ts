const TOKEN_KEY = "access_token";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export type ApiOptions = RequestInit & {
  timeoutMs?: number;
};

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json();
    if (Array.isArray(body.message)) return body.message.join(", ");
    if (typeof body.message === "string") return body.message;
  } catch {
    /* ignore */
  }
  return response.statusText || "Une erreur est survenue";
}

export async function api<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const { timeoutMs, signal: externalSignal, ...fetchOptions } = options;
  const token = getToken();
  const headers = new Headers(fetchOptions.headers);
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "";

  if (!headers.has("Content-Type") && fetchOptions.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const controller = new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const abort = () => controller.abort();

  if (timeoutMs) {
    timeoutId = setTimeout(abort, timeoutMs);
  }

  if (externalSignal) {
    externalSignal.addEventListener("abort", abort);
  }

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ApiError(response.status, await parseErrorMessage(response));
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError(
        408,
        "L'analyse IA a pris trop de temps. Réessayez dans quelques instants.",
      );
    }

    throw error;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}
