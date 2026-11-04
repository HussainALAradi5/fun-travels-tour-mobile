import { ENDPOINTS } from "@/config/endpoints";
import type { AppNotification } from "@/interfaces/notification/AppNotification";
import type { NotificationCounts } from "@/interfaces/notification/NotificationCounts";
import { api } from "./apiClient";

export const notificationService = {
  list: (userId: number) => api.get<AppNotification[]>(ENDPOINTS.notifications.forUser(userId)),
  counts: (userId: number) => api.get<NotificationCounts>(ENDPOINTS.notifications.counts(userId)),
  markRead: (id: number) => api.put<AppNotification>(ENDPOINTS.notifications.read(id)),
};
