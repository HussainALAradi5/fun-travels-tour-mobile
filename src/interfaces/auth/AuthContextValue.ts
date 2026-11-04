import type { LoginRequest } from "./LoginRequest";
import type { RegisterRequest } from "./RegisterRequest";
import type { User } from "../user/User";

export interface AuthContextValue {
  user: User | null;
  restoring: boolean;
  signIn: (request: LoginRequest) => Promise<void>;
  register: (request: RegisterRequest) => Promise<void>;
  signOut: () => Promise<void>;
}
