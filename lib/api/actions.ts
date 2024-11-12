import { TrainingPlanAPI } from "@/types/interfaces/entities/plan";
import axiosInstance from "./config";
import { mapApiTrainingPlanToTrainingPlan } from "@/types/mappers";

export const fetchTrainingPlans = async () : Promise<TrainingPlanAPI[]> => {
    try {
        const response = await axiosInstance.get('/training-plan/find-all');
        return mapApiTrainingPlanToTrainingPlan(response.data.data);
    } catch (error) {
        console.error('Error al obtener los planes de entrenamiento');
        throw error;
    }
}

