import { StyleSheet, Text, View } from "react-native";
import { SPACING } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { TravelerEditorProps } from "@/interfaces/props/TravelerEditorProps";
import { formatMoney } from "@/utilities/format";
import { Card } from "../common/Card";
import { Chip } from "../common/Chip";

/** One traveler's optional seat and meals. Leaving the seat empty lets the server assign one. */
export function TravelerEditor({ index, traveler, seats, meals, isSeatTaken, onSeat, onMeal }: TravelerEditorProps) {
  const theme = useTheme();
  return (
    <Card>
      <Text style={{ color: theme.text, fontWeight: "700" }}>Traveler {index + 1}</Text>
      {seats.length > 0 ? (
        <>
          <Text style={{ color: theme.muted }}>Seat (optional)</Text>
          <View style={styles.row}>
            <Chip label="Any" selected={!traveler.assignedSeat} onPress={() => onSeat(undefined)} />
            {seats.map((seat) => (
              <Chip key={seat.id} label={seat.seatCode} selected={traveler.assignedSeat?.id === seat.id}
                disabled={isSeatTaken(seat.id)} onPress={() => onSeat(seat.id)} />
            ))}
          </View>
        </>
      ) : null}
      {meals.length > 0 ? (
        <>
          <Text style={{ color: theme.muted }}>Meals</Text>
          <View style={styles.row}>
            {meals.map((meal) => (
              <Chip key={meal.id} label={`${meal.mealName} ${formatMoney(meal.mealPrice)}`}
                selected={Boolean(traveler.selectedMeals?.some((m) => m.id === meal.id))} onPress={() => onMeal(meal.id)} />
            ))}
          </View>
        </>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({ row: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm } });
