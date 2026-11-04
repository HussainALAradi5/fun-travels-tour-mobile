import { StyleSheet, Text, TextInput, View } from "react-native";
import { RADIUS, SPACING, TOUCH_TARGET } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { TextFieldProps } from "@/interfaces/props/TextFieldProps";

export function TextField({ label, error, style, ...input }: TextFieldProps) {
  const theme = useTheme();
  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={theme.muted}
        style={[styles.input, { color: theme.text, borderColor: error ? theme.danger : theme.border, backgroundColor: theme.surface }, style]}
        {...input}
      />
      {error ? <Text style={{ color: theme.danger }}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: SPACING.xs },
  label: { fontWeight: "600" },
  input: { minHeight: TOUCH_TARGET, borderWidth: 1, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, fontSize: 16 },
});
