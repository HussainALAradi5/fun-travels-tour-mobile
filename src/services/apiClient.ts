import { API_BASE_URL, REQUEST_TIMEOUT_MS } from "@/config/api.config";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import { ApiError } from "@/utilities/errors";
import { sessionStorage } from "@/utilities/secureStorage";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
let onUnauthorized: (() => void) | null = null;

/** Lets the auth provider sign the user out when the server rejects the token. */
export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

/** The single HTTP client: base URL, bearer token, timeout, and error mapping. */
export async function request<T>(method: Method, path: string, body?: unknown): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const token = await sessionStorage.token();
  try {
    const response = await fetch(API_BASE_URL + path, {
      method,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await response.text();
    const payload = text ? (JSON.parse(text) as ApiResponse<T>) : null;
    if (response.status === 401 && token) onUnauthorized?.();
    if (!response.ok || !payload?.success) {
      throw new ApiError(payload?.message ?? `Request failed (${response.status})`, response.status, payload?.code);
    }
    return payload.data;
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
};
