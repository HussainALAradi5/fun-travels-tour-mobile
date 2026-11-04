import type { Ticket } from "../booking/Ticket";

export interface TicketCardProps {
  ticket: Ticket;
  onCancel?: () => void;
  onView?: () => void;
}
