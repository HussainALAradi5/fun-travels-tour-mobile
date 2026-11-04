import { ENDPOINTS } from "@/config/endpoints";
import type { Ticket } from "@/interfaces/booking/Ticket";
import type { PageRequest } from "@/interfaces/common/PageRequest";
import type { PageResponse } from "@/interfaces/common/PageResponse";
import { toQuery } from "@/utilities/format";
import { api } from "./apiClient";

export const ticketService = {
  mine: (page: PageRequest = {}) => api.get<PageResponse<Ticket>>(ENDPOINTS.tickets.search + toQuery({ sortDir: "desc", ...page })),
  byId: (id: number) => api.get<Ticket>(ENDPOINTS.tickets.byId(id)),
  cancel: (id: number) => api.put<Ticket>(ENDPOINTS.tickets.cancel(id)),
};
