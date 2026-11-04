import { router } from "expo-router";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { StateView } from "@/components/common/StateView";
import { ExportButton } from "@/components/report/ExportButton";
import { CatalogFilters } from "@/components/tour/CatalogFilters";
import { TourCard } from "@/components/tour/TourCard";
import { MESSAGES } from "@/constants/messages";
import { SPACING } from "@/constants/theme";
import { ReportType } from "@/enums/ReportType";
import { useTheme } from "@/hooks/useTheme";
import { useTours } from "@/hooks/useTours";

export default function ToursScreen() {
  const theme = useTheme();
  const catalog = useTours();
  const tours = catalog.data?.content ?? [];
  return (
    <FlatList
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.list}
      data={tours}
      keyExtractor={(tour) => String(tour.id)}
      ListHeaderComponent={
        <View style={styles.header}>
          <CatalogFilters filter={catalog.filter} active={catalog.active} onChange={catalog.update} onDate={catalog.setDate} onReset={catalog.reset} />
          <ExportButton report={{ type: ReportType.TOUR_CATALOG }} label="Export catalog" />
        </View>
      }
      renderItem={({ item }) => <TourCard tour={item} onPress={() => router.push(`/tours/${item.id}`)} />}
      refreshControl={<RefreshControl refreshing={catalog.loading && tours.length > 0} onRefresh={catalog.reload} />}
      ListEmptyComponent={<StateView loading={catalog.loading} error={catalog.error} empty emptyText={MESSAGES.emptyTours} onRetry={catalog.reload} />}
    />
  );
}

const styles = StyleSheet.create({ list: { padding: SPACING.lg, gap: SPACING.md }, header: { gap: SPACING.md } });
