import { useCallback } from "react";
import { PAGE_SIZE } from "@/constants/messages";
import { tourService } from "@/services/tourService";
import { useAsync } from "./useAsync";

export function useTours() {
  const load = useCallback(() => tourService.catalog({ size: PAGE_SIZE }), []);
  return useAsync(load);
}
