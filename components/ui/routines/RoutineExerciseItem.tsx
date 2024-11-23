import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { ExerciseInWorkoutAPI } from '@/types/interfaces/entities/plan';
import { useTheme } from '@/context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';

interface RoutineExerciseItemProps {
    exercise: ExerciseInWorkoutAPI;
}

export const RoutineExerciseItem = ({ exercise }: RoutineExerciseItemProps) => {
    const { isDark } = useTheme();
    const borderStyle = `${isDark
        ? "border-darkGray-400 bg-transparent"
        : "border-darkGray-200 bg-transparent"
        }`

    console.log("exercise", exercise.exercise?.id)
    return (
        <Pressable
            onPress={() => {
                router.push(`/(library)/exercise/${exercise.exercise?.id}`)
            }}
            className={`rounded-sm mr-1 mb-1 border-2 flex flex-row items-center
                ${borderStyle}
            `}
        >
            <View className={`px-5 w-12 h-12 py-4 mr-2 border-r-2 ${borderStyle}`}>
                <Text className={`text-sm font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{exercise.order}</Text>
            </View>
            <View className='flex-1 overflow-hidden'>
                <View className='flex flex-row items-center gap-x-2'>
                    <Ionicons name='barbell-outline' size={16} color={isDark ? '#fff' : '#000'} />
                    <Text className={`text-xs font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{exercise.exercise?.name ?? "Ejercicio"}</Text>
                </View>

                <View className='flex flex-row items-center gap-x-2'>
                    <Ionicons name='timer-outline' size={16} color={isDark ? '#fff' : '#000'} />
                    <Text className={`text-xs font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{exercise.sets} Sets x {exercise.reps} Repeticiones</Text>
                </View>
                <View className='flex flex-row items-center gap-x-2'>
                    <Ionicons name='bed-outline' size={16} color={isDark ? '#fff' : '#000'} />
                    <Text className={`text-xs font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{exercise.restTime} segundos</Text>
                </View>
            </View>

            <View className='flex flex-row items-center gap-x-1 px-2 h-full'>
                
                <Pressable 
                    onPress={() => {
                        router.push(`/(library)/exercise/${exercise.exercise?.id}`)
                    }}
                    className='flex flex-row items-center gap-x-2'
                >
                    <Ionicons name='information-circle-outline' size={24} color={isDark ? '#fff' : '#000'} />
                </Pressable>

            </View>

        </Pressable>
    )
}

export default RoutineExerciseItem