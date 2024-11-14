import { EquipmentApi, TrainingPlanAPI, WorkoutAPI } from "@/types/interfaces/entities/plan";
import axiosInstance from "./config";
import { mapApiEquipmentToEquipment, mapApiMuscleGroupToMuscleGroup, mapApiTrainingPlanToTrainingPlan, mapApiWorkoutToWorkout } from "@/types/mappers";
import { MuscleGroups } from "@/types/types/muscles";
import { getToken } from "../token/store";

interface FetchTrainingPlansResponse {
    plans: TrainingPlanAPI[];
    meta:  {
		totalTrainingPlans: number,
		page: number,
		lastPage: number
	}; 
}

interface FetchWorkoutsResponse {
    workouts: WorkoutAPI[];
    meta:  {    
        totalWorkouts: number,
        page: number,
        lastPage: number
    }; 
}


export const fetchTrainingPlansPaged = async (token: string, pageParam: number, limit: number = 5) : Promise<FetchTrainingPlansResponse> => {
    try {
        const response = await axiosInstance.get(`/training-plan/find-all?page=${pageParam+1}&limit=${limit}`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        ); //+1
        return { plans: mapApiTrainingPlanToTrainingPlan(response.data.data), meta: response.data.meta };
    } catch (error) {
        console.error('Error al obtener los planes de entrenamiento');
        throw error;
    }
}

export const fetchWorkoutsPaged = async (token: string,pageParam: number, limit: number = 5) : Promise<FetchWorkoutsResponse> => {
    try {
        const response = await axiosInstance.get(`/workout/find-all?page=${pageParam+1}&limit=${limit}`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        ); //+1
        return { workouts: mapApiWorkoutToWorkout(response.data.data), meta: response.data.meta };
    } catch (error) {
        console.error('Error al obtener las rutinas de entrenamiento');
        throw error;
    }
}

export const fetchTrainingPlans = async () : Promise<TrainingPlanAPI[]> => {
    try {
        const response = await axiosInstance.get(`/training-plan/find-all`);
        return mapApiTrainingPlanToTrainingPlan(response.data.data);
    } catch (error) {
        console.log(error);
        console.error('Error al obtener los planes de entrenamiento');
        throw error;
    }
}

export const fetchWorkouts = async (token: string) : Promise<WorkoutAPI[]> => {
    try {
        const response = await axiosInstance.get(`/workout/find-all`,{
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return mapApiWorkoutToWorkout(response.data.data);
    } catch (error) {
        console.error('Error al obtener las rutinas');
        throw error;
    }
}

export const fetchMuscleGroups = async (token: string) : Promise<MuscleGroups[]> => {
    try {
        const response = await axiosInstance.get(`/muscle-group/find-all`,{
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return mapApiMuscleGroupToMuscleGroup(response.data.data);
    } catch (error) {
        console.error('Error al obtener los grupos musculares');
        throw error;
    }
}

export const fetchEquipment = async (token: string) : Promise<EquipmentApi[]> => {
    try {
        const response = await axiosInstance.get(`/equipment/find-all`,{
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return mapApiEquipmentToEquipment(response.data.data);
    } catch (error) {
        console.error('Error al obtener los grupos musculares');
        throw error;
    }
}

