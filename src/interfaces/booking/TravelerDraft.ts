import type { TravelerKind } from "@/types/TravelerKind";
import type { TicketSelection } from "./TicketSelection";

/** One traveler while booking: the ticket selection sent to the server, plus who it is for. */
export interface TravelerDraft extends TicketSelection {
  kind: TravelerKind;
}
