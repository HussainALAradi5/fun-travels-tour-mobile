import { Pressable, StyleSheet, Text, View } from "react-native";
import { RADIUS, SPACING, TOUCH_TARGET } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { GroupStepperProps } from "@/interfaces/props/GroupStepperProps";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

/** Adults and children for the whole family in one place, then seats for everyone in one tap. */
export function GroupStepper({ adults, kids, limit, kidsDiscountPercent, canSeat, onChange, onSeatEveryone }: GroupStepperProps) {
  const theme = useTheme();
  const room = adults + kids < limit;
  const row = (label: string, hint: string, value: number, min: number, set: (n: number) => void) => (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: theme.text, fontWeight: "700" }}>{label}</Text>
        <Text style={{ color: theme.muted, fontSize: 12 }}>{hint}</Text>
      </View>
      {[{ sign: "−", next: value - 1, ok: value > min }, { sign: "+", next: value + 1, ok: room }].map((b, i) => (
        <View key={b.sign} style={styles.inline}>
          {i === 1 ? <Text style={[styles.count, { color: theme.text }]}>{value}</Text> : null}
          <Pressable accessibilityRole="button" accessibilityLabel={`${b.sign === "+" ? "More" : "Fewer"} ${label.toLowerCase()}`}
            disabled={!b.ok} onPress={() => set(b.next)}
            style={[styles.step, { borderColor: theme.border, opacity: b.ok ? 1 : 0.35 }]}>
            <Text style={{ color: theme.text, fontSize: 20 }}>{b.sign}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
  return (
    <Card>
      <Text style={{ color: theme.text, fontSize: 18, fontWeight: "800" }}>Who is traveling?</Text>
      <Text style={{ color: theme.muted }}>{limit} places left</Text>
      {row("Adults", "Standard fare", adults, 1, (n) => onChange(n, kids))}
      {row("Children", kidsDiscountPercent > 0 ? `${kidsDiscountPercent}% off on a kids chair` : "Kids chairs available", kids, 0,
        (n) => onChange(adults, n))}
      {canSeat ? <Button label="Seat us together" variant="outline" onPress={onSeatEveryone} /> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: SPACING.sm, paddingVertical: SPACING.xs },
  inline: { flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  step: { width: TOUCH_TARGET, height: TOUCH_TARGET, borderWidth: 1, borderRadius: RADIUS.lg, alignItems: "center", justifyContent: "center" },
  count: { minWidth: 24, textAlign: "center", fontSize: 18, fontWeight: "800" },
});
