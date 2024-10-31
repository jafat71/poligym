import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

const exerciseData: Record<number, boolean> = {
    0: false,
    1: true,
    2: false,
    3: true,
    4: false,
    5: true,
    6: false
};

interface Date {
    day: string,
    month: string,
    isToday: boolean,
    isRestDay: boolean,
    didExercise: boolean
}

const WeekCalendar = () => {

    const { isDark } = useTheme()

    const getWeekDays = () => {
        const days: Date[] = [];
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay();

        for (let i = 1; i <= 7; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() - currentDayIndex + i);

            const day = date.toLocaleString('es-ES', { day: '2-digit' });
            const month = date.toLocaleString('es-ES', { month: 'short' });
            const isToday = i === currentDayIndex;
            const isRestDay = i === 6 || i === 7;
            const didExercise = exerciseData[i];

            days.push({ day, month, isToday, isRestDay, didExercise });
        }

        return days;
    };

    const weekDays = getWeekDays();

    const getIcon = (date: Date) => {
        return (date.didExercise) ?  (
            <Ionicons name='barbell-outline' size={12} color={`${isDark ? "white" : "#1c1c1c"}`} />
        ) : (
            <Text className={`text-xs font-ralewayExtraBold ${isDark ? "text-white" : "text-darkGray-500"}`}>.</Text>
        )

    }
    return (
        <View className='flex flex-row justify-between'>
            {weekDays.map((date, index) => (
                <View
                    key={index}
                    className={`rounded-full p-2 border-2 
                        flex flex-col items-center justify-center
                        border-${isDark ? "white" : "darkGray-500"}
                    ${date.isToday ? "border-eBlue-500" : ""}
                    `}
                >
                    <Text
                        className={`${isDark ? "text-white" : "text-darkGray-500"} font-raleway`}
                    >
                        {date.day}
                    </Text>

                    {
                        getIcon(date)
                    }
                </View>
            ))}
        </View>
    );
};

export default WeekCalendar;
