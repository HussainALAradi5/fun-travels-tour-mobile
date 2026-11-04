import { ENDPOINTS } from "@/config/endpoints";
import type { PaymentResponseDto } from "@/dtos/payment/PaymentResponseDto";
import type { TransactionResponseDto } from "@/dtos/payment/TransactionResponseDto";
import type { PageRequest } from "@/interfaces/common/PageRequest";
import type { PageResponse } from "@/interfaces/common/PageResponse";
import { toQuery } from "@/utilities/format";
import { api } from "./apiClient";

/** Booking payments and wallet ledger entries; the server limits customers to their own. */
export const paymentService = {
  mine: (page: PageRequest = {}) => api.get<PageResponse<PaymentResponseDto>>(ENDPOINTS.payments.root + toQuery({ sortDir: "desc", ...page })),
  byId: (id: number) => api.get<PaymentResponseDto>(ENDPOINTS.payments.byId(id)),
  transaction: (id: number) => api.get<TransactionResponseDto>(ENDPOINTS.transactions.byId(id)),
};
