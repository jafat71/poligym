import { getHistorialTime } from "@/lib/utils/getHistorialTime";

import { useEffect } from "react";

import { useUser } from "@/context/UserContext";
import { getUserHistoryWorkoutProgress } from "@/database/sqlite";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const useHistorialTime = () => {
    const { loggedUserInfo } = useUser();
    const [historyTime, setHistoryTime] = useState<string>('00:00');

    const { data: retrievedHistoryTime } = useQuery({
        queryKey: ['historyTime'],
        queryFn: () => getUserHistoryWorkoutProgress(loggedUserInfo?.id!),
    })

    useEffect(() => {
        if (retrievedHistoryTime) {
            const historyTimes = retrievedHistoryTime.map((workout:any) => workout.workoutDuration);
            const totalTime = getHistorialTime(historyTimes);
            setHistoryTime(totalTime);
        }
    }, [retrievedHistoryTime]);

    return { historyTime };
}
