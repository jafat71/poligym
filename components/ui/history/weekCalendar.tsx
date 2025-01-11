import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WeekCalendarItemTimeCount } from '@/types/interfaces/ui';
import { isLoading } from 'expo-font';
import { useWeekHistorial } from '@/hooks/useWeekHistorial';

const WeekCalendar = () => {
    const { weekDaysData} = useWeekHistorial();

    const getIcon = (date: WeekCalendarItemTimeCount) => {
        return date.didExercise ? (
            <Ionicons name="barbell-outline" size={12} color="white" />
        ) : (
            <Text className="text-xs font-ralewayExtraBold text-white">.</Text>
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
                    {getIcon(day)}
                </View>
            ))}
        </View>
    );
};

export default WeekCalendar;
