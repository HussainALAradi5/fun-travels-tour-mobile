import type { TravelerDraft } from "../booking/TravelerDraft";
import type { MealPlan } from "../tour/MealPlan";
import type { Seat } from "../tour/Seat";
import type { TravelerKind } from "@/types/TravelerKind";

export interface TravelerEditorProps {
  index: number;
  traveler: TravelerDraft;
  seats: Seat[];
  meals: MealPlan[];
  isSeatTaken: (seatId: number) => boolean;
  onSeat: (seatId?: number) => void;
  onMeal: (mealId: number) => void;
  onKind: (kind: TravelerKind) => void;
  /** Copies this traveler's meals to everyone; absent for a single traveler. */
  onMealsForAll?: () => void;
}
