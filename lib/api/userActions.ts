import { User } from "@/types/interfaces/entities/user";
import axiosInstance from "./config";
import { mapApiNutritionPlanToNutritionPlan, mapApiTrainingPlanToTrainingPlan, mapApiWorkoutToWorkout } from "@/types/mappers";
import { TargetType } from "@/constants";
import { AxiosError } from "axios";

export const updateUser = async (token: string, userId: string, user: Partial<User>) => {
    try {   
        const response = await axiosInstance.patch(`/user/update-user/${userId}`, user, { headers: { 'Authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.log(error)
        console.error('Error al actualizar el usuario');
        throw error;
    }
}

export const getUserFoodPlans = async (token: string, userId: string) => {
    try {
        const response = await axiosInstance.get(`/user/find-nutrition-plans/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        return mapApiNutritionPlanToNutritionPlan(response.data);
    } catch (error) {
        console.error('Error al obtener los planes del usuario');
        throw error;
    }
}

export const getUserTrainingPlans = async (token: string, userId: string) => {
    try {
        const response = await axiosInstance.get(`/user/find-training-plans/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        return mapApiTrainingPlanToTrainingPlan(response.data);
    } catch (error) {
        console.error('Error al obtener los planes de entrenamiento del usuario');
        throw error;
    }
}

export const getUserWorkouts = async (token: string, userId: string) => {
    try {
        const response = await axiosInstance.get(`/user/find-workouts/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        return mapApiWorkoutToWorkout(response.data);
    } catch (error) {
        console.error('Error al obtener las rutinas del usuario');
        throw error;
    }
}

export const rateTarget = async (
    targetType: TargetType, 
    targetId: string, 
    score: number,
    token: string, 
) => {
    const body = {
        targetId,
        targetType,
        score
    }
    console.log("BODY", body)
    try {
        const response = await axiosInstance.post(`/rating`, body, { headers: { 'Authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError){
            if (error.response?.data.message){
                throw new Error(error.response?.data.message);
            }
            if (error.response?.data.error){
                throw new Error(error.response?.data.error);
            }
        }
        throw error;
    }
}
