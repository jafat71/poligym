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
    imagen_comentario?: string,
    duracion: string,
    dificultad: string,
    user_id: string;
}