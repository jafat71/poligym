import { MuscleGroups } from "@/types/types/muscles";
export type PlanRoutineLevel = 'Baja' | 'Media' | 'Alta'

export interface TrainingPlanAPI {
    id: number;
    name: string;
    level: DIFFICULTY;
    description?: string;
    startDate: Date;
    endDate?: Date;
    workouts: WorkoutAPI[];
    isDeleted: boolean;
    image?:string; //!add bk
  }
  
  // Workout Interface
  export interface WorkoutAPI {
    id: number;
    name: string;
    description?: string;
    frequency: number;
    duration: number;
    level: DIFFICULTY;
    category: CATEGORY;
    trainingType: string;
    exercisesInWorkout: ExerciseInWorkoutAPI[];
    exercises: ExerciseAPI[];
    isDeleted: boolean;
    score: number;
    totalRatings: number;
  }
  
  // ExerciseInWorkout Interface
  export interface ExerciseInWorkoutAPI {
    id: number;
    exercise: ExerciseAPI;
    exerciseId: number;
    workoutId: number;
    sets: number;
    reps: number;
    weight?: number;
    restTime: number;
    order: number;
  }
  
  // Exercise Interface
  export interface ExerciseAPI {
    id: number;
    mediaUrl: string;
    name: string;
    level: DIFFICULTY;
    category: CATEGORY;
    equipment: EquipmentApi[];
    description: string;
    muscleGroups: MuscleGroups[];
    recommendation?: string;
    workouts: WorkoutAPI[];
    isDeleted: boolean;
  }
  
  // MuscleGroup Interface
  export interface MuscleGroup {
    id: number;
    name: string;
    description?: string;
    isDeleted: boolean;
    exercises: ExerciseAPI[];
  }

  export interface EquipmentApi {
    id: number;                         
    name: string;                       
    mediaUrl: string;                   
    description?: string | null;        
    category: EQUIPMENT_CATEGORY;        
    exercise: ExerciseAPI[];               
    isDeleted: boolean;                 
    status: EQUIPMENT_STATUS;            
  }

  export enum DIFFICULTY{
    ALL = 'Todos',
    BASIC = 'Principiante',
    INTERMEDIATE = 'Intermedio',
    ADVANCED = 'Avanzado'
  }
  
  export enum CATEGORY {
    ALL = 'Todos',
    CARDIO = "Cardio",
    STRENGTH = "Fuerza",
    FLEXIBILITY = "Flexibilidad",
  }

  export enum EQUIPMENT_CATEGORY {
    MACHINE = "Máquina",
    FREE_WEIGHT = "Peso Libre",
    CARDIO = "Cardio",
    ACCESSORY = "Accesorio",
    BODYWEIGHT = "Peso corporal",
  }
  
  export enum EQUIPMENT_STATUS {
    AVAILABLE = "Disponible",
    IN_MAINTENANCE = "En mantenimiento",
    OUT_OF_ORDER = "Fuera de servicio",
  }


