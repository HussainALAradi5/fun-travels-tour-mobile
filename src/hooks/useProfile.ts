import { useCallback } from "react";
import { profileService } from "@/services/profileService";
import { useAsync } from "./useAsync";

/** The profile tab's data: identity, agency placement, wallet, and membership date. */
export function useProfile() {
  const load = useCallback(() => profileService.mine(), []);
  return useAsync(load);
}
