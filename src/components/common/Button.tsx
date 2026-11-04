import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { RADIUS, SPACING, TOUCH_TARGET } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { ButtonProps } from "@/interfaces/props/ButtonProps";

export function Button({ label, onPress, variant = "primary", disabled, loading }: ButtonProps) {
  const theme = useTheme();
  const color = variant === "danger" ? theme.danger : theme.primary;
  const filled = variant !== "outline";
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: filled ? color : "transparent", borderColor: color, opacity: disabled ? 0.5 : pressed ? 0.8 : 1 },
      ]}
    >
      {loading ? <ActivityIndicator color={filled ? theme.primaryText : color} /> : (
        <Text style={[styles.label, { color: filled ? theme.primaryText : color }]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: TOUCH_TARGET, borderRadius: RADIUS.md, borderWidth: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: SPACING.lg },
  label: { fontSize: 16, fontWeight: "600" },
});
