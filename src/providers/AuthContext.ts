import { createContext } from "react";
import type { AuthContextValue } from "@/interfaces/auth/AuthContextValue";

export const AuthContext = createContext<AuthContextValue | null>(null);
