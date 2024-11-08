import { MuscleGroups } from "@/types/types/muscles";

export type PlanRoutineLevel = 'Baja' | 'Media' | 'Alta'
export interface IndividualExercise {
    id: number;
    nombre: string;
    series: number;
    repeticiones: number;
    tiempoDescanso: number; 
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
