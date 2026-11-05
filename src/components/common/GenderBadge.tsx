import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { RADIUS, SPACING } from "@/constants/theme";
import { GenderColor, GenderLabel } from "@/enums/Gender";
import type { GenderBadgeProps } from "@/interfaces/props/GenderBadgeProps";

/** One colored pill with the gender's icon and name: blue for male, pink for female. */
export function GenderBadge({ gender }: GenderBadgeProps) {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  if (!gender) return null;
  const color = GenderColor[gender][scheme];
  return (
    <View accessibilityLabel={`Gender: ${GenderLabel[gender]}`}
      style={[styles.badge, { backgroundColor: `${color}1F`, borderColor: color }]}>
      <Ionicons name={gender === "MALE" ? "male" : "female"} size={13} color={color} />
      <Text style={[styles.text, { color }]}>{GenderLabel[gender]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: SPACING.xs, borderWidth: 1,
    borderRadius: RADIUS.lg, paddingHorizontal: SPACING.sm, paddingVertical: 2 },
  text: { fontSize: 12, fontWeight: "700" },
});
