import * as SQLite from "expo-sqlite";
import { PlanProgress, PlanProgressDetails, WorkoutProgress } from "@/types/interfaces/entities/progress";
import { WorkoutAPI } from "@/types/interfaces/entities/plan";
export const db = SQLite.openDatabaseSync("progress.db");

export const insertWorkoutProgress = async (progress: WorkoutProgress) => {
    try {
        const {
            userId,
            workoutId,
            workoutName,
            workoutDuration,
            workoutDay,
            workoutHour,
            workoutWorkedMuscles,
        } = progress;
        const muscles = JSON.stringify(workoutWorkedMuscles);
        const result = await db.runAsync(`
            INSERT INTO workout_progress (userId, workoutId, workoutName, workoutDuration, workoutDay, workoutHour, workoutWorkedMuscles) 
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `, [
            userId.replace(/'/g, "''"),
            workoutId.replace(/'/g, "''"),
            workoutName.replace(/'/g, "''"),
            workoutDuration,
            workoutDay.replace(/'/g, "''"),
            workoutHour,
            muscles
        ]);
        return result;
    } catch (error) {
        console.error("Error al insertar progreso de entrenamiento:", error);
    }
};

export const getUserHistoryWorkoutProgress = async (userId: string) => {
    try {
        const result = await db.getAllSync(`
            SELECT * FROM workout_progress WHERE userId = '${userId.replace(
            /'/g,
            "''"
        )}';
        `);
        return result;
    } catch (error) {
        console.error(
            "Error al obtener el progreso de entrenamiento del usuario:",
            error
        );
        return [];
    }
};

export const tempGetAllFromSqlite = async () => {
    const result = await db.getAllSync(`
        SELECT * FROM workout_progress;
    `);
    return result;
};

export const getWorkoutProgressById = async (
    workoutId: string,
    userId: string
) => {
    try {
        const result = await db.execSync(`
            SELECT * FROM workout_progress 
            WHERE workoutId = '${workoutId.replace(/'/g, "''")}' 
            AND userId = '${userId.replace(/'/g, "''")}';
        `);
        return result;
    } catch (error) {
        console.error(
            "Error al obtener el progreso de entrenamiento por ID:",
            error
        );
        return null;
    }
};

export const getWorkoutProgressByDate = async (userId: string, date: string) => {
    const result = await db.getAllSync(`
        SELECT * FROM workout_progress WHERE userId = '${userId.replace(/'/g, "''")}' AND workoutDay = '${date.replace(/'/g, "''")}';
    `);
    return result;
};

export const resetUserWorkoutProgress = async (userId: string) => {
    const result = await db.execSync(`
        DELETE FROM workout_progress WHERE userId = '${userId.replace(/'/g, "''")}';
    `);
    return result;
};

export const enrollUserOnPlan = async (planProgress: PlanProgress, planWorkouts: WorkoutAPI[]) => {
    const {
        userId,
        planId,
        planName,
        planStartDate,
        planEndDate,
        planWeeks
    } = planProgress;
    
    if (!userId || !planId || !planName || !planStartDate || !planEndDate || !planWeeks) {
        throw new Error("Faltan datos en planProgress.");
    }
    //verificar si el usuario ya tiene un plan activo, convierte aquel plan en inactivo pero guarda su progreso
    const activePlan = await getActivePlan(userId);
    if (activePlan) {
        await convertActivePlanToInactive(userId);
    }
    else {
        console.log("USER DOES NOT HAVE AN ACTIVE PLAN")
    }

    await convertPlanToActive(userId, planId);

    //TODO: presentar modald e calificacion tras finalizar plan
    const userPlanProgress = await getUserPlanProgress(userId, planId);
    console.log("USER PLAN PROGRESS", userPlanProgress)
    if (userPlanProgress === null) {
        try {
            const newPlanProgress = await db.runAsync(`
                INSERT INTO user_plan_progress (
                userId, 
                planId, 
                planName, 
                planStartDate, 
                planEndDate, 
                planStatus, 
                planWeeks
            ) VALUES (
                '${userId.replace(/'/g, "''")}', 
                '${planId.replace(/'/g, "''")}', 
                '${planName.replace(/'/g, "''")}', 
                '${planStartDate.replace(/'/g, "''")}', 
                '${planEndDate.replace(/'/g, "''")}', 
                'ACTIVE', 
                '${planWeeks}'
            )
            RETURNING id;
        `);
        const planProgressId = newPlanProgress.lastInsertRowId;  
        //Crear instancias en la tabla plan_progress_details
        let insertedOrder = 1;
        for (let week = 1; week <= planWeeks; week++) {
            for (let workout of planWorkouts) {
                try {
                    await db.runAsync(`
                        INSERT INTO plan_progress_details (planProgressId, week, workoutId, completed, insertedOrder) VALUES
                    (${planProgressId}, ${week}, ${workout.id}, FALSE, ${insertedOrder++});
                `);
                console.log(`Inserted progress details for planProgressId ${planProgressId}, week ${week}`);
            } catch (error) {
                    console.error(`Error al insertar detalles del plan ${planProgressId}, week ${week}`, error);
                }
            }
        }

        return { success: true, planProgressId };   
        } catch (error) {
            console.error("Error al inscribir al usuario en el plan:", error);
            return null;
        }

    }else{
        console.log("USER HAS PROGRESS IN THE PLAN")
        return { success: false, planProgressId: userPlanProgress?.planProgressId };
    }

};

export const convertActivePlanToInactive = async (userId: string) => {
    const result = await db.execSync(`
        UPDATE user_plan_progress SET planStatus = 'INACTIVE' WHERE userId = '${userId.replace(/'/g, "''")}';
    `);
    return result;
};

export const convertPlanToActive = async (userId: string, planId: string) => {
    const result = await db.execSync(`
        UPDATE user_plan_progress SET planStatus = 'ACTIVE' WHERE userId = '${userId.replace(/'/g, "''")}' AND planId = '${planId.replace(/'/g, "''")}';
    `);
    return result;
};

export const getActivePlan = async (userId: string) => {
    try {
        const result = await db.getAllSync(`
            SELECT * FROM user_plan_progress WHERE userId = '${userId.replace(/'/g, "''")}' AND planStatus = 'ACTIVE';
        `);
        if (result.length > 0) {
            return result[0];
        }
        return null;
    } catch (error) {
        console.error("Error al obtener el plan activo:", error);
        return null;
    }
};

export const getAllUserPlanProgress = async () => {
    const result = await db.getAllSync(`
        SELECT * FROM user_plan_progress;
    `);
    return result;
};

export const getUserPlanProgress = async (userId: string, planId: string) => {
    try {
        const rows = await db.getAllSync(`
            SELECT 
                upp.id AS planProgressId,
                upp.planId,
                upp.planName,
                upp.planStartDate,
                upp.planEndDate,
                upp.planStatus,
                upp.planWeeks,
                upp.userId,
                ppd.week,
                ppd.workoutId,
                ppd.completed
            FROM user_plan_progress AS upp
            LEFT JOIN plan_progress_details AS ppd
            ON upp.id = ppd.planProgressId
            WHERE upp.userId = '${userId.replace(/'/g, "''")}' 
              AND upp.planId = '${planId.replace(/'/g, "''")}'
            ORDER BY ppd.week ASC, ppd.id ASC;
        `);
        if (rows.length === 0) {
            return null;
        }

        const groupedProgress = rows.reduce(
            (acc: any, row: any) => {
                const { week, workoutId, workoutName, completed, ...planInfo } = row;

                if (!acc.planId) {
                    acc = { ...planInfo, weeks: {}, completedRoutines: 0, nextRoutine: null, nextRoutineWeek: null };
                }

                if (!acc.weeks[week]) {
                    acc.weeks[week] = [];
                }

                acc.weeks[week].push({ workoutId, completed });

                // Incrementar el contador de rutinas completadas
                if (completed) {
                    acc.completedRoutines++;
                } else if (!acc.nextRoutine) {
                    acc.nextRoutine = workoutId;
                    acc.nextRoutineWeek = week;
                }

                return acc;
            },
            { completedRoutines: 0 } // Inicializar el contador de rutinas completadas
        );

        return groupedProgress;
    } catch (error) {
        console.error("Error al obtener el progreso del plan:", error);
        return null;
    }
};

export const getAllUserPlanProgressDetails = async () => {
    const result = await db.getAllSync(`
        SELECT * FROM plan_progress_details;
    `);
    return result;
};

export const updateUserPlanProgress = async (planProgressDetails: PlanProgressDetails) => {
    const {
        planProgressId,
        week,
        workoutId,
        completed
    } = planProgressDetails;

    try {
        const result = await db.runAsync(`
            UPDATE plan_progress_details 
            SET completed = ${completed} 
            WHERE planProgressId = ${planProgressId} AND week = ${week} AND workoutId = '${workoutId.replace(/'/g, "''")}';
        `);
        return result;
    } catch (error) {
        console.error("Error al actualizar el progreso del plan:", error);
        return null;
    }
}

export const getUserPlanProgressById = async (planProgressId: number, week: number, workoutId: string) => {
    try {
        const result = await db.getFirstSync(`
            SELECT * FROM plan_progress_details WHERE planProgressId = ${planProgressId} AND week = ${week} AND workoutId = '${workoutId.replace(/'/g, "''")}';
        `);
        return result;
    } catch (error) {
        console.error("Error al obtener el progreso del plan:", error);
        return null;
    }
}

export const tableExists = async (tableName: string): Promise<boolean> => {
    try {
        const result = await db.getFirstSync(`
            SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';
        `);

        return result !== null;
    } catch (error) {
        console.error(
            `Error al verificar la existencia de la tabla ${tableName}:`,
            error
        );
        return false;
    }
};

export const initializeDatabase = async () => {
    try {
        await dropUserPlanProgressTable();
        await dropPlanProgressDetailsTable();

        await db.execSync(`
            CREATE TABLE IF NOT EXISTS workout_progress 
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    userId TEXT NOT NULL,
                    workoutId TEXT NOT NULL,
                    workoutName TEXT NOT NULL,
                    workoutDuration TEXT NOT NULL,
                    workoutDay TEXT NOT NULL,
                    workoutHour TEXT NOT NULL,
                    workoutWorkedMuscles TEXT DEFAULT '[]'
                );
        `);

        await db.execSync(`
            CREATE TABLE IF NOT EXISTS user_plan_progress 
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                userId TEXT NOT NULL,
                planId TEXT NOT NULL,
                planName TEXT NOT NULL,
                planStartDate TEXT NOT NULL,
                planEndDate TEXT NOT NULL,
                planStatus TEXT NOT NULL,
                planWeeks INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS plan_progress_details 
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                planProgressId INTEGER NOT NULL,
                week INTEGER NOT NULL,
                workoutId TEXT NOT NULL,
                completed BOOLEAN NOT NULL,
                insertedOrder INTEGER NOT NULL,
                FOREIGN KEY(planProgressId) REFERENCES user_plan_progress(id)
            );
        `);

        console.log("Database initialized successfully");
        const allUserPlanProgress = await getAllUserPlanProgress();
        console.log("ALL USER PLAN PROGRESS", allUserPlanProgress)
        // const allUserPlanProgressDetails = await getAllUserPlanProgressDetails();
        // console.log("ALL USER PLAN PROGRESS DETAILS", allUserPlanProgressDetails)   
    } catch (error) {
        console.error(
            "Error durante la inicialización de la base de datos:",
            error
        );
    }
};

const dropWorkoutProgressTable = async () => {
    await db.execSync(`
        DROP TABLE IF EXISTS workout_progress;
    `);
};

const dropUserPlanProgressTable = async () => {
    await db.execSync(`
        DROP TABLE IF EXISTS user_plan_progress;
    `);
};

const dropPlanProgressDetailsTable = async () => {
    await db.execSync(`
        DROP TABLE IF EXISTS plan_progress_details;
    `);
};

export const resetUserPlanProgressTable = async (userId: string) => {
    await db.execSync(`
        DELETE FROM user_plan_progress WHERE userId = '${userId.replace(/'/g, "''")}';
    `);
};
