import { router } from "expo-router";
import { useCallback } from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { Card } from "@/components/common/Card";
import { StateView } from "@/components/common/StateView";
import { StatusBadge } from "@/components/common/StatusBadge";
import { MESSAGES } from "@/constants/messages";
import { SPACING } from "@/constants/theme";
import { useAsync } from "@/hooks/useAsync";
import { useTheme } from "@/hooks/useTheme";
import { paymentService } from "@/services/paymentService";
import { formatDateTime, formatMoney } from "@/utilities/format";

export default function PaymentsScreen() {
  const theme = useTheme();
  const { data, loading, error, reload } = useAsync(useCallback(() => paymentService.mine({ size: 50 }), []));
  const items = data?.content ?? [];
  return (
    <FlatList style={{ backgroundColor: theme.background }} contentContainerStyle={styles.list} data={items}
      keyExtractor={(p) => String(p.id)} onRefresh={reload} refreshing={loading && items.length > 0}
      renderItem={({ item }) => (
        <Pressable accessibilityRole="button" onPress={() => router.push(`/payments/${item.id}`)}>
          <Card>
            <StatusBadge status={item.status} />
            <Text style={{ color: theme.text, fontWeight: "700" }}>{formatMoney(item.amount)} - {item.method.replace(/_/g, " ")}</Text>
            <Text style={{ color: theme.muted }}>{item.reservation?.reservationNumber ?? "Wallet top-up"} - {formatDateTime(item.paymentDate)}</Text>
          </Card>
        </Pressable>
      )}
      ListEmptyComponent={<StateView loading={loading} error={error} empty emptyText={MESSAGES.emptyPayments} onRetry={reload} />} />
  );
}

const styles = StyleSheet.create({ list: { padding: SPACING.lg, gap: SPACING.md } });
