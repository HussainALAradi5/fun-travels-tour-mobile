import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "./useAuth";
import { useAction } from "./useAction";

export function useLoginForm() {
  const { signIn } = useAuth();
  const { pending, run } = useAction();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = identifier.trim().length > 0 && password.length > 0;
  const submit = () => run(async () => {
    await signIn({ identifier: identifier.trim(), password });
    router.replace("/(tabs)/tours");
  });
  return { identifier, setIdentifier, password, setPassword, canSubmit, pending, submit };
}
