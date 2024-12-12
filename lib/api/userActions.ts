import { User } from "@/types/interfaces/entities/user";
import axiosInstance from "./config";

export const updateUser = async (token: string, userId: string, user: Partial<User>) => {
    console.log("USER", user)
    try {   
        const response = await axiosInstance.patch(`/user/update-user/${userId}`, user, { headers: { 'Authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.log(error)
        console.error('Error al actualizar el usuario');
        throw error;
    }
}

export const getUserPlans = async (token: string, userId: string) => {
    try {
        const response = await axiosInstance.get(`/user/find-nutrition-plans/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los planes del usuario');
        throw error;
    }
}

export const getUserWorkouts = async (token: string, userId: string) => {
    try {
        const response = await axiosInstance.get(`/user/find-workouts/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error('Error al obtener las rutinas del usuario');
        throw error;
    }
}

