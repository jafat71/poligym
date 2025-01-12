import * as SQLite from "expo-sqlite";
import { WorkoutProgress } from "@/types/interfaces/entities/progress";
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
        console.log("Progreso de entrenamiento insertado correctamente.");
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
        console.log(
            "Intentando verificar la existencia de la tabla workout_progress..."
        );
        const exists = await tableExists("workout_progress");
        if (exists) {
            console.log("La tabla workout_progress existe y está lista para usarse.");
        } else {
            console.error("La tabla workout_progress NO existe.");
        }
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
