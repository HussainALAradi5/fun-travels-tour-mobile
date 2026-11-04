import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { Button } from "@/components/common/Button";
import { Screen } from "@/components/common/Screen";
import { TextField } from "@/components/common/TextField";
import { useResetPassword } from "@/hooks/useResetPassword";
import { useTheme } from "@/hooks/useTheme";

export default function ResetPasswordScreen() {
  const theme = useTheme();
  const params = useLocalSearchParams<{ email?: string; token?: string }>();
  const form = useResetPassword(params.email ?? "", params.token ?? "");
  return (
    <Screen>
      <Text style={{ color: theme.text }}>Enter the code from the reset email and choose a new password.</Text>
      <TextField label="Email" autoCapitalize="none" keyboardType="email-address" value={form.email} onChangeText={form.setEmail} />
      <TextField label="Reset code" autoCapitalize="none" value={form.token} onChangeText={form.setToken} />
      <TextField label="New password" secureTextEntry value={form.password} onChangeText={form.setPassword} error={form.passwordError} />
      <Button label="Change password" onPress={form.submit} disabled={!form.canSubmit} loading={form.pending} />
    </Screen>
  );
}
