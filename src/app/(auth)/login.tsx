import { Link } from "expo-router";
import { Text } from "react-native";
import { Button } from "@/components/common/Button";
import { Screen } from "@/components/common/Screen";
import { TextField } from "@/components/common/TextField";
import { useLoginForm } from "@/hooks/useLoginForm";
import { useTheme } from "@/hooks/useTheme";

export default function LoginScreen() {
  const theme = useTheme();
  const form = useLoginForm();
  return (
    <Screen>
      <Text style={{ color: theme.text, fontSize: 26, fontWeight: "800" }}>Welcome back</Text>
      <TextField label="Email, username, or mobile" autoCapitalize="none" autoComplete="username"
        value={form.identifier} onChangeText={form.setIdentifier} />
      <TextField label="Password" secureTextEntry autoComplete="password" value={form.password} onChangeText={form.setPassword}
        onSubmitEditing={form.submit} />
      <Button label="Sign in" onPress={form.submit} disabled={!form.canSubmit} loading={form.pending} />
      <Link href="/(auth)/register" style={{ color: theme.primary, textAlign: "center" }}>Create an account</Link>
      <Link href="/(auth)/forgot-password" style={{ color: theme.primary, textAlign: "center" }}>Forgot password?</Link>
    </Screen>
  );
}
