import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { StateView } from "@/components/common/StateView";
import { MESSAGES } from "@/constants/messages";
import { SPACING } from "@/constants/theme";
import { useMyReports } from "@/hooks/useMyReports";
import { useTheme } from "@/hooks/useTheme";
import { formatDateTime } from "@/utilities/format";

const KB = 1024;

export default function ReportsScreen() {
  const theme = useTheme();
  const r = useMyReports();
  const items = r.list.data?.content ?? [];
  return (
    <FlatList style={{ backgroundColor: theme.background }} contentContainerStyle={styles.list} data={items}
      keyExtractor={(m) => String(m.id)} onRefresh={r.list.reload} refreshing={r.list.loading && items.length > 0}
      renderItem={({ item }) => (
        <Card>
          <Text style={{ color: theme.text, fontWeight: "700" }}>{item.fileName}</Text>
          <Text style={{ color: theme.muted }}>
            {item.reportFormat} - {item.recordCount} records - {Math.max(1, Math.round(item.sizeBytes / KB))} KB - {formatDateTime(item.createdAt)}
          </Text>
          <View style={styles.row}>
            <View style={styles.flex}><Button label="Open" onPress={() => void r.open(item)} loading={r.pending} /></View>
            <View style={styles.flex}><Button label="Delete" variant="danger" onPress={() => r.remove(item)} /></View>
          </View>
        </Card>
      )}
      ListEmptyComponent={<StateView loading={r.list.loading} error={r.list.error} empty emptyText={MESSAGES.emptyReports} onRetry={r.list.reload} />} />
  );
}

const styles = StyleSheet.create({ list: { padding: SPACING.lg, gap: SPACING.md }, row: { flexDirection: "row", gap: SPACING.sm }, flex: { flex: 1 } });
