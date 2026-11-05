import { StyleSheet, Text, View } from "react-native";
import { SPACING } from "@/constants/theme";
import { CHAIR_LABEL, type ChairType } from "@/enums/ChairType";
import { useTheme } from "@/hooks/useTheme";
import type { TravelerEditorProps } from "@/interfaces/props/TravelerEditorProps";
import { formatMoney } from "@/utilities/format";
import { Card } from "../common/Card";
import { Chip } from "../common/Chip";

const seatLabel = (code: string, type?: string) => (type && CHAIR_LABEL[type as ChairType] ? `${code} · ${CHAIR_LABEL[type as ChairType]}` : code);

/** One traveler: adult or child, an optional seat (empty lets the server assign a standard one), and meals. */
export function TravelerEditor({ index, traveler, seats, meals, isSeatTaken, onSeat, onMeal, onKind, onMealsForAll }: TravelerEditorProps) {
  const theme = useTheme();
  const hasMeals = (traveler.selectedMeals?.length ?? 0) > 0;
  return (
    <Card>
      <View style={styles.head}>
        <Text style={{ color: theme.text, fontWeight: "700", flex: 1 }}>Traveler {index + 1}</Text>
        <Chip label="Adult" selected={traveler.kind === "ADULT"} disabled={index === 0} onPress={() => onKind("ADULT")} />
        <Chip label="Child" selected={traveler.kind === "CHILD"} disabled={index === 0} onPress={() => onKind("CHILD")} />
      </View>
      {seats.length > 0 ? (
        <>
          <Text style={{ color: theme.muted }}>Seat (optional)</Text>
          <View style={styles.row}>
            <Chip label="Any" selected={!traveler.assignedSeat} onPress={() => onSeat(undefined)} />
            {seats.map((seat) => (
              <Chip key={seat.id} label={seatLabel(seat.seatCode, seat.chairType)} selected={traveler.assignedSeat?.id === seat.id}
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
            {onMealsForAll && hasMeals ? <Chip label="Same for everyone" selected={false} onPress={onMealsForAll} /> : null}
          </View>
        </>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  row: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm },
});
