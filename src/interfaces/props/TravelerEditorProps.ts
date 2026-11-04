import type { TicketSelection } from "../booking/TicketSelection";
import type { MealPlan } from "../tour/MealPlan";
import type { Seat } from "../tour/Seat";

export interface TravelerEditorProps {
  index: number;
  traveler: TicketSelection;
  seats: Seat[];
  meals: MealPlan[];
  isSeatTaken: (seatId: number) => boolean;
  onSeat: (seatId?: number) => void;
  onMeal: (mealId: number) => void;
}
