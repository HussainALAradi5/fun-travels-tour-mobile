import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { RADIUS, SPACING, TOUCH_TARGET } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { CountryFilterButtonProps } from "@/interfaces/props/CountryFilterButtonProps";
import { Flag } from "../common/Flag";

/** A From/To country card: caption, the chosen flag and name (or "Any country"), and a chevron. */
export function CountryFilterButton({ caption, country, onPress }: CountryFilterButtonProps) {
  const theme = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`${caption}: ${country?.famousName ?? "Any country"}`} onPress={onPress}
      style={({ pressed }) => [styles.card, { backgroundColor: theme.surface, borderColor: country ? theme.primary : theme.border, opacity: pressed ? 0.85 : 1 }]}>
      <View style={styles.text}>
        <Text style={[styles.caption, { color: theme.muted }]}>{caption}</Text>
        <View style={styles.value}>
          {country ? <Flag uri={country.flagPngUrl} width={22} /> : <Ionicons name="globe-outline" size={18} color={theme.muted} />}
          <Text numberOfLines={1} style={[styles.name, { color: country ? theme.text : theme.muted }]}>{country?.famousName ?? "Any country"}</Text>
        </View>
      </View>
      <Ionicons name="chevron-down" size={18} color={theme.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minHeight: TOUCH_TARGET + 12, flexDirection: "row", alignItems: "center", gap: SPACING.sm, borderWidth: 1,
    borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  text: { flex: 1, gap: 2 },
  caption: { fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.8 },
  value: { flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  name: { flex: 1, fontSize: 15, fontWeight: "600" },
});
