import { EquipmentApi, ExerciseAPI, ExerciseInWorkoutAPI, TrainingPlanAPI, WorkoutAPI } from "@/types/interfaces/entities/plan";
import axiosInstance from "./config";
import { mapApiEquipmentToEquipment, mapApiExerciseInWorkoutToExerciseInWorkout, mapApiExerciseToExercise, mapApiMuscleGroupToMuscleGroup, mapApiNutritionPlanToNutritionPlan, mapApiTrainingPlanToTrainingPlan, mapApiWorkoutToWorkout, mapIndividualApiExerciseToExercise, mapIndividualApiNutritionPlanToNutritionPlan, mapIndividualApiTrainingPlanToTrainingPlan, mapIndividualApiWorkoutToWorkout } from "@/types/mappers";
import { MuscleGroups } from "@/types/types/muscles";
import { SocialPost } from "@/types/interfaces/entities/post";
import { NutritionPlan } from "@/types/interfaces/entities/foodplan";

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

interface FetchExercisesResponse {
    exercises: ExerciseAPI[];
    meta:  {    
        totalExercises: number,
        page: number,
        lastPage: number
    }; 
}

interface FetchFoodPlansResponse {
    plans: NutritionPlan[];
    meta:  {    
        totalPlans: number,
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

export const fetchExercisesPaged = async (token: string,pageParam: number, limit: number = 5) : Promise<FetchExercisesResponse> => {
    try {
        const response = await axiosInstance.get(`/exercise/find-all-exercises?page=${pageParam+1}&limit=${limit}`,
            { headers: { 'Authorization': `Bearer ${token}` } });
        return { exercises: mapApiExerciseToExercise(response.data.data), meta: response.data.meta };
    } catch (error) {
        console.error('Error al obtener ejercicios');
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

export const fetchExerciseById = async (token: string, id: string) : Promise<ExerciseAPI> => {
    try {
        const response = await axiosInstance.get(`/exercise/find-by-id/${id}`,{
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return mapIndividualApiExerciseToExercise(response.data);
    } catch (error) {
        console.error('Error al obtener el ejercicio ');
        console.log(error)
        throw error;
    }
}   


export const fetchWorkoutById = async (token: string, id: string) : Promise<WorkoutAPI> => {
    try {
        const response = await axiosInstance.get(`/workout/find-by-id/${id}`,{
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return mapIndividualApiWorkoutToWorkout(response.data);
    } catch (error) {
        console.error('Error al obtener la rutina ');
        console.log(error)
        throw error;
    }
}   

export const fetchTrainingPlanById = async (token: string, id: string) : Promise<TrainingPlanAPI> => {
    try {
        const response = await axiosInstance.get(`/training-plan/find-by-id/${id}`,{
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return mapIndividualApiTrainingPlanToTrainingPlan(response.data);
    } catch (error) {
        console.error('Error al obtener el plan de entrenamiento ');
        console.log(error)
        throw error;
    }
}

export const fetchFoodPlanById = async (token: string, id: string) : Promise<NutritionPlan> => {
    try {
        const response = await axiosInstance.get(`/nutrition/find-by-id/${id}`,{
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return mapIndividualApiNutritionPlanToNutritionPlan(response.data);
    } catch (error) {
        console.error('Error al obtener el plan de entrenamiento ');
        console.log(error)
        throw error;
    }
}   

export const fetchExercisesInWorkout = async (token: string, id: string) : Promise<ExerciseInWorkoutAPI> => {
    try {
        const response = await axiosInstance.get(`/workout/find-by-id-exercise-in-workout/${id}`,{
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return mapApiExerciseInWorkoutToExerciseInWorkout(response.data.data);
    } catch (error) {
        console.error('Error al obtener los ejercicios de la rutina ');
        console.log(error)
        throw error;
    }
}

export const fetchRecommendedWorkouts = async (token: string) : Promise<WorkoutAPI[]> => {
    try {
        const response = await axiosInstance.get(`/workout/find-all?page=1&limit=3`,{
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return mapApiWorkoutToWorkout(response.data.data);
    } catch (error) {
        console.error('Error al obtener las rutinas recomendadas');
        throw error;
    }
}

export const fetchRecommendedPlans = async (token: string) : Promise<TrainingPlanAPI[]> => {
    try {
        const response = await axiosInstance.get(`/training-plan/find-all?page=1&limit=3`,{
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return mapApiTrainingPlanToTrainingPlan(response.data.data);
    } catch (error) {
        console.error('Error al obtener los planes recomendados');
        throw error;
    }
}

export const createPost = async (token: string, post: SocialPost) => {
    try {
        //const response = await axiosInstance.post(`/post/create`, post, { headers: { 'Authorization': `Bearer ${token}` } });
        //return response.data;
        return post;
    } catch (error) {
        console.error('Error al crear la publicación');
        throw error;
    }
}

export const fetchFoodPlansPaged = async (token: string, pageParam: number, limit: number = 5) : Promise<FetchFoodPlansResponse> => {
    try {
        const response = await axiosInstance.get(`/nutrition/find-all?page=${pageParam+1}&limit=${limit}`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        ); //+1
        return { plans: mapApiNutritionPlanToNutritionPlan(response.data.data), meta: response.data.meta };
    } catch (error) {
        console.error('Error al obtener los planes de entrenamiento');
        throw error;
    }
}