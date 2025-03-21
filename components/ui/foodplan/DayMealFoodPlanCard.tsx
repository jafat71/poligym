
import { View, Text, Image } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/ThemeContext';
import { DAY_OF_WEEK, WeeklyMeal } from '@/types/interfaces/entities/foodplan';
import { Ionicons } from '@expo/vector-icons';
import { DayMealItem } from './DayMealItem';

interface Props {
    selectedDay: WeeklyMeal;
}

const DayMealFoodPlanCard = ({ selectedDay }: Props) => {
    const { isDark } = useTheme();
    return (
        <View className={`p-2 py-4 rounded-md ${isDark ? "bg-darkGray-500" : "bg-darkGray-100"}`}>
            <View className='flex-row justify-between items-center'>
                <Ionicons name='calendar-number' size={24} color={isDark ? "white" : "black"} />
                <Text className={`text-4xl font-ralewayExtraBold ${isDark ? "text-white" : "text-darkGray-900"}`}>
                    {
                    DAY_OF_WEEK[selectedDay.dayOfWeek as unknown as keyof typeof DAY_OF_WEEK]}
                </Text>

            </View>
            <View className='flex-col items-start w-full'>
                {
                    selectedDay.meals.map((meal) => (
                        <DayMealItem
                            meal={meal}
                            key={meal.id}
                        />
                    ))
                }
            </View>
        </View>
    )
}

export default DayMealFoodPlanCard