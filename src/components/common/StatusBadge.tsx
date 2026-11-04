import { StyleSheet, Text, View } from "react-native";
import { RADIUS, SPACING } from "@/constants/theme";
import { STATUS_TONE } from "@/enums/StatusTone";
import { useTheme } from "@/hooks/useTheme";
import type { StatusBadgeProps } from "@/interfaces/props/StatusBadgeProps";

export function StatusBadge({ status }: StatusBadgeProps) {
  const theme = useTheme();
  const tone = STATUS_TONE[status] ?? "muted";
  const color = tone === "muted" ? theme.muted : theme[tone];
  return (
    <View style={[styles.badge, { borderColor: color }]}>
      <Text style={[styles.text, { color }]}>{status.replace(/_/g, " ")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: "flex-start", borderWidth: 1, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.sm, paddingVertical: 2 },
  text: { fontSize: 12, fontWeight: "700" },
});
