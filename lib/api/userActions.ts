import { User } from "@/types/interfaces/entities/user";
import axiosInstance from "./config";

export const updateUser = async (token: string, userId: string, user: Partial<User>) => {
    try {   
        const response = await axiosInstance.patch(`/user/update-user/${userId}`, user, { headers: { 'Authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.log("ERROR------------------------")
        console.log(error)
        console.error('Error al actualizar el usuario');
        throw error;
    }
}
