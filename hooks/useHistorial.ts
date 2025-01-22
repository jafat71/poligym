import { getHistorialTime } from "@/lib/utils/getHistorialTime";

import { useEffect } from "react";

import { useUser } from "@/context/UserContext";
import { getUserHistoryWorkoutProgress } from "@/database/sqlite";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { WorkoutProgress } from "@/types/interfaces/entities/progress";

export const useHistorial = () => {
    const { loggedUserInfo } = useUser();
    const [historyTime, setHistoryTime] = useState<string>('00:00');
    const [userHistorial, setUserHistorial] = useState();
    const [completedWorkouts, setCompletedWorkouts] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const { data: retrievedHistorial } = useQuery({
        queryKey: ['historyTime'],
        queryFn: () => getUserHistoryWorkoutProgress(loggedUserInfo?.id!),
    })

    useEffect(() => {
        if (retrievedHistorial) {
            setIsLoading(false);
            setUserHistorial(retrievedHistorial as any);
            const historyTimes = retrievedHistorial.map((workout:any) => workout.workoutDuration);
            const totalTime = getHistorialTime(historyTimes);
            setHistoryTime(totalTime);
            setCompletedWorkouts(retrievedHistorial.length);
            setIsLoading(false);
        }
    }, [retrievedHistorial]);

    return { historyTime, userHistorial, completedWorkouts, isLoading };
}
