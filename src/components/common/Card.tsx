import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { RADIUS, SPACING } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

export function Card({ children }: PropsWithChildren) {
  const theme = useTheme();
  return <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: RADIUS.lg, padding: SPACING.lg, gap: SPACING.sm },
});
