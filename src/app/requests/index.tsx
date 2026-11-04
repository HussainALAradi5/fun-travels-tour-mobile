import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { StateView } from "@/components/common/StateView";
import { StatusBadge } from "@/components/common/StatusBadge";
import { MESSAGES } from "@/constants/messages";
import { SPACING } from "@/constants/theme";
import { useAsync } from "@/hooks/useAsync";
import { useTheme } from "@/hooks/useTheme";
import { supportService } from "@/services/supportService";
import { formatDateTime } from "@/utilities/format";

export default function RequestsScreen() {
  const theme = useTheme();
  const list = useAsync(useCallback(() => supportService.mine(), []));
  const { reload } = list;
  useFocusEffect(useCallback(() => { void reload(); }, [reload]));
  const items = list.data?.content ?? [];
  return (
    <FlatList style={{ backgroundColor: theme.background }} contentContainerStyle={styles.list} data={items}
      keyExtractor={(r) => String(r.id)} onRefresh={list.reload} refreshing={list.loading && items.length > 0}
      ListHeaderComponent={<Button label="New request" onPress={() => router.push("/requests/new")} />}
      renderItem={({ item }) => (
        <Pressable accessibilityRole="button" onPress={() => router.push(`/requests/${item.id}`)}>
          <Card>
            <StatusBadge status={item.status} />
            <Text style={{ color: theme.text, fontWeight: "700" }}>{item.title}</Text>
            <Text style={{ color: theme.muted }}>{item.type} - {formatDateTime(item.createdAt)}</Text>
          </Card>
        </Pressable>
      )}
      ListEmptyComponent={<StateView loading={list.loading} error={list.error} empty emptyText={MESSAGES.emptyRequests} onRetry={list.reload} />} />
  );
}

const styles = StyleSheet.create({ list: { padding: SPACING.lg, gap: SPACING.md } });
