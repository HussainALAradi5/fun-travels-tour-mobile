import type { GenericStatus } from "@/enums/GenericStatus";

export interface Reservation {
  id: number;
  reservationNumber: string;
  tour: { id: number; tourNumber: string; title: string };
  user: { id: number; name: string };
  requestedSlots: number;
  totalPrice: number;
  status: GenericStatus;
  bookingDate: string;
  holdExpiresAt?: string | null;
}
