/** Support request states; mirrors the server's UserRequestStatus. */
export const UserRequestStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SOLVED: "SOLVED",
  UNSOLVED: "UNSOLVED",
} as const;

export type UserRequestStatus = (typeof UserRequestStatus)[keyof typeof UserRequestStatus];
