import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { ExerciseAPI, ExerciseInWorkoutAPI } from '@/types/interfaces/entities/plan';
import { useTheme } from '@/context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';

interface RoutineExerciseItemProps {
    exercise: ExerciseInWorkoutAPI;
    exercises: ExerciseAPI[];
}

export const RoutineExerciseItem = ({ exercise, exercises = [] }: RoutineExerciseItemProps) => {
    const [exerciseName, setExerciseName] = useState("");

    const { isDark } = useTheme();
    const getExerciseDetailedInfo = (exerciseId: number) => {
        if (exercises && exercises.length > 0) {
            return exercises.find(exercise => exercise.id.toString() === exerciseId.toString())?.name;
        }
        return "";
    }
    useEffect(() => {
        const name = getExerciseDetailedInfo(exercise.exerciseId);
        setExerciseName(name ?? ""); 
    }, [exercise.exerciseId, exercises]);

    const borderStyle = `${isDark
        ? "border-darkGray-400 bg-transparent"
        : "border-darkGray-200 bg-transparent"
        }`
    return (
        <Pressable
            onPress={() => {
                router.push(`/(library)/exercise/${exercise.exerciseId}`)
            }}
            className={`rounded-sm mr-1 mb-1 border-2 flex flex-row items-center
                ${borderStyle}
            `}
        >
            <View className={`px-5 py-4 mr-2 border-r-2 ${borderStyle}`}>
                <Text className={`text-sm font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{exercise.order}</Text>
            </View>
            <View className='flex-1 overflow-hidden'>
                <View className='flex flex-row items-center gap-x-2'>
                    <Ionicons name='barbell-outline' size={16} color={isDark ? '#fff' : '#000'} />
                    <Text className={`text-xs font-raleway ${isDark ? 'text-white' : 'text-darkGray-900'}`}>{exerciseName}</Text>
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
                        router.push(`/(library)/exercise/${exercise.exerciseId}`)
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