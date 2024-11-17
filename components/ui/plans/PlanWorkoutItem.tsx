import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { WorkoutAPI } from '@/types/interfaces/entities/plan';
import { useTheme } from '@/context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';

interface PlanWorkoutItemProps {
    workout: WorkoutAPI;
}

export const PlanWorkoutItem = ({ workout }: PlanWorkoutItemProps) => {

    const { isDark } = useTheme();
    const borderStyle = `${isDark
        ? "border-darkGray-400 bg-transparent"
        : "border-darkGray-200 bg-transparent"
        }`

    return (
        <Pressable
            onPress={() => {
                router.push(`/(library)/routine/${workout.id}`)
            }}
            className={`rounded-sm mr-1 mb-1 border-2 flex flex-row items-center h-40
                ${borderStyle}
            `}
        >

            <View className='flex flex-col justify-between overflow-hidden w-5/6'>
                    <Text className={`text-4xl font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{workout.name}</Text>
                    <Text className={`text-xs font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{workout.description}</Text>
            </View>

            <View className='flex flex-row items-start p-2 gap-x-1 px-2 h-full'>
                
                <Pressable 
                    onPress={() => {
                        router.push(`/(library)/routine/${workout.id}`)
                    }}
                    className='flex flex-row items-center gap-x-2'
                >
                    <Ionicons name='information-circle-outline' size={24} color={isDark ? '#fff' : '#000'} />
                </Pressable>

            </View>

        </Pressable>
    )
}

export default PlanWorkoutItem