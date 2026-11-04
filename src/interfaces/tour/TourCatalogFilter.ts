import type { PageRequest } from "../common/PageRequest";

export interface TourCatalogFilter extends PageRequest {
  startCountryId?: number;
  endCountryId?: number;
  startDate?: string;
  endDate?: string;
}
