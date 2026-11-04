import { Pressable, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import type { TourCardProps } from "@/interfaces/props/TourCardProps";
import { formatDate, formatMoney, placeName } from "@/utilities/format";
import { Card } from "../common/Card";

export function TourCard({ tour, onPress }: TourCardProps) {
  const theme = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Open ${tour.title}`} onPress={onPress}>
      <Card>
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: "700" }}>{tour.title}</Text>
        <Text style={{ color: theme.muted }}>{placeName(tour.startCity)} to {placeName(tour.endCity)}</Text>
        <Text style={{ color: theme.muted }}>{formatDate(tour.startDate)} - {formatDate(tour.endDate)}</Text>
        <Text style={{ color: theme.text, fontWeight: "600" }}>{formatMoney(tour.totalPrice)} - {tour.availableSlots} places left</Text>
      </Card>
    </Pressable>
  );
}
