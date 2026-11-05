import { MESSAGES } from "@/constants/messages";
import { bookingService } from "@/services/bookingService";
import { refundMessage } from "@/utilities/refundMessage";
import { useAction } from "./useAction";
import { useConfirm } from "./useConfirm";

/** Pay, cancel, and per-ticket cancellation for one reservation; cancelling first shows the exact refund. */
export function useBookingActions(reservationId: number, reload: () => Promise<void>) {
  const { pending, run } = useAction();
  const confirm = useConfirm();
  const pay = () => run(async () => {
    await bookingService.payWithWallet(reservationId);
    await reload();
  });
  const cancel = async () => {
    const quote = await bookingService.refundQuote(reservationId).catch(() => null);
    confirm(MESSAGES.cancelReservationTitle, refundMessage(quote, MESSAGES.cancelReservationBody), () => run(async () => {
      await bookingService.cancel(reservationId);
      await reload();
    }));
  };
  const cancelTicket = async (ticketId: number) => {
    const quote = await bookingService.ticketRefundQuote(ticketId).catch(() => null);
    confirm(MESSAGES.cancelTicketTitle, refundMessage(quote, MESSAGES.cancelReservationBody), () => run(async () => {
      await bookingService.cancelTicket(ticketId);
      await reload();
    }));
  };
  return { pending, pay, cancel, cancelTicket };
}
