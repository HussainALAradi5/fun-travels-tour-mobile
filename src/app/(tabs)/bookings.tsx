import { router } from "expo-router";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { ReservationCard } from "@/components/booking/ReservationCard";
import { StateView } from "@/components/common/StateView";
import { ExportButton } from "@/components/report/ExportButton";
import { ReportType } from "@/enums/ReportType";
import { MESSAGES } from "@/constants/messages";
import { SPACING } from "@/constants/theme";
import { useReservations } from "@/hooks/useReservations";
import { useTheme } from "@/hooks/useTheme";

export default function BookingsScreen() {
  const theme = useTheme();
  const { data, loading, error, reload } = useReservations();
  const reservations = data?.content ?? [];
  return (
    <FlatList
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.list}
      data={reservations}
      keyExtractor={(r) => String(r.id)}
      ListHeaderComponent={<ExportButton report={{ type: ReportType.TICKETS }} label="Export my tickets" />}
      renderItem={({ item }) => <ReservationCard reservation={item} onPress={() => router.push(`/bookings/${item.id}`)} />}
      refreshControl={<RefreshControl refreshing={loading && reservations.length > 0} onRefresh={reload} />}
      ListEmptyComponent={<StateView loading={loading} error={error} empty emptyText={MESSAGES.emptyBookings} onRetry={reload} />}
    />
  );
}

const styles = StyleSheet.create({ list: { padding: SPACING.lg, gap: SPACING.md } });
