import { MuscleGroups } from "@/types/types/muscles";

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
    dificultad: 'Baja' | 'Media' | 'Alta';
    oculto: boolean;
    musculos: MuscleGroups[];
    ejercicios: IndividualExercise[];
    imagenPortada?:string;
}

type DayRoutinePlan = RoutinePlan | "Descanso";

export interface TrainingPlan {
    id: number;
    nombre: string;
    imagenPlanEntrenamiento: string;
    descripcion: string;
    duracion: number;
    dificultad: 'Baja' | 'Media' | 'Alta';
    oculto: boolean;
    detalleDias: {
        lunes: DayRoutinePlan;
        martes: DayRoutinePlan;
        miércoles: DayRoutinePlan;
        jueves: DayRoutinePlan;
        viernes: DayRoutinePlan;
    };
}
