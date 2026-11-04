import { useCallback } from "react";
import { notificationService } from "@/services/notificationService";
import { useAsync } from "./useAsync";

export function useNotifications(userId: number) {
  const list = useAsync(useCallback(() => notificationService.list(userId), [userId]));
  const markRead = useCallback(async (id: number) => {
    await notificationService.markRead(id);
    await list.reload();
  }, [list]);
  return { ...list, markRead };
}
