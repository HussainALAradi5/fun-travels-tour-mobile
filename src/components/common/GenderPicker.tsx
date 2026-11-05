import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View, useColorScheme } from "react-native";
import { RADIUS, SPACING, TOUCH_TARGET } from "@/constants/theme";
import { Gender, GenderColor, GenderLabel } from "@/enums/Gender";
import { useTheme } from "@/hooks/useTheme";
import type { GenderPickerProps } from "@/interfaces/props/GenderPickerProps";

const OPTIONS = [Gender.MALE, Gender.FEMALE];

/** Male / female choice, each option in its badge color with its icon. */
export function GenderPicker({ label, value, onChange }: GenderPickerProps) {
  const theme = useTheme();
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <View accessibilityRole="radiogroup" style={styles.row}>
        {OPTIONS.map((gender) => {
          const selected = value === gender;
          const color = GenderColor[gender][scheme];
          return (
            <Pressable key={gender} accessibilityRole="radio" accessibilityState={{ checked: selected }}
              accessibilityLabel={GenderLabel[gender]} onPress={() => onChange(gender)}
              style={[styles.option, { borderColor: selected ? color : theme.border,
                backgroundColor: selected ? `${color}1F` : theme.surface }]}>
              <Ionicons name={gender === Gender.MALE ? "male" : "female"} size={18} color={selected ? color : theme.muted} />
              <Text style={[styles.optionText, { color: selected ? color : theme.text }]}>{GenderLabel[gender]}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: SPACING.xs },
  label: { fontWeight: "600" },
  row: { flexDirection: "row", gap: SPACING.md },
  option: { flex: 1, minHeight: TOUCH_TARGET, flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: SPACING.sm, borderWidth: 1.5, borderRadius: RADIUS.md },
  optionText: { fontSize: 16, fontWeight: "600" },
});
