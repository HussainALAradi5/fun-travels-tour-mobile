import { StyleSheet, Text, View } from "react-native";
import { SPACING } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { InfoRowProps } from "@/interfaces/props/InfoRowProps";

/** "Label .... value" line used by detail screens. */
export function InfoRow({ label, value, strong }: InfoRowProps) {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      <Text style={{ color: theme.muted }}>{label}</Text>
      <Text style={[styles.value, { color: theme.text, fontWeight: strong ? "800" : "500" }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", gap: SPACING.md, paddingVertical: SPACING.xs },
  value: { flexShrink: 1, textAlign: "right" },
});
