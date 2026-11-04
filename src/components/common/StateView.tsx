import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SPACING } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { StateViewProps } from "@/interfaces/props/StateViewProps";
import { Button } from "./Button";

/** Loading, error, and empty placeholders shared by every list and detail screen. */
export function StateView({ loading, error, empty, emptyText, onRetry }: StateViewProps) {
  const theme = useTheme();
  if (loading) return <View style={styles.center}><ActivityIndicator accessibilityLabel="Loading" color={theme.primary} /></View>;
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={[styles.text, { color: theme.danger }]}>{error}</Text>
        {onRetry ? <Button label="Try again" variant="outline" onPress={onRetry} /> : null}
      </View>
    );
  }
  if (empty) return <View style={styles.center}><Text style={[styles.text, { color: theme.muted }]}>{emptyText}</Text></View>;
  return null;
}

const styles = StyleSheet.create({
  center: { padding: SPACING.xl, alignItems: "center", gap: SPACING.md },
  text: { textAlign: "center", fontSize: 16 },
});
