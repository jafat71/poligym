import { Food, FOODPLAN_CATEGORY, Meal, NutritionPlan, WeeklyMeal } from "../interfaces/entities/foodplan"
import { CATEGORY, DIFFICULTY, EquipmentApi, ExerciseAPI, ExerciseInWorkoutAPI, IndividualExercise, RoutinePlan, TrainingPlan, TrainingPlanAPI, WorkoutAPI } from "../interfaces/entities/plan"
import { SocialPost } from "../interfaces/entities/post"
import { User } from "../interfaces/entities/user"
import { MuscleGroups } from "../types/muscles"

export const mapUserFromApiToUser = (user: any) : User => {
    
    let userLogged : User = {
        id: user.id || "",
        avatarUrl: user.avatarUrl || "",
        name: user.name || "",
        email: user.email || "",
        age: user.age || 0,
        gender: user.gender || null,
        lastLogin: user.lastLogin || null,
        weight: user.weight || 0,
        height: user.height || 0,
        fitnessLevel: user.fitnessLevel || null,
        goal: user.goal || null,
        injury: user.injury || null,
        role: user.roles || [],
        userType: user.userType || "",
        nutritionIds: user.nutritionIds || [],
        trainingPlanIds: user.trainingPlanIds || [],
        workoutIds: user.workoutIds || [],
        isActive: user.isActive || false,
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
            level: DIFFICULTY[plan.level as unknown as keyof typeof DIFFICULTY] || DIFFICULTY.ALL,
            description: plan.description,
            startDate: plan.startDate ? new Date(plan.startDate) : null,
            endDate: plan.endDate ? new Date(plan.endDate) : null,
            workouts: mapApiWorkoutToPartialWorkout(plan.workouts) || [],
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
            level: DIFFICULTY[workout.level as unknown as keyof typeof DIFFICULTY] || DIFFICULTY.ALL,
            category: CATEGORY[workout.category as unknown as keyof typeof CATEGORY] || CATEGORY.ALL,
            trainingType: workout.trainingType,
            exercisesInWorkout: mapApiExerciseInWorkoutToPartialExerciseInWorkout(workout.exercisesInWorkout) || [],
            isDeleted: workout.isDeleted,
            score: workout.score ?? 0,
            totalRatings: workout.totalRatings ?? 0,
        }
    });
}

export const mapApiExerciseToExercise = (data: any): ExerciseAPI[] => {
    return data.map((exercise: any) => {
        return {
            id: exercise.id,
            mediaUrl: exercise.mediaUrl,
            name: exercise.name,
            level: DIFFICULTY[exercise.level as unknown as keyof typeof DIFFICULTY] || DIFFICULTY.ALL,
            category: CATEGORY[exercise.category as unknown as keyof typeof CATEGORY] || CATEGORY.ALL,
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
            exercise: exerciseInWorkout.exercise ? mapApiExerciseToExercise([exerciseInWorkout.exercise])[0] : null,
            sets: exerciseInWorkout.sets,
            reps: exerciseInWorkout.reps,
            restTime: exerciseInWorkout.restTime,
            order: exerciseInWorkout.order,
            weight: exerciseInWorkout.weight ?? 0,
        }
    })
}

export const mapApiWorkoutToPartialWorkout = (data: any): Partial<WorkoutAPI>[] => {
    return data.map((workout: any) => {
        return {
            id: workout.id,
            description: workout.description,
            name: workout.name,
        }
    })
}

export const mapApiExerciseInWorkoutToExerciseInWorkout = (exerciseInWorkout: any): ExerciseInWorkoutAPI => {
        return {
            id: exerciseInWorkout.id,
            workoutId: exerciseInWorkout.workoutId,
            exerciseId: exerciseInWorkout.exerciseId,
            exercise: mapApiExerciseToExercise([exerciseInWorkout.exercise])[0],
            sets: exerciseInWorkout.sets,
            reps: exerciseInWorkout.reps,
            restTime: exerciseInWorkout.restTime,
            order: exerciseInWorkout.order,
        }
}

export const mapIndividualApiExerciseToExercise = (data: any): ExerciseAPI => {
    return mapApiExerciseToExercise([data])[0];
}

export const mapIndividualApiWorkoutToWorkout = (data: any): WorkoutAPI => {
    return mapApiWorkoutToWorkout([data])[0];
}

export const mapIndividualApiTrainingPlanToTrainingPlan = (data: any): TrainingPlanAPI => {
    return mapApiTrainingPlanToTrainingPlan([data])[0];
}

export const mapIndividualApiNutritionPlanToNutritionPlan = (data: any): NutritionPlan => {
    return mapApiNutritionPlanToNutritionPlan([data])[0];
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

export const mapApiNutritionPlanToNutritionPlan = (data: any): NutritionPlan[] => {
    return data.map((plan: any) => {
        return {
            id: plan.id,
            name: plan.name,
            description: plan.description,
            imageURL: plan.imageURL ?? "",
            duration: plan.duration,
            category: FOODPLAN_CATEGORY[plan.category as unknown as keyof typeof FOODPLAN_CATEGORY] || FOODPLAN_CATEGORY.ALL,
            weeklyMeals: mapApiWeeklyMealToWeeklyMeal(plan.weeklyMeals) || [],
            score: plan.score,
            totalRatings: plan.totalRatings,
        }
    });
}

export const mapApiWeeklyMealToWeeklyMeal = (data: any): WeeklyMeal[] => {
    return data.map((meal: any) => {
        return {
            id: meal.id,
            dayOfWeek: meal.dayOfWeek,
            meals: mapApiMealToMeal(meal.meals) || [],
        }
    });
}

export const mapApiMealToMeal = (data: any): Meal[] => {
    return data.map((meal: any) => {
        return {
            id: meal.id,
            weeklyMealId: meal.weeklyMealId,
            type: meal.type,
            name: meal.name,
            description: meal.description,
            imageURL: meal.imageURL ?? "",
            foods: mapApiFoodToFood(meal.foods) || [],
        }
    });
}

export const mapApiFoodToFood = (data: any): Food[] => {
    return data.map((food: any) => {
        return {
            id: food.id,
            mealId: food.mealId,
            name: food.name,
            description: food.description,
            calories: food.calories,
            proteins: food.proteins,
            carbs: food.carbs,
            fats: food.fats,
        }
    });
}

export const mapApiPostToPost = (data: any): SocialPost[] => {
    return data.map((post: any) => {
        return {
            id: post.id,
            user_id: post.user_id,
            nombre: post.nombre,
            fecha: post.fecha,
            imagen_comentario: post.imagen_comentario,
            mensaje: post.mensaje,
            oculto: post.oculto,
            publico: post.publico,
            rutina: post.rutina,
            likes: post.likes,
        }
    });
}
