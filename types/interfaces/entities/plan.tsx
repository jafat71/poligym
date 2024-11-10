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

