
export interface WorkoutProgress {
    userId: string;
    workoutId: string;
    workoutName: string;
    workoutDuration: string;
    workoutDay: string;
    workoutHour: string;
    workoutWorkedMuscles: string[];
}

export interface PlanProgress {
    id: string;
    userId: string;
    planId: string;
    planName: string;
    planStartDate: string;
    planEndDate: string;
    planStatus: "ACTIVE" | "COMPLETED" | "INACTIVE";
    planWeeks: number;
}

export interface PlanProgressDetails {
    planProgressId: number;
    week: number;
    workoutId: string;
    completed: boolean;
}

