import { useCallback } from "react";
import { bookingService } from "@/services/bookingService";
import { useAsync } from "./useAsync";

export function useReservations() {
  return useAsync(useCallback(() => bookingService.mine({ size: 50 }), []));
}
