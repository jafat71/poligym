import { PlanRoutineLevel } from "./plan";

export interface SocialPost {
    id: number;
    imagenPerfil: string;
    nombre: string;
    fecha: string;
    publico: boolean;
    oculto: boolean;
    mensaje: string;
    likes: number;
    rutina: string;
    imagenComentario?: string,
    duracion: string,
    dificultad: string,
}