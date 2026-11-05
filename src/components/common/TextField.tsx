import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RADIUS, SPACING, TOUCH_TARGET } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { TextFieldProps } from "@/interfaces/props/TextFieldProps";

/** Labelled input; password fields get a show/hide button so people can check what they typed. */
export function TextField({ label, error, style, secureTextEntry, ...input }: TextFieldProps) {
  const theme = useTheme();
  const [revealed, setRevealed] = useState(false);
  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <View>
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={theme.muted}
          secureTextEntry={secureTextEntry && !revealed}
          style={[styles.input, { color: theme.text, borderColor: error ? theme.danger : theme.border, backgroundColor: theme.surface },
            secureTextEntry && styles.withToggle, style]}
          {...input}
        />
        {secureTextEntry ? (
          <Pressable accessibilityRole="button" accessibilityLabel={revealed ? "Hide password" : "Show password"}
            hitSlop={SPACING.sm} onPress={() => setRevealed((shown) => !shown)} style={styles.toggle}>
            <Ionicons name={revealed ? "eye-off-outline" : "eye-outline"} size={22} color={theme.muted} />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={{ color: theme.danger }}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: SPACING.xs },
  label: { fontWeight: "600" },
  input: { minHeight: TOUCH_TARGET, borderWidth: 1, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, fontSize: 16 },
  withToggle: { paddingRight: TOUCH_TARGET + SPACING.sm },
  toggle: { position: "absolute", right: 0, top: 0, bottom: 0, width: TOUCH_TARGET, alignItems: "center", justifyContent: "center" },
});
