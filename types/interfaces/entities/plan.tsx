import { MuscleGroups } from "@/types/types/muscles";

export type PlanRoutineLevel = 'Baja' | 'Media' | 'Alta'
export interface IndividualExercise {
    id: number;
    nombre: string;
    series: number;
    repeticiones: number;
    tiempoDescanso: number; 
}

export interface LibraryExercise {
    id: number;
    nombre: string;
    url: string;
    dificultad: PlanRoutineLevel;
    categoria: string;
    implemento: string;
    musculos: MuscleGroups[];
}

export interface RoutinePlan {
    id: number;
    nombre: string;
    dificultad: PlanRoutineLevel;
    oculto: boolean;
    musculos: MuscleGroups[];
    ejercicios: IndividualExercise[];
    imagenPortada?:string;
}

export interface RoutinePlanUser extends RoutinePlan {
    isCompleted?: boolean;
    onComplete?: (isCompleted: boolean) => void;
}

type DayRoutinePlan = RoutinePlanUser | "Descanso";

export interface TrainingPlan {
    id: number;
    nombre: string;
    imagenPlanEntrenamiento: string;
    descripcion: string;
    duracion: number;
    dificultad: PlanRoutineLevel;
    oculto: boolean;
    detalleDias: {
        lunes: DayRoutinePlan;
        martes: DayRoutinePlan;
        miércoles: DayRoutinePlan;
        jueves: DayRoutinePlan;
        viernes: DayRoutinePlan;
    };
}


export interface AlimentaciónDetalleDias {
    [dia: string]: {
        desayuno: string;
        almuerzo: string;
        cena: string;
    };
}

export interface PlanAlimentacion {
    id: number;
    nombre: string;
    imagenPlanAlimentacion: string;
    descripcion: string;
    usos: number;
    duracion: number; // en semanas
    categoria: string;
    oculto: boolean;
    detalleDias: AlimentaciónDetalleDias;
}

export interface LastRoutineUser {
    rutina: RoutinePlan;
    duracion: string;
    fecha: string;
    musculos: MuscleGroups[];
}

export interface LastAlimentationPlan {
    plan: PlanAlimentacion;
    fecha: string;
    estado: "Activo" | "Finalizado";
}

export interface LastTrainingPlan {
    plan: TrainingPlan;
    dificultad: PlanRoutineLevel;
    fecha: string;
    estado: "Activo" | "Finalizado";
}

//----------------------------------

export interface TrainingPlanAPI {
    id: number;
    name: string;
    level: Difficulty;
    description?: string;
    startDate: Date;
    endDate?: Date;
    workouts: WorkoutAPI[];
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?:string; //!add bk
  }
  
  // Workout Interface
  export interface WorkoutAPI {
    id: number;
    name: string;
    description?: string;
    frequency: number;
    duration: number;
    level: Difficulty;
    category: Category;
    trainingType: string;
    exercisesInWorkout: ExerciseInWorkoutAPI[];
    trainingPlans: TrainingPlanAPI[];
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // ExerciseInWorkout Interface
  export interface ExerciseInWorkoutAPI {
    id: number;
    exercise: ExerciseAPI;
    exerciseId: number;
    workout: WorkoutAPI;
    workoutId: number;
    sets: number;
    reps: number;
    weight?: number;
    restTime: number;
    order: number;
    isDeleted: boolean;
  }
  
  // Exercise Interface
  export interface ExerciseAPI {
    id: number;
    mediaUrl: string;
    name: string;
    level: Difficulty;
    category: Category;
    equipment: EquipmentApi[];
    description: string;
    muscleGroups: MuscleGroups[];
    recommendation?: string;
    workouts: ExerciseInWorkoutAPI[];
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
    category: EquipmentCategory;        
    exercise: ExerciseAPI[];               
    isDeleted: boolean;                 
    status: EquipmentStatus;            
  }
  
  // Enums for Difficulty and Category
  export enum Difficulty {
    BASIC = "BASIC",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
  }
  
  export enum Category {
    CARDIO = "CARDIO",
    STRENGTH = "STRENGTH",
    FLEXIBILITY = "FLEXIBILITY",
  }
  
  export enum EquipmentCategory {
    MACHINE = "MACHINE",
    FREE_WEIGHT = "FREE_WEIGHT",
    CARDIO = "CARDIO",
    ACCESSORY = "ACCESSORY",
    BODYWEIGHT = "BODYWEIGHT",
  }
  
  export enum EquipmentStatus {
    AVAILABLE = "AVAILABLE",
    IN_MAINTENANCE = "IN_MAINTENANCE",
    OUT_OF_ORDER = "OUT_OF_ORDER",
  }