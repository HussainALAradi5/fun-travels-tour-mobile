import { useState } from "react";
import { Alert, Text } from "react-native";
import { Button } from "@/components/common/Button";
import { Screen } from "@/components/common/Screen";
import { TextField } from "@/components/common/TextField";
import { MESSAGES } from "@/constants/messages";
import { useAction } from "@/hooks/useAction";
import { useTheme } from "@/hooks/useTheme";
import { authService } from "@/services/authService";

export default function ForgotPasswordScreen() {
  const theme = useTheme();
  const { pending, run } = useAction();
  const [email, setEmail] = useState("");
  const send = () => run(async () => {
    await authService.requestPasswordReset(email.trim());
    Alert.alert("Check your inbox", MESSAGES.resetSent);
  });
  return (
    <Screen>
      <Text style={{ color: theme.text }}>We will email a reset link. Open it on any device to choose a new password.</Text>
      <TextField label="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Button label="Send reset link" onPress={send} disabled={!email.trim()} loading={pending} />
    </Screen>
  );
}
