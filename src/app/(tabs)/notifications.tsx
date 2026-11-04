import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { Card } from "@/components/common/Card";
import { StateView } from "@/components/common/StateView";
import { MESSAGES } from "@/constants/messages";
import { SPACING } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { useTheme } from "@/hooks/useTheme";
import { formatDateTime } from "@/utilities/format";

export default function NotificationsScreen() {
  const theme = useTheme();
  const { user } = useAuth();
  const { data, loading, error, reload, markRead } = useNotifications(user?.id ?? 0);
  const items = data ?? [];
  return (
    <FlatList
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.list}
      data={items}
      keyExtractor={(n) => String(n.id)}
      onRefresh={reload}
      refreshing={loading && items.length > 0}
      renderItem={({ item }) => (
        <Pressable accessibilityRole="button" accessibilityHint={item.isRead ? undefined : "Marks as read"}
          onPress={() => (item.isRead ? undefined : void markRead(item.id))}>
          <Card>
            <Text style={{ color: theme.text, fontWeight: item.isRead ? "400" : "800" }}>{item.title}</Text>
            <Text style={{ color: theme.muted }}>{item.message}</Text>
            <Text style={{ color: theme.muted, fontSize: 12 }}>{formatDateTime(item.createdAt)}</Text>
          </Card>
        </Pressable>
      )}
      ListEmptyComponent={<StateView loading={loading} error={error} empty emptyText={MESSAGES.emptyNotifications} onRetry={reload} />}
    />
  );
}

const styles = StyleSheet.create({ list: { padding: SPACING.lg, gap: SPACING.md } });
