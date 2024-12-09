import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
            <Ionicons name='barbell-outline' size={12} color={`white`} />
        ) : (
            <Text className={`text-xs font-ralewayExtraBold text-white`}>.</Text>
        )

    }
    return (
        <View className='flex flex-row justify-between'>
            {weekDays.map((date, index) => (
                <View
                    key={index}
                    className={`rounded-full px-4 py-2   bg-eOrange-500/40
                        flex flex-col items-center justify-center
                    ${date.isToday ? "bg-eOrange-500  border-2 border-eOrange-500" : ""}
                    `}
                >
                    <Text
                        className={`text-white font-ralewaySemiBold`}
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
