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


