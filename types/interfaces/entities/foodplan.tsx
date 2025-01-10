export enum FOODPLAN_CATEGORY {
    ALL = 'Todos',
    WEIGHT_LOSS = 'Pérdida de peso',
    MUSCLE_GAIN = 'Volumen',
    DEFINITION = 'Definición',
  }
  
export enum DAY_OF_WEEK {
    MONDAY = "Lunes",
    TUESDAY = "Martes",
    WEDNESDAY = "Miércoles",
    THURSDAY = "Jueves",
    FRIDAY = "Viernes",
    SATURDAY = "Sábado",
    SUNDAY = "Domingo",
  }
  
export enum MEAL_TYPES {
    BREAKFAST = "Desayuno",
    LUNCH = "Almuerzo",
    DINNER = "Cena",
  }
  
export interface NutritionPlan {
    id: string;
    name: string;
    description: string;
    imageURL: string;
    duration: number;
    category: FOODPLAN_CATEGORY;
    weeklyMeals: WeeklyMeal[];
    score: number;
    totalRatings: number;
  }
  
export interface WeeklyMeal {
    id: string;
    nutritionPlanId: string;
    dayOfWeek: DAY_OF_WEEK;
    meals: Meal[];
  }
  
export interface Meal {
    id: string;
    weeklyMealId: string;
    type: MEAL_TYPES;
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
  