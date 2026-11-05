export const MESSAGES = {
  genericError: "Something went wrong. Please try again.",
  networkError: "Cannot reach the server. Check your connection.",
  sessionExpired: "Your session expired. Please sign in again.",
  emptyTours: "No tours are open for booking right now.",
  emptyBookings: "You have no bookings yet.",
  emptyNotifications: "You are all caught up.",
  emptyTransactions: "No wallet activity yet.",
  cancelReservationTitle: "Cancel reservation?",
  cancelReservationBody: "Paid bookings are refunded to your wallet under the agency's cancellation rules.",
  cancelTicketTitle: "Cancel this ticket?",
  resetSent: "If an account uses this email, a reset link has been sent.",
  resetDone: "Your password was changed. Sign in with the new password.",
  topUpOnWeb: "Refunds land here. Top up by card from the web app.",
  emptyPayments: "No payments yet.",
  emptyRequests: "No support requests yet.",
  emptyComments: "No replies yet.",
  emptyReports: "No reports yet. Use Export on bookings, wallet, or tours.",
  deleteRequestTitle: "Delete this request?",
  deleteReportTitle: "Delete this report?",
  profileSaved: "Profile updated.",
} as const;

export const MAX_TRAVELERS = 20;
export const PAGE_SIZE = 20;
