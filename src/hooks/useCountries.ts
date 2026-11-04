import { useCallback } from "react";
import { countryService } from "@/services/countryService";
import { useAsync } from "./useAsync";

/** The public country list, loaded once per screen. */
export function useCountries() {
  return useAsync(useCallback(() => countryService.list(), []));
}
