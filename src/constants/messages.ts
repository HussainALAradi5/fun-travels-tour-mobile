export const MESSAGES = {
  genericError: "Something went wrong. Please try again.",
  networkError: "Cannot reach the server. Check your connection.",
  sessionExpired: "Your session expired. Please sign in again.",
  emptyTours: "No tours are open for booking right now.",
  emptyBookings: "You have no bookings yet.",
  emptyNotifications: "You are all caught up.",
  emptyTransactions: "No wallet activity yet.",
  cancelReservationTitle: "Cancel reservation?",
  cancelReservationBody: "Paid bookings are refunded to your wallet: full refund more than 14 days before departure, 50% from 7 to 14 days, none inside 7 days.",
  cancelTicketTitle: "Cancel this ticket?",
  resetSent: "If an account uses this email, a reset link has been sent.",
} as const;

export const MAX_TRAVELERS = 20;
export const PAGE_SIZE = 20;
