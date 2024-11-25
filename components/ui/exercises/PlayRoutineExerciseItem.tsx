import { Image, Pressable, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { ExerciseInWorkoutAPI } from '@/types/interfaces/entities/plan';
import { router } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';

interface ExerciseCardProps {
    exercise: ExerciseInWorkoutAPI;
    onDrag: () => void;
    isActive: boolean;
    isCompleted?: boolean;
    onComplete?: (completed: boolean) => void;
}

const PlayRoutineExerciseItem = ({ 
    exercise, 
    onDrag, 
    isActive,
    isCompleted = false,
    onComplete 
}: ExerciseCardProps) => {
    const { isDark } = useTheme();
    const [completed, setCompleted] = useState(isCompleted);

    useQueryClient().setQueryData(['exercises', exercise.exercise?.id], exercise.exercise);
    
    const handleComplete = (e: any) => {
        e.stopPropagation();
        const newState = !completed;
        setCompleted(newState);
        onComplete?.(newState);
    };

    return (
        <View className={`
            flex flex-row items-center justify-start
            transition-all duration-300 px-2 h-24
            ${isDark ? 'bg-darkGray-900' : 'bg-darkGray-100'}
            ${isActive ? '-translate-x-2' : ''}
        `}>
            <Pressable 
                onLongPress={onDrag} 
                className={`p-2 justify-center ${isDark ? 'bg-white' : 'bg-darkGray-800'} h-full`}
            >
                <Ionicons 
                    name="menu-outline" 
                    size={24} 
                    color={isDark ? 'black' : 'white'} 
                />
            </Pressable>

            <View className={`
                flex-1 rounded-sm overflow-hidden
            `}>
                <Pressable 
                    onPress={() => {
                        router.push(`/(library)/exercise/${exercise.exercise?.id}`);
                    }}
                    className={`
                        px-4 py-2 flex-row items-center justify-between 
                        border-l-4 border-eBlue-500
                    `}
                >
                    
                    <View className="flex-1">
                        <Text 
                            numberOfLines={1}
                        className={`
                            ${isDark ? 'text-white' : 'text-darkGray-500'} 
                            text-xl font-ralewayBold mb-1
                        `}>
                            {exercise.exercise?.name ?? "Ejercicio"}
                        </Text>
                        
                        <View className="flex-col">
                            <View className="flex-row items-center">
                                <Ionicons 
                                    name="repeat-outline" 
                                    size={24} 
                                    color={isDark ? "#fff" : "#1c1c1c"} 
                                />
                                <Text className={`${isDark ? "text-white" : "text-darkGray-900"} 
                                    text-sm font-ralewaySemiBold ml-1
                                `}>
                                    {exercise.sets} X {exercise.reps} Reps
                                </Text>
                            </View>

                            <View className="flex-row items-center">
                                <Ionicons 
                                    name="time-outline" 
                                    size={24} 
                                    color={isDark ? "#fff" : "#1c1c1c"} 
                                />
                                <Text className={`
                                    ${isDark ? "text-white" : "text-darkGray-900"} 
                                    text-sm font-ralewaySemiBold ml-1
                                `}>
                                    {exercise.restTime}s Descanso
                                </Text>
                            </View>
                        </View>
                    </View>

                    <Pressable
                        onPress={handleComplete}
                        className={`
                            ml-3 p-2 rounded-full
                            ${completed ? 'bg-eBlue-500' : ''}
                            border-2 border-${completed ? 'lightGreen' : isDark ? "#fff" : "#1c1c1c"}
                        `}
                    >
                        <Ionicons 
                            name={completed ? "checkmark" : "checkmark-outline"} 
                            size={24} 
                            color={completed ? "#fff" : (isDark ? "#fff" : "#1c1c1c")} 
                        />
                    </Pressable>
                </Pressable>
            </View>
        </View>
    );
};

export default PlayRoutineExerciseItem;