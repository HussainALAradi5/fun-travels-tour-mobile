import type { TicketStatus } from "@/enums/TicketStatus";

export interface Ticket {
  id: number;
  ticketNumber: string;
  tour: { id: number; tourNumber: string; title: string };
  assignedSeat?: { id: number; seatCode: string } | null;
  basePrice: number;
  discountPrice: number;
  seatPriceModifier: number;
  totalPrice: number;
  paid: boolean;
  ticketStatus: TicketStatus;
  hasMealPlan: boolean;
  qrCode?: string;
}
