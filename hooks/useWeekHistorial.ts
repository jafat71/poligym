import { getMinutesSumFromTime } from '@/lib/utils/getHistorialTime';
import { getWorkoutProgressByDate } from '@/database/sqlite';
import { getHistorialTime } from '@/lib/utils/getHistorialTime';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useQuery } from '@tanstack/react-query';
import { getLocaleDateTime } from '@/lib/utils/getLocaleTime';

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
        const [dateForSearch, _] = getLocaleDateTime(date);
        const workoutDayProgressQueried = await getWorkoutProgressByDate(loggedUserInfo?.id ?? '', dateForSearch);
        const workoutsInDay = workoutDayProgressQueried.map((workout: any) => workout.workoutDuration);
        const totalTime = getHistorialTime(workoutsInDay);
        return getMinutesSumFromTime(totalTime);
    };

    const fetchWeekDaysData = async () => {
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay(); // Domingo = 0, Lunes = 1, ... 
    
        // Crear un array de promesas para cada día de la semana
        const promises = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(currentDate);
    
            // Ajuste para obtener la fecha correcta para cada día de la semana
            const offset = i - currentDayIndex; // Esto asegura que no se salga de la semana actual
            date.setDate(currentDate.getDate() + offset);
    
            return getDayMinutesSum(date).then(minutesSum => ({
                day: date.toLocaleString('es-EC', { day: '2-digit' }),
                month: date.toLocaleString('es-EC', { month: 'short' }),
                isToday: i === currentDayIndex, // Verificamos si es hoy
                isRestDay: i === 5 || i === 6, // Sábado (5) y Domingo (6)
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

    console.log("dataPerDay: ", dataPerDay)

    useEffect(() => {
        if (weekDaysData) {
            const timeForDayObject = {
                "Dom": Number(weekDaysData[0]?.dayWorkoutTime) || 0,
                "Lun": Number(weekDaysData[1]?.dayWorkoutTime) || 0,
                "Mar": Number(weekDaysData[2]?.dayWorkoutTime) || 0,
                "Mie": Number(weekDaysData[3]?.dayWorkoutTime) || 0,
                "Jue": Number(weekDaysData[4]?.dayWorkoutTime) || 0,
                "Vie": Number(weekDaysData[5]?.dayWorkoutTime) || 0,
                "Sab": Number(weekDaysData[6]?.dayWorkoutTime) || 0,
            };
            setDataPerDay(timeForDayObject);
        }
    }, [weekDaysData]);

    return { dataPerDay, weekDaysData };
};
