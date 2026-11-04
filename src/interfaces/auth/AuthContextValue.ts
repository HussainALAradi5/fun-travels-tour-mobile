import type { LoginRequest } from "./LoginRequest";
import type { RegisterRequest } from "./RegisterRequest";
import type { User } from "../user/User";

export interface AuthContextValue {
  user: User | null;
  restoring: boolean;
  signIn: (request: LoginRequest) => Promise<void>;
  register: (request: RegisterRequest) => Promise<void>;
  signOut: () => Promise<void>;
  /** Stores a refreshed user (after a profile edit) without signing in again. */
  updateUser: (user: User) => Promise<void>;
}
