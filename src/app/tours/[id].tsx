import { router, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { GroupStepper } from "@/components/booking/GroupStepper";
import { PriceSummary } from "@/components/booking/PriceSummary";
import { RefundTimeline } from "@/components/booking/RefundTimeline";
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
  const kidsPercent = tour.policy?.kidsDiscountPercent ?? 0;

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
        <Text style={{ color: theme.text, fontWeight: "700" }}>{formatMoney(tour.totalPrice)} per traveler</Text>
      </Card>
      <GroupStepper adults={form.adults} kids={form.children} limit={form.limit} kidsDiscountPercent={kidsPercent}
        canSeat={form.freeSeats.length > 0} onChange={form.setGroup} onSeatEveryone={form.seatEveryone} />
      {form.travelers.map((traveler, index) => (
        <TravelerEditor key={index} index={index} traveler={traveler} seats={form.freeSeats} meals={tour.availableMeals ?? []}
          isSeatTaken={(seatId) => form.takenBy(seatId, index)} onSeat={(seatId) => form.chooseSeat(index, seatId)}
          onMeal={(mealId) => form.toggleMeal(index, mealId)} onKind={(kind) => form.setKind(index, kind)}
          onMealsForAll={form.travelers.length > 1 ? () => form.mealsForAll(index) : undefined} />
      ))}
      <RefundTimeline policy={tour.policy} />
      {form.estimate ? <PriceSummary estimate={form.estimate} travelers={form.travelers.length} kidsDiscountPercent={kidsPercent} /> : null}
      <Text style={{ color: theme.muted }}>Places are held for 15 minutes while you pay. Travelers without a seat get a standard one.</Text>
      <Button label={`Reserve for ${form.travelers.length}`} onPress={book} loading={pending} disabled={form.limit === 0} />
    </Screen>
  );
}
