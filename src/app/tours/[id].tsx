import { router, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { TravelerEditor } from "@/components/booking/TravelerEditor";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Screen } from "@/components/common/Screen";
import { StateView } from "@/components/common/StateView";
import { useAction } from "@/hooks/useAction";
import { useBookingForm } from "@/hooks/useBookingForm";
import { useTheme } from "@/hooks/useTheme";
import { formatDate, formatMoney, placeName } from "@/utilities/format";

export default function TourDetailScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const form = useBookingForm(Number(id));
  const { pending, run } = useAction();
  const tour = form.tour.data;
  if (!tour) return <StateView loading={form.tour.loading} error={form.tour.error} onRetry={form.tour.reload} />;

  const book = () => run(async () => {
    const reservation = await form.submit(tour);
    router.replace(`/bookings/${reservation.id}`);
  });

  return (
    <Screen>
      <Card>
        <Text style={{ color: theme.text, fontSize: 22, fontWeight: "800" }}>{tour.title}</Text>
        <Text style={{ color: theme.muted }}>{placeName(tour.startCity)} to {placeName(tour.endCity)}</Text>
        <Text style={{ color: theme.muted }}>{formatDate(tour.startDate)} - {formatDate(tour.endDate)}</Text>
        {tour.description ? <Text style={{ color: theme.text }}>{tour.description}</Text> : null}
        <Text style={{ color: theme.text, fontWeight: "700" }}>{formatMoney(tour.totalPrice)} per traveler - {tour.availableSlots} left</Text>
      </Card>
      {form.travelers.map((traveler, index) => (
        <TravelerEditor key={index} index={index} traveler={traveler} seats={form.freeSeats} meals={tour.availableMeals ?? []}
          isSeatTaken={(seatId) => form.takenBy(seatId, index)} onSeat={(seatId) => form.chooseSeat(index, seatId)}
          onMeal={(mealId) => form.toggleMeal(index, mealId)} />
      ))}
      <Button label="Add traveler" variant="outline" onPress={form.addTraveler} disabled={form.travelers.length >= form.limit} />
      {form.travelers.length > 1 ? <Button label="Remove last traveler" variant="outline" onPress={form.removeTraveler} /> : null}
      <Text style={{ color: theme.muted }}>Places are held for 15 minutes. The final price is calculated by the server.</Text>
      <Button label={`Reserve for ${form.travelers.length}`} onPress={book} loading={pending} disabled={form.limit === 0} />
    </Screen>
  );
}
