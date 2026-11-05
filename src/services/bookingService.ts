import { ENDPOINTS } from "@/config/endpoints";
import { PaymentMethod } from "@/enums/PaymentMethod";
import type { Reservation } from "@/interfaces/booking/Reservation";
import type { ReservationCreateRequest } from "@/interfaces/booking/ReservationCreateRequest";
import type { Ticket } from "@/interfaces/booking/Ticket";
import type { RefundQuoteResponseDto } from "@/dtos/tour-management/RefundQuoteResponseDto";
import type { PageRequest } from "@/interfaces/common/PageRequest";
import type { PageResponse } from "@/interfaces/common/PageResponse";
import { toQuery } from "@/utilities/format";
import { api } from "./apiClient";

export const bookingService = {
  mine: (page: PageRequest = {}) =>
    api.get<PageResponse<Reservation>>(ENDPOINTS.reservations.root + toQuery({ sortDir: "desc", ...page })),
  byId: (id: number) => api.get<Reservation>(ENDPOINTS.reservations.byId(id)),
  create: (request: ReservationCreateRequest) => api.post<Reservation>(ENDPOINTS.reservations.root, request),
  payWithWallet: (id: number) =>
    api.post<Reservation>(ENDPOINTS.payments.execute(id) + toQuery({ method: PaymentMethod.WALLET })),
  cancel: (id: number) => api.patch<Reservation>(ENDPOINTS.reservations.cancel(id)),
  tickets: (reservationId: number) =>
    api.get<PageResponse<Ticket>>(ENDPOINTS.tickets.search + toQuery({ reservationId, size: 50 })),
  cancelTicket: (id: number) => api.put<Ticket>(ENDPOINTS.tickets.cancel(id)),
  /** What cancelling now would refund, from the same rules as the cancellation. */
  refundQuote: (id: number) => api.get<RefundQuoteResponseDto>(ENDPOINTS.reservations.refundQuote(id)),
  ticketRefundQuote: (id: number) => api.get<RefundQuoteResponseDto>(ENDPOINTS.tickets.refundQuote(id)),
};
