import { ENDPOINTS } from "@/config/endpoints";
import type { AuthSession } from "@/interfaces/auth/AuthSession";
import type { LoginRequest } from "@/interfaces/auth/LoginRequest";
import type { RegisterRequest } from "@/interfaces/auth/RegisterRequest";
import type { User } from "@/interfaces/user/User";
import type { PasswordResetConfirmRequestDto } from "@/dtos/auth/PasswordResetConfirmRequestDto";
import { api } from "./apiClient";

export const authService = {
  login: (request: LoginRequest) => api.post<AuthSession>(ENDPOINTS.auth.login, request),
  register: (request: RegisterRequest) => api.post<User>(ENDPOINTS.auth.register, request),
  confirmPasswordReset: (request: PasswordResetConfirmRequestDto) =>
    api.post<User>(ENDPOINTS.auth.passwordResetConfirm, request),
  requestPasswordReset: (email: string) =>
    api.post<string>(ENDPOINTS.auth.passwordResetRequest, { identifier: email }),
  profile: (id: number) => api.get<User>(ENDPOINTS.users.byId(id)),
};
