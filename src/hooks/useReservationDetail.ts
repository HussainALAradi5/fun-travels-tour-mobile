import { useCallback } from "react";
import { bookingService } from "@/services/bookingService";
import { useAsync } from "./useAsync";

export function useReservationDetail(id: number) {
  const reservation = useAsync(useCallback(() => bookingService.byId(id), [id]));
  const tickets = useAsync(useCallback(() => bookingService.tickets(id), [id]));
  const reload = useCallback(async () => {
    await Promise.all([reservation.reload(), tickets.reload()]);
  }, [reservation, tickets]);
  return { reservation, tickets, reload };
}
