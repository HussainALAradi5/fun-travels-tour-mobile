import type { EntityReference } from "../common/EntityReference";
import type { TicketSelection } from "./TicketSelection";

export interface ReservationCreateRequest {
  tour: EntityReference;
  requestedSlots?: number;
  tickets?: TicketSelection[];
}
