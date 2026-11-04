import { Pressable, StyleSheet, Text, View } from "react-native";
import { SPACING, TOUCH_TARGET } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { LinkRowProps } from "@/interfaces/props/LinkRowProps";

/** A tappable menu row, such as "Support requests" on the profile tab. */
export function LinkRow({ label, hint, onPress }: LinkRowProps) {
  const theme = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityHint={hint} onPress={onPress}
      style={({ pressed }) => [styles.row, { borderColor: theme.border, opacity: pressed ? 0.7 : 1 }]}>
      <View style={styles.text}>
        <Text style={{ color: theme.text, fontWeight: "600" }}>{label}</Text>
        {hint ? <Text style={{ color: theme.muted, fontSize: 12 }}>{hint}</Text> : null}
      </View>
      <Text style={{ color: theme.muted, fontSize: 18 }}>{">"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: TOUCH_TARGET, flexDirection: "row", alignItems: "center", paddingVertical: SPACING.md, borderBottomWidth: StyleSheet.hairlineWidth },
  text: { flex: 1, gap: 2 },
});
