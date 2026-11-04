import { StyleSheet, Text, View } from "react-native";
import { SPACING } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { TransactionRowProps } from "@/interfaces/props/TransactionRowProps";
import { formatDateTime, formatMoney } from "@/utilities/format";

export function TransactionRow({ transaction }: TransactionRowProps) {
  const theme = useTheme();
  const credit = Number(transaction.amount) >= 0;
  return (
    <View style={[styles.row, { borderColor: theme.border }]}>
      <View style={styles.flex}>
        <Text style={{ color: theme.text }}>{transaction.description ?? transaction.transactionType}</Text>
        <Text style={{ color: theme.muted, fontSize: 12 }}>{formatDateTime(transaction.timestamp)}</Text>
      </View>
      <Text style={{ color: credit ? theme.success : theme.danger, fontWeight: "700" }}>{formatMoney(transaction.amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: SPACING.md, paddingVertical: SPACING.md, borderBottomWidth: StyleSheet.hairlineWidth },
  flex: { flex: 1 },
});
