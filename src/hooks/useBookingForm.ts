import { useCallback, useMemo, useState } from "react";
import { MAX_TRAVELERS } from "@/constants/messages";
import { SeatStatus } from "@/enums/SeatStatus";
import type { TicketSelection } from "@/interfaces/booking/TicketSelection";
import type { Tour } from "@/interfaces/tour/Tour";
import { bookingService } from "@/services/bookingService";
import { tourService } from "@/services/tourService";
import { useAsync } from "./useAsync";

/** Tour details plus the traveler, seat, and meal choices for a new booking. */
export function useBookingForm(tourId: number) {
  const tour = useAsync(useCallback(() => tourService.byId(tourId), [tourId]));
  const seats = useAsync(useCallback(() => tourService.seats(tourId), [tourId]), Boolean(tour.data?.hasTransportation));
  const [travelers, setTravelers] = useState<TicketSelection[]>([{}]);

  const freeSeats = useMemo(
    () => (seats.data?.content ?? []).filter((seat) => seat.status === SeatStatus.AVAILABLE),
    [seats.data],
  );
  const limit = Math.min(MAX_TRAVELERS, tour.data?.availableSlots ?? 0);

  const addTraveler = () => setTravelers((list) => (list.length < limit ? [...list, {}] : list));
  const removeTraveler = () => setTravelers((list) => (list.length > 1 ? list.slice(0, -1) : list));

  const chooseSeat = (index: number, seatId?: number) =>
    setTravelers((list) => list.map((t, i) => (i === index ? { ...t, assignedSeat: seatId ? { id: seatId } : undefined } : t)));

  const toggleMeal = (index: number, mealId: number) =>
    setTravelers((list) => list.map((t, i) => {
      if (i !== index) return t;
      const meals = t.selectedMeals ?? [];
      const has = meals.some((m) => m.id === mealId);
      return { ...t, selectedMeals: has ? meals.filter((m) => m.id !== mealId) : [...meals, { id: mealId }] };
    }));

  const takenBy = (seatId: number, index: number) =>
    travelers.some((t, i) => i !== index && t.assignedSeat?.id === seatId);

  const submit = (current: Tour) => bookingService.create({ tour: { id: current.id }, tickets: travelers });

  return { tour, freeSeats, travelers, limit, addTraveler, removeTraveler, chooseSeat, toggleMeal, takenBy, submit };
}
