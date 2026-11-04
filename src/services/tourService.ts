import { ENDPOINTS } from "@/config/endpoints";
import type { PageResponse } from "@/interfaces/common/PageResponse";
import type { Seat } from "@/interfaces/tour/Seat";
import type { Tour } from "@/interfaces/tour/Tour";
import type { TourCatalogFilter } from "@/interfaces/tour/TourCatalogFilter";
import { toQuery } from "@/utilities/format";
import { api } from "./apiClient";

export const tourService = {
  catalog: (filter: TourCatalogFilter = {}) => api.get<PageResponse<Tour>>(ENDPOINTS.tours.catalog + toQuery(filter)),
  byId: (id: number) => api.get<Tour>(ENDPOINTS.tours.byId(id)),
  /** Seat availability for this tour: seats held by its tickets come back as BOOKED. */
  seats: (tourId: number) => api.get<PageResponse<Seat>>(ENDPOINTS.seats.search + toQuery({ tourId, size: 100 })),
};
