import React from 'react';
import { Text, View } from 'react-native';
import { useWeekHistorial } from '@/hooks/useWeekHistorial';

const WeekCalendar = () => {
    const { weekDaysData} = useWeekHistorial();

    const getDayName = (index: number) => {
        const days = {
            0: 'D',
            1: 'L',
            2: 'M',
            3: 'M',
            4: 'J',
            5: 'V',
            6: 'S',
        }
        return (
            <Text className="text-xs font-ralewaySemiBold text-white">{days[index]}</Text>
        );
    };

    if (!weekDaysData) return null;
    return (
        <View className="flex flex-row justify-between">
            {weekDaysData.map((day, index) => (
                <View
                    key={index}
                    className={`rounded-full px-4 py-2 bg-eBlue-400 flex flex-col items-center justify-center ${
                        day.isToday ? 'bg-eBlue-800' : ''
                    }`}
                >
                    <Text className="text-white font-ralewaySemiBold">{day.day}</Text>
                    {getDayName(index)}
                </View>
            ))}
        </View>
    );
};

export default WeekCalendar;
