export enum Category {
    WEIGHT_LOSS,
    MUSCLE_GAIN,
    DEFINITION,
  }
  
export enum DayOfWeek {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY",
  }
  
export enum MealType {
    BREAKFAST = "BREAKFAST",
    LUNCH = "LUNCH",
    DINNER = "DINNER",
  }
  
export interface NutritionPlan {
    id: string;
    name: string;
    description: string;
    imageURL: string;
    duration: number;
    category: Category;
    weeklyMeals: WeeklyMeal[];
  }
  
export interface WeeklyMeal {
    id: string;
    nutritionPlanId: string;
    dayOfWeek: DayOfWeek;
    meals: Meal[];
  }
  
export interface Meal {
    id: string;
    weeklyMealId: string;
    type: MealType;
    name: string;
    description: string;
    imageUrl?: string | null;
    foods: Food[];
  }
  
export interface Food {
    id: string;
    mealId: string;
    name: string;
    description: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    imageUrl?: string | null;
  }
  