import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { MOBILE_HINT } from "@/constants/phone";
import { RADIUS, SPACING, TOUCH_TARGET } from "@/constants/theme";
import { useDialCodes } from "@/hooks/useDialCodes";
import { useTheme } from "@/hooks/useTheme";
import type { PhoneFieldProps } from "@/interfaces/props/PhoneFieldProps";
import { SelectSheet } from "./SelectSheet";

/** Phone number with a country-code picker; reports the full "+<code><number>" value. */
export function PhoneField({ label, value, onChange, error }: PhoneFieldProps) {
  const theme = useTheme();
  const dial = useDialCodes(value);
  const [open, setOpen] = useState(false);
  const code = dial.selected?.dialCode ?? "";
  const local = value.startsWith(code) ? value.slice(code.length) : value.replace(/^\+/, "");
  const border = { borderColor: error ? theme.danger : theme.border, backgroundColor: theme.surface };
  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <View style={styles.row}>
        <Pressable accessibilityRole="button" accessibilityLabel={`Country code ${code}`} onPress={() => setOpen(true)}
          style={[styles.code, border]}>
          <Text style={{ color: theme.text, fontWeight: "700" }}>{code || "+"}</Text>
        </Pressable>
        <TextInput accessibilityLabel={label} keyboardType="phone-pad" value={local} placeholder="39990001"
          placeholderTextColor={theme.muted} style={[styles.input, border, { color: theme.text }]}
          onChangeText={(text) => onChange(`${code}${text.replace(/[^0-9]/g, "")}`)} />
      </View>
      <Text style={{ color: error ? theme.danger : theme.muted }}>{error ?? MOBILE_HINT}</Text>
      <SelectSheet visible={open} title="Country code" items={dial.countries} label={(c) => c.famousName}
        detail={(c) => c.dialCode} keyOf={(c) => String(c.id)} onClose={() => setOpen(false)}
        onSelect={(country) => { dial.setSelected(country); onChange(`${country.dialCode}${local}`); setOpen(false); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: SPACING.xs },
  label: { fontWeight: "600" },
  row: { flexDirection: "row", gap: SPACING.sm },
  code: { minHeight: TOUCH_TARGET, minWidth: 72, borderWidth: 1, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center" },
  input: { flex: 1, minHeight: TOUCH_TARGET, borderWidth: 1, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, fontSize: 16 },
});
