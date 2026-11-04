import type { Href } from "expo-router";
import { ReferenceType } from "@/enums/ReferenceType";
import type { AppNotification } from "@/interfaces/notification/AppNotification";

/** Where a notification leads on mobile, matching the web's role-aware routes for customers. */
export function notificationRoute(notification: AppNotification): Href | null {
  const id = notification.referenceId;
  if (!id) return null;
  switch (notification.referenceType) {
    case ReferenceType.RESERVATION: return `/bookings/${id}`;
    case ReferenceType.TICKET: return `/tickets/${id}`;
    case ReferenceType.TOUR: return `/tours/${id}`;
    case ReferenceType.USER_REQUEST: return `/requests/${id}`;
    default: return null;
  }
}
