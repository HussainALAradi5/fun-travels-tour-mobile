import { ENDPOINTS } from "@/config/endpoints";
import type { CountryResponseDto } from "@/dtos/geography/CountryResponseDto";
import { api } from "./apiClient";

export const countryService = {
  /** Public list; used for phone dial codes before sign-in. */
  list: () => api.get<CountryResponseDto[]>(ENDPOINTS.countries),
};
