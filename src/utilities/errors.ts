import { MESSAGES } from "@/constants/messages";

/** Error carrying the server's error code and message. */
export class ApiError extends Error {
  constructor(message: string, public readonly status: number, public readonly code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

export function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error && error.name === "AbortError") return MESSAGES.networkError;
  if (error instanceof TypeError) return MESSAGES.networkError;
  return MESSAGES.genericError;
}
