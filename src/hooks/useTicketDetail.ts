import { useCallback } from "react";
import { Alert } from "react-native";
import { MESSAGES } from "@/constants/messages";
import { TicketStatus } from "@/enums/TicketStatus";
import { ticketService } from "@/services/ticketService";
import { tourService } from "@/services/tourService";
import { useAction } from "./useAction";
import { useAsync } from "./useAsync";

/** A ticket with its full tour (the ticket only carries a tour summary), plus cancellation. */
export function useTicketDetail(id: number) {
  const ticket = useAsync(useCallback(() => ticketService.byId(id), [id]));
  const tourId = ticket.data?.tour?.id;
  const tour = useAsync(useCallback(() => tourService.byId(tourId ?? 0), [tourId]), Boolean(tourId));
  const { pending, run } = useAction();
  const status = ticket.data?.ticketStatus;
  const active = status !== TicketStatus.CANCELLED && status !== TicketStatus.COMPLETED;
  const cancel = () => Alert.alert(MESSAGES.cancelTicketTitle, MESSAGES.cancelReservationBody, [
    { text: "Keep ticket", style: "cancel" },
    { text: "Cancel ticket", style: "destructive", onPress: () => void run(async () => {
      await ticketService.cancel(id);
      await ticket.reload();
    }) },
  ]);
  return { ticket, tour, active, cancel, pending };
}
