import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { profileService } from "@/services/profileService";
import { useAsync } from "./useAsync";

/** The profile tab's data: identity, agency placement, wallet, and membership date; refreshed on focus. */
export function useProfile() {
  const result = useAsync(useCallback(() => profileService.mine(), []));
  const { reload } = result;
  useFocusEffect(useCallback(() => { void reload(); }, [reload]));
  return result;
}
