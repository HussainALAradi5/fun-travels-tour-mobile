import { useCallback, useEffect, useMemo, useState } from "react";
import type { AuthContextValue } from "@/interfaces/auth/AuthContextValue";
import type { LoginRequest } from "@/interfaces/auth/LoginRequest";
import type { RegisterRequest } from "@/interfaces/auth/RegisterRequest";
import type { User } from "@/interfaces/user/User";
import { setUnauthorizedHandler } from "@/services/apiClient";
import { authService } from "@/services/authService";
import { sessionStorage } from "@/utilities/secureStorage";

/** Session state backed by platform secure storage. */
export function useAuthSession(): AuthContextValue {
  const [user, setUser] = useState<User | null>(null);
  const [restoring, setRestoring] = useState(true);

  const signOut = useCallback(async () => {
    await sessionStorage.clear();
    setUser(null);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => void signOut());
    (async () => {
      const [token, stored] = await Promise.all([sessionStorage.token(), sessionStorage.user()]);
      if (token && stored) setUser(JSON.parse(stored) as User);
      setRestoring(false);
    })();
    return () => setUnauthorizedHandler(null);
  }, [signOut]);

  const signIn = useCallback(async (request: LoginRequest) => {
    const session = await authService.login(request);
    await sessionStorage.save(session.token, JSON.stringify(session.user));
    setUser(session.user);
  }, []);

  const register = useCallback(async (request: RegisterRequest) => {
    await authService.register(request);
    await signIn({ identifier: request.email, password: request.password });
  }, [signIn]);

  const updateUser = useCallback(async (next: User) => {
    const token = await sessionStorage.token();
    if (token) await sessionStorage.save(token, JSON.stringify(next));
    setUser(next);
  }, []);

  return useMemo(() => ({ user, restoring, signIn, register, signOut, updateUser }),
    [user, restoring, signIn, register, signOut, updateUser]);
}
