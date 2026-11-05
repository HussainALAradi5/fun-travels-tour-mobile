import { useCallback, useState } from "react";
import { PAGE_SIZE } from "@/constants/messages";
import type { TourCatalogFilter } from "@/interfaces/tour/TourCatalogFilter";
import { tourService } from "@/services/tourService";
import { useAsync } from "./useAsync";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** The public catalog with the web's filters: start and end country, and a travel date range. */
export function useTours() {
  const [filter, setFilter] = useState<TourCatalogFilter>({});
  const load = useCallback(() => tourService.catalog({ ...filter, size: PAGE_SIZE }), [filter]);
  const result = useAsync(load);
  const update = (patch: TourCatalogFilter) => setFilter((current) => ({ ...current, ...patch }));
  /** Dates come from the calendar as YYYY-MM-DD; an empty value removes the filter. */
  const setDate = (key: "startDate" | "endDate", text: string) => {
    if (text === "" || ISO_DATE.test(text)) update({ [key]: text || undefined });
  };
  const active = Object.values(filter).some((v) => v !== undefined);
  return { ...result, filter, update, setDate, reset: () => setFilter({}), active };
}
