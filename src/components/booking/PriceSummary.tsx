import { StyleSheet, Text, View } from "react-native";
import { SPACING } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { PriceSummaryProps } from "@/interfaces/props/PriceSummaryProps";
import { formatMoney } from "@/utilities/format";
import { Card } from "../common/Card";

/** Live price for the group; the server charges the same amounts. */
export function PriceSummary({ estimate, travelers, kidsDiscountPercent }: PriceSummaryProps) {
  const theme = useTheme();
  const lines: [string, number][] = [
    [`Fare x${travelers}`, estimate.fare],
    ...(estimate.kidsDiscount > 0 ? [[`Kids chairs ${kidsDiscountPercent}% off (${estimate.kidsChairs})`, -estimate.kidsDiscount] as [string, number]] : []),
    ...(estimate.seatUpgrades > 0 ? [["Seat upgrades", estimate.seatUpgrades] as [string, number]] : []),
    ...(estimate.meals > 0 ? [["Meals", estimate.meals] as [string, number]] : []),
  ];
  return (
    <Card>
      {lines.map(([label, amount]) => (
        <View key={label} style={styles.row}>
          <Text style={{ color: theme.muted }}>{label}</Text>
          <Text style={{ color: amount < 0 ? theme.success : theme.text, fontWeight: "600" }}>
            {amount < 0 ? "-" : ""}{formatMoney(Math.abs(amount))}
          </Text>
        </View>
      ))}
      <View style={[styles.row, styles.total, { borderTopColor: theme.border }]}>
        <Text style={{ color: theme.text, fontWeight: "800" }}>Total</Text>
        <Text style={{ color: theme.primary, fontSize: 20, fontWeight: "800" }}>{formatMoney(estimate.total)}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: SPACING.xs },
  total: { borderTopWidth: StyleSheet.hairlineWidth, marginTop: SPACING.xs, paddingTop: SPACING.sm },
});
