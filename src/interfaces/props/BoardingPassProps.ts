import type { Ticket } from "@/interfaces/booking/Ticket";
import type { Tour } from "@/interfaces/tour/Tour";

export interface BoardingPassProps {
  ticket: Ticket;
  /** The full tour, null until it loads; dates fall back to the ticket's tour summary. */
  tour: Tour | null;
}
