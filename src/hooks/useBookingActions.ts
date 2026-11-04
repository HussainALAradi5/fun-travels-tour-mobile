import { MESSAGES } from "@/constants/messages";
import { bookingService } from "@/services/bookingService";
import { useAction } from "./useAction";
import { useConfirm } from "./useConfirm";

/** Pay, cancel, and per-ticket cancellation for one reservation, each followed by a reload. */
export function useBookingActions(reservationId: number, reload: () => Promise<void>) {
  const { pending, run } = useAction();
  const confirm = useConfirm();
  const pay = () => run(async () => {
    await bookingService.payWithWallet(reservationId);
    await reload();
  });
  const cancel = () => confirm(MESSAGES.cancelReservationTitle, MESSAGES.cancelReservationBody, () => run(async () => {
    await bookingService.cancel(reservationId);
    await reload();
  }));
  const cancelTicket = (ticketId: number) => confirm(MESSAGES.cancelTicketTitle, MESSAGES.cancelReservationBody, () => run(async () => {
    await bookingService.cancelTicket(ticketId);
    await reload();
  }));
  return { pending, pay, cancel, cancelTicket };
}
