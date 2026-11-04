import type { EntityReference } from "../common/EntityReference";

/** One traveler. Prices are always calculated by the server. */
export interface TicketSelection {
  assignedSeat?: EntityReference;
  selectedMeals?: EntityReference[];
}
