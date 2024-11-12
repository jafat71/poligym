import { IndividualExercise, RoutinePlan, TrainingPlan, TrainingPlanAPI } from "../interfaces/entities/plan"
import { User } from "../interfaces/entities/user"

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
