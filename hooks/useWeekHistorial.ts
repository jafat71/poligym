import { getMinutesSumFromTime } from '@/lib/utils/getHistorialTime';
import { getWorkoutProgressByDate } from '@/database/sqlite';
import { getHistorialTime } from '@/lib/utils/getHistorialTime';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useQuery } from '@tanstack/react-query';

export const useWeekHistorial = () => {
    const { loggedUserInfo } = useUser();
    const [dataPerDay, setDataPerDay] = useState({
        'Lun': 0,
        'Mar': 0,
        'Mie': 0,
        'Jue': 0,
        'Vie': 0,
        'Sab': 0,
        'Dom': 0,
    });
    
    const getDayMinutesSum = async (date: Date) => {
        const dateForSearch = date.toISOString().split('T')[0];
        const workoutDayProgressQueried = await getWorkoutProgressByDate(loggedUserInfo?.id ?? '', dateForSearch);
        const workoutsInDay = workoutDayProgressQueried.map((workout: any) => workout.workoutDuration);
        const totalTime = getHistorialTime(workoutsInDay);
        return getMinutesSumFromTime(totalTime);
    };

    const fetchWeekDaysData = async () => {
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay();
        
        // Crear un array de promesas para cada día de la semana
        const promises = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() - currentDayIndex + i + 1);
            return getDayMinutesSum(date).then(minutesSum => ({
                day: date.toLocaleString('es-ES', { day: '2-digit' }),
                month: date.toLocaleString('es-ES', { month: 'short' }),
                isToday: i + 1 === currentDayIndex,
                isRestDay: i + 1 === 6 || i + 1 === 7,
                minutesSum: minutesSum,
                didExercise: minutesSum > 0,
                dayWorkoutTime: minutesSum
            }));
        });
        
        return Promise.all(promises);
    };

    const { data: weekDaysData } = useQuery({
        queryKey: ['weekDays', loggedUserInfo?.id],
        queryFn: fetchWeekDaysData,
        enabled: !!loggedUserInfo?.id,
    });

    useEffect(() => {
        if (weekDaysData) {
            const timeForDayObject = {
                "Lun": Number(weekDaysData[0]?.dayWorkoutTime) || 0,
                "Mar": Number(weekDaysData[1]?.dayWorkoutTime) || 0,
                "Mie": Number(weekDaysData[2]?.dayWorkoutTime) || 0,
                "Jue": Number(weekDaysData[3]?.dayWorkoutTime) || 0,
                "Vie": Number(weekDaysData[4]?.dayWorkoutTime) || 0,
                "Sab": Number(weekDaysData[5]?.dayWorkoutTime) || 0,
                "Dom": Number(weekDaysData[6]?.dayWorkoutTime) || 0,
            };
            setDataPerDay(timeForDayObject);
        }
    }, [weekDaysData]);

    return { dataPerDay, weekDaysData };
};
