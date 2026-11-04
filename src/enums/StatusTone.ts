import { GenericStatus } from "./GenericStatus";

export type Tone = "success" | "warning" | "danger" | "muted" | "primary";

/** One place for status colors; ticket statuses share these names. */
export const STATUS_TONE: Record<string, Tone> = {
  [GenericStatus.PENDING]: "warning",
  [GenericStatus.APPROVED]: "primary",
  [GenericStatus.CONFIRMED]: "success",
  [GenericStatus.ACTIVE]: "success",
  [GenericStatus.COMPLETED]: "muted",
  [GenericStatus.CANCELLED]: "danger",
  [GenericStatus.REJECTED]: "danger",
  [GenericStatus.INACTIVE]: "muted",
};
