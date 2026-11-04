export interface MealPlan {
  id: number;
  mealName: string;
  mealPrice: number;
  mealDescription?: string;
  dietaryTypes?: string[];
  spiceLevel?: string;
}
