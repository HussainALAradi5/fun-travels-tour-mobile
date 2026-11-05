import { useCallback, useMemo, useState } from "react";
import { MAX_TRAVELERS } from "@/constants/messages";
import { SeatStatus } from "@/enums/SeatStatus";
import type { TravelerDraft } from "@/interfaces/booking/TravelerDraft";
import type { Tour } from "@/interfaces/tour/Tour";
import { bookingService } from "@/services/bookingService";
import { tourService } from "@/services/tourService";
import type { TravelerKind } from "@/types/TravelerKind";
import { autoPickSeats, estimateBooking } from "@/utilities/booking";
import { useAsync } from "./useAsync";

const adult = (): TravelerDraft => ({ kind: "ADULT" });

/** Tour details plus the group (adults and children) and each traveler's seat and meal choices. */
export function useBookingForm(tourId: number) {
  const tour = useAsync(useCallback(() => tourService.byId(tourId), [tourId]));
  const seats = useAsync(useCallback(() => tourService.seats(tourId), [tourId]), Boolean(tour.data?.hasTransportation));
  const [travelers, setTravelers] = useState<TravelerDraft[]>([adult()]);

  const allSeats = useMemo(() => seats.data?.content ?? [], [seats.data]);
  const freeSeats = useMemo(() => allSeats.filter((seat) => seat.status === SeatStatus.AVAILABLE), [allSeats]);
  const limit = Math.min(MAX_TRAVELERS, tour.data?.availableSlots ?? 0);
  const adults = travelers.filter((t) => t.kind === "ADULT").length;
  const children = travelers.length - adults;

  /** Sets the group in one step and keeps the choices already made for travelers that stay. */
  const setGroup = (nextAdults: number, nextChildren: number) => {
    if (nextAdults < 1 || nextChildren < 0 || nextAdults + nextChildren > limit) return;
    setTravelers((list) => {
      const keep = (kind: TravelerKind, wanted: number) => {
        const current = list.filter((t) => t.kind === kind).slice(0, wanted);
        while (current.length < wanted) current.push({ kind });
        return current;
      };
      return [...keep("ADULT", nextAdults), ...keep("CHILD", nextChildren)];
    });
  };

  const setKind = (index: number, kind: TravelerKind) =>
    setTravelers((list) => list.map((t, i) => (i === index ? { ...t, kind } : t)));

  const chooseSeat = (index: number, seatId?: number) =>
    setTravelers((list) => list.map((t, i) => (i === index ? { ...t, assignedSeat: seatId ? { id: seatId } : undefined } : t)));

  const toggleMeal = (index: number, mealId: number) =>
    setTravelers((list) => list.map((t, i) => {
      if (i !== index) return t;
      const meals = t.selectedMeals ?? [];
      const has = meals.some((m) => m.id === mealId);
      return { ...t, selectedMeals: has ? meals.filter((m) => m.id !== mealId) : [...meals, { id: mealId }] };
    }));

  /** Copies one traveler's meals to the whole group. */
  const mealsForAll = (index: number) =>
    setTravelers((list) => list.map((t) => ({ ...t, selectedMeals: [...(list[index].selectedMeals ?? [])] })));

  const seatEveryone = () => setTravelers((list) => autoPickSeats(list, freeSeats));

  const takenBy = (seatId: number, index: number) => travelers.some((t, i) => i !== index && t.assignedSeat?.id === seatId);

  const estimate = tour.data ? estimateBooking(tour.data, travelers, allSeats) : null;

  const submit = (current: Tour) => bookingService.create({
    tour: { id: current.id },
    tickets: travelers.map(({ assignedSeat, selectedMeals }) => ({ assignedSeat, selectedMeals })),
  });

  return { tour, freeSeats, travelers, limit, adults, children, setGroup, setKind, chooseSeat, toggleMeal, mealsForAll,
    seatEveryone, takenBy, estimate, submit };
}
