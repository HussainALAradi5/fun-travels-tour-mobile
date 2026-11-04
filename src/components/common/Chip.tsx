import { Pressable, StyleSheet, Text } from "react-native";
import { RADIUS, SPACING, TOUCH_TARGET } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { ChipProps } from "@/interfaces/props/ChipProps";

export function Chip({ label, selected, disabled, onPress }: ChipProps) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[styles.chip, { borderColor: selected ? theme.primary : theme.border, backgroundColor: selected ? theme.primary : theme.surface, opacity: disabled ? 0.4 : 1 }]}
    >
      <Text style={{ color: selected ? theme.primaryText : theme.text }}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: { minHeight: TOUCH_TARGET, minWidth: TOUCH_TARGET, borderWidth: 1, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, alignItems: "center", justifyContent: "center" },
});
