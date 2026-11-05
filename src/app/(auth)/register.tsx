import { Text } from "react-native";
import { Button } from "@/components/common/Button";
import { Screen } from "@/components/common/Screen";
import { GenderPicker } from "@/components/common/GenderPicker";
import { PhoneField } from "@/components/common/PhoneField";
import { TextField } from "@/components/common/TextField";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { useTheme } from "@/hooks/useTheme";

export default function RegisterScreen() {
  const theme = useTheme();
  const form = useRegisterForm();
  return (
    <Screen>
      <Text style={{ color: theme.text, fontSize: 26, fontWeight: "800" }}>Create account</Text>
      <TextField label="Full name" value={form.values.name} onChangeText={form.set("name")} />
      <TextField label="Username" autoCapitalize="none" value={form.values.userName} onChangeText={form.set("userName")} />
      <TextField label="Email" autoCapitalize="none" keyboardType="email-address" value={form.values.email} onChangeText={form.set("email")} />
      <PhoneField label="Mobile number" value={form.values.mobileNumber} onChange={form.set("mobileNumber")}
        error={form.errors.mobileNumber} />
      <GenderPicker label="Gender" value={form.values.gender} onChange={form.setGender} />
      <TextField label="Password" secureTextEntry value={form.values.password} onChangeText={form.set("password")} error={form.errors.password} />
      <Button label="Create account" onPress={form.submit} disabled={!form.canSubmit} loading={form.pending} />
    </Screen>
  );
}
