import { EquipmentApi, ExerciseAPI, ExerciseInWorkoutAPI, IndividualExercise, RoutinePlan, TrainingPlan, TrainingPlanAPI, WorkoutAPI } from "../interfaces/entities/plan"
import { User } from "../interfaces/entities/user"
import { MuscleGroups } from "../types/muscles"

export const mapUserFromApiToUser = (user: any) : User => {
    
    let userLogged : User = {
        userId: user.id || "",
        userName: user.name || "",
        userEmail: user.email || "",
        userRole: user.roles[0] || "",
        userAge: user.userAge || 0,
        userGenre: user.userGenre || null,
        userNumberActivityDays: user.userNumberActivityDays || 0,
        userWeight: user.userWeight || 0,
        userHeight: user.userHeight || 0,
        userObjetive: user.userObjetive || null,
        userPhisicStatus: user.userPhisicStatus || null,
        userNumberComents: user.userNumberComents || 0,
        userNotificationsEnabled: user.userNotificationsEnabled || false,
        userHasMedicalProblems: user.userHasMedicalProblems || false,
        userMedicalProblemDetail: user.userMedicalProblemDetail || null,
        userPreferedSchedule: user.userPreferedSchedule || null,
        userProfileImgUrl: user.userProfileImgUrl || "",
        userTrainingDays: user.userTrainingDays || [],
    }
    return userLogged
}

export const mapToTrainingPlanFromApiToTrainingPlan = (data: any): TrainingPlan => {
    const mapDiaRutina = (dia: any): RoutinePlan => ({
        id: dia.id,
        nombre: dia.nombre,
        dificultad: dia.dificultad,
        oculto: dia.oculto,
        musculos: dia.musculos,
        ejercicios: dia.ejercicios.map((ejercicio: any): IndividualExercise => ({
            id: ejercicio.id,
            nombre: ejercicio.nombre,
            series: ejercicio.series,
            repeticiones: ejercicio.repeticiones,
            tiempoDescanso: ejercicio.tiempoDescanso
        }))
    });

    return {
        id: data.id,
        nombre: data.nombre,
        imagenPlanEntrenamiento: data.imagenPlanEntrenamiento,
        descripcion: data.descripcion,
        duracion: data.duracion,
        dificultad: data.dificultad,
        oculto: data.oculto,
        detalleDias: {
            lunes: typeof data.detalleDias.lunes === "string" ? "Descanso" : mapDiaRutina(data.detalleDias.lunes),
            martes: typeof data.detalleDias.martes === "string" ? "Descanso" : mapDiaRutina(data.detalleDias.martes),
            miércoles: typeof data.detalleDias.miércoles === "string" ? "Descanso" : mapDiaRutina(data.detalleDias.miércoles),
            jueves: typeof data.detalleDias.jueves === "string" ? "Descanso" : mapDiaRutina(data.detalleDias.jueves),
            viernes: typeof data.detalleDias.viernes === "string" ? "Descanso" : mapDiaRutina(data.detalleDias.viernes),
        }
    };
}

export const mapApiTrainingPlanToTrainingPlan = (data: any): TrainingPlanAPI[] => {
    return data.map((plan: any) => {
        return {
            id: plan.id,
            name: plan.name,
            level: plan.level,
            description: plan.description,
            startDate: plan.startDate,
            endDate: plan.endDate,
            workouts: [],
        }
    });
}

export const mapApiWorkoutToWorkout = (data: any): WorkoutAPI[] => {
    return data.map((workout: any) => {
        return {
            id: workout.id,
            name: workout.name,
            description: workout.description,
            frequency: workout.frequency,
            duration: workout.duration,
            level: workout.level,
            category: workout.category,
            trainingType: workout.trainingType,
            exercisesInWorkout: mapApiExerciseInWorkoutToPartialExerciseInWorkout(workout.exercisesInWorkout) || [],
            trainingPlans: [],
            isDeleted: workout.isDeleted,
        }
    });
}

export const mapApiExerciseToExercise = (data: any): ExerciseAPI[] => {
    return data.map((exercise: any) => {
        return {
            id: exercise.id,
            mediaUrl: exercise.mediaUrl,
            name: exercise.name,
            level: exercise.level,
            category: exercise.category,
            equipment: mapApiEquipmentToEquipment(exercise.equipments) || [],
            description: exercise.description,
            muscleGroups: mapApiMuscleGroupToMuscleGroup(exercise.muscleGroups) || [],
            recommendation: exercise.recommendation,
            workouts: [],
            isDeleted: exercise.isDeleted,
        }
    });
}

export const mapApiExerciseInWorkoutToPartialExerciseInWorkout = (data: any): Partial<ExerciseInWorkoutAPI>[] => {
    return data.map((exerciseInWorkout: any) => {
        return {
            id: exerciseInWorkout.id,
            workoutId: exerciseInWorkout.workoutId,
            exerciseId: exerciseInWorkout.exerciseId,
        }
    })
}

export const mapIndividualApiExerciseToExercise = (data: any): ExerciseAPI => {
    return mapApiExerciseToExercise([data])[0];
}

export const mapIndividualApiWorkoutToWorkout = (data: any): WorkoutAPI => {
    return mapApiWorkoutToWorkout([data])[0];
}

export const mapApiMuscleGroupToMuscleGroup = (data: any): MuscleGroups[] => {
    if (data.length === 0) return [];
    return data.map((muscleGroup: any) => {
        return muscleGroup.name;
    });
}
    
export const mapApiEquipmentToEquipment = (data: any): EquipmentApi[] => {
    return data.map((equipment: any) => {
        return {
            id: equipment.id,
            name: equipment.name,
            mediaUrl: equipment.mediaUrl,
            description: equipment.description,
            category: equipment.category,
            isDeleted: equipment.isDeleted,
            status: equipment.status,
        };
    });
}
