import { router } from "expo-router";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { StateView } from "@/components/common/StateView";
import { TourCard } from "@/components/tour/TourCard";
import { MESSAGES } from "@/constants/messages";
import { SPACING } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useTours } from "@/hooks/useTours";

export default function ToursScreen() {
  const theme = useTheme();
  const { data, loading, error, reload } = useTours();
  const tours = data?.content ?? [];
  return (
    <FlatList
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.list}
      data={tours}
      keyExtractor={(tour) => String(tour.id)}
      renderItem={({ item }) => <TourCard tour={item} onPress={() => router.push(`/tours/${item.id}`)} />}
      refreshControl={<RefreshControl refreshing={loading && tours.length > 0} onRefresh={reload} />}
      ListEmptyComponent={<StateView loading={loading} error={error} empty emptyText={MESSAGES.emptyTours} onRetry={reload} />}
    />
  );
}

const styles = StyleSheet.create({ list: { padding: SPACING.lg, gap: SPACING.md } });
