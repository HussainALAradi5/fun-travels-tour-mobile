import { ChairType } from "@/enums/ChairType";
import type { BookingEstimate } from "@/interfaces/booking/BookingEstimate";
import type { TravelerDraft } from "@/interfaces/booking/TravelerDraft";
import type { Seat } from "@/interfaces/tour/Seat";
import type { Tour } from "@/interfaces/tour/Tour";

const DEFAULT_KIDS_DISCOUNT_PERCENT = 50;
const round = (value: number) => Math.round(value * 100) / 100;

/** Same rule as the server: fare minus the agency's kids discount on kids chairs, plus seat upgrades and meals. */
export function estimateBooking(tour: Tour, travelers: TravelerDraft[], seats: Seat[]): BookingEstimate {
  const price = tour.totalPrice ?? tour.basePrice ?? 0;
  const percent = tour.policy?.kidsDiscountPercent ?? DEFAULT_KIDS_DISCOUNT_PERCENT;
  const seatOf = (t: TravelerDraft) => seats.find((s) => s.id === t.assignedSeat?.id);
  const kidsChairs = travelers.filter((t) => seatOf(t)?.chairType === ChairType.KIDS_CHAIR).length;
  const seatUpgrades = travelers.reduce((sum, t) => sum + (seatOf(t)?.seatPriceModifier ?? 0), 0);
  const mealPrice = (id: number) => tour.availableMeals?.find((m) => m.id === id)?.mealPrice ?? 0;
  const meals = travelers.reduce((sum, t) => sum + (t.selectedMeals ?? []).reduce((s, m) => s + mealPrice(m.id), 0), 0);
  const fare = round(price * travelers.length);
  const kidsDiscount = round(kidsChairs * price * (percent / 100));
  return { fare, kidsDiscount, kidsChairs, seatUpgrades: round(seatUpgrades), meals: round(meals),
    total: round(fare - kidsDiscount + seatUpgrades + meals) };
}

/** Seats the whole group in cabin order: children on kids chairs while free, adults on standard seats. */
export function autoPickSeats(travelers: TravelerDraft[], freeSeats: Seat[]): TravelerDraft[] {
  const kept = new Set(travelers.map((t) => t.assignedSeat?.id).filter(Boolean));
  const pool = freeSeats.filter((s) => !kept.has(s.id));
  const take = (type: string) => {
    const index = pool.findIndex((s) => s.chairType === type);
    return index < 0 ? undefined : pool.splice(index, 1)[0];
  };
  return travelers.map((t) => {
    if (t.assignedSeat) return t;
    const seat = t.kind === "CHILD" ? take(ChairType.KIDS_CHAIR) ?? take(ChairType.STANDARD) : take(ChairType.STANDARD);
    return seat ? { ...t, assignedSeat: { id: seat.id } } : t;
  });
}
