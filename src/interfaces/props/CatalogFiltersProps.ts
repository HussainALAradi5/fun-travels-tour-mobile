import type { TourCatalogFilter } from "@/interfaces/tour/TourCatalogFilter";

export interface CatalogFiltersProps {
  filter: TourCatalogFilter;
  active: boolean;
  onChange: (patch: TourCatalogFilter) => void;
  onDate: (key: "startDate" | "endDate", text: string) => void;
  onReset: () => void;
}
