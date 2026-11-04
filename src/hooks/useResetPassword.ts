import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { MESSAGES } from "@/constants/messages";
import { authService } from "@/services/authService";
import { useAction } from "./useAction";

const MIN_PASSWORD = 6;

/** Sets a new password with the code from the reset email. */
export function useResetPassword(initialEmail = "", initialToken = "") {
  const [email, setEmail] = useState(initialEmail);
  const [token, setToken] = useState(initialToken);
  const [password, setPassword] = useState("");
  const { pending, run } = useAction();
  const passwordError = password && password.length < MIN_PASSWORD ? `At least ${MIN_PASSWORD} characters` : undefined;
  const canSubmit = Boolean(email.trim() && token.trim() && password && !passwordError);
  const submit = () => run(async () => {
    await authService.confirmPasswordReset({ identifier: email.trim(), token: token.trim(), newPassword: password });
    Alert.alert(MESSAGES.resetDone);
    router.replace("/(auth)/login");
  });
  return { email, setEmail, token, setToken, password, setPassword, passwordError, canSubmit, submit, pending };
}
