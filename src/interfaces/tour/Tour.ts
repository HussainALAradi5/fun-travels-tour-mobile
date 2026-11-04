import type { MealPlan } from "./MealPlan";
import type { NamedSummary } from "./NamedSummary";

export interface Tour {
  id: number;
  tourNumber: string;
  title: string;
  description?: string;
  totalPrice: number;
  numberOfDays?: number;
  startDate: string;
  endDate?: string;
  maxCapacity: number;
  availableSlots: number;
  status: string;
  hasTransportation: boolean;
  startCity?: NamedSummary;
  endCity?: NamedSummary;
  startCountry?: NamedSummary;
  endCountry?: NamedSummary;
  agency?: NamedSummary;
  transportation?: { id: number; transportationNumber: string; type: string };
  availableMeals?: MealPlan[];
}
