import { NutritionPlan } from "./foodplan";
import { TrainingPlanAPI, WorkoutAPI } from "./plan";

export type Role = "USER" | "ADMIN"

export interface User {
    id: string,
    avatarUrl?: string,
    email: string,
    name: string,
    age?: number,
    gender?: GENDER,
    lastLogin?: Date,
    role: ROLE,
    weight?: number,
    height?: number,
    fitnessLevel?: FITNESS_LEVEL,
    goal?: GOAL,
    injury?: string,
    userType: USER_TYPE,
    nutritionIds: string[],
    trainingPlanIds: number[],
    workoutIds: number[],
    isActive: boolean,

    userNumberActivityDays?: number,
}

export enum GENDER {
    MALE = "Másculino",
    FEMALE = "Femenino",
    OTHER = "Otro",
  }

export enum USER_TYPE {
    STUDENT = 'Estudiante',
    PROFESSOR = 'Profesor',
    ADMINISTRATION = 'Administrativo'
}

export enum FITNESS_LEVEL {
    BEGINNER = 'Principiante',
    INTERMEDIATE = 'Intermedio',
    ADVANCED = 'Avanzado'
}

export enum GOAL {
    LOSE_WEIGHT = 'Bajar de peso',
    GAIN_MUSCLE = 'Ganar músculo',
    IMPROVE_ENDURANCE = 'Mejorar resistencia',
    MAINTAIN = 'Mantenerse en forma',
}

export enum ROLE {
    USER_ROLE = 'Usuario',
    ADMIN_ROLE = 'Administrador'
}

export enum HAS_INJURY {
    YES = 'Si',
    NO = 'No'
}
