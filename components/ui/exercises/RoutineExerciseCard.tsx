import { Pressable, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { IndividualExercise } from '@/types/interfaces/entities/plan';
import { Ionicons } from '@expo/vector-icons';
import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { router } from 'expo-router';

interface ExerciseCardProps {
    exercise: IndividualExercise;
    onDrag: () => void;
    isActive: boolean;
    isCompleted?: boolean;
    onComplete?: (completed: boolean) => void;
}

const RoutineExerciseCard = ({ 
    exercise, 
    onDrag, 
    isActive,
    isCompleted = false,
    onComplete 
}: ExerciseCardProps) => {
    const { isDark } = useTheme();
    const { setScreenExercise } = useNavigationFlowContext();
    const [completed, setCompleted] = useState(isCompleted);
    
    const handleComplete = (e: any) => {
        e.stopPropagation();
        const newState = !completed;
        setCompleted(newState);
        onComplete?.(newState);
    };

    return (
        <View className={`
            flex flex-row items-center justify-start
            transition-all duration-300
            ${isActive ? '-translate-x-2' : ''}
        `}>
            {/* Drag Handle */}
            <Pressable 
                onLongPress={onDrag} 
                className="p-2 justify-center"
            >
                <Ionicons 
                    name="menu-outline" 
                    size={24} 
                    color={isDark ? "white" : "#1c1c1c"} 
                />
            </Pressable>

            {/* Main Card */}
            <View className={`
                flex-1 my-2 rounded-xl overflow-hidden
                ${isDark ? 'bg-darkGray-600' : 'bg-gray-50'}
                shadow-lg
            `}>
                {/* Exercise Header */}
                <Pressable 
                    onPress={() => {
                        setScreenExercise(exercise);
                        router.push("/(tabs)/(home)/exerciseDetail");
                    }}
                    className={`
                        p-4 flex-row items-center justify-between
                        border-l-4 ${completed ? 'border-green-500' : 'border-eBlue-500'}
                    `}
                >
                    {/* Exercise Info */}
                    <View className="flex-1">
                        <Text className={`
                            ${isDark ? 'text-white' : 'text-darkGray-500'} 
                            text-base font-ralewayBold mb-1
                        `}>
                            {exercise.nombre}
                        </Text>
                        
                        {/* Exercise Details */}
                        <View className="flex-row flex-wrap gap-3">
                            <View className="flex-row items-center">
                                <Ionicons 
                                    name="repeat-outline" 
                                    size={16} 
                                    color={isDark ? '#fff' : '#374151'} 
                                />
                                <Text className={`
                                    ${isDark ? 'text-white' : 'text-darkGray-500'} 
                                    text-sm font-raleway ml-1
                                `}>
                                    {exercise.series} Series
                                </Text>
                            </View>

                            <View className="flex-row items-center">
                                <Ionicons 
                                    name="fitness-outline" 
                                    size={16} 
                                    color={isDark ? '#fff' : '#374151'} 
                                />
                                <Text className={`
                                    ${isDark ? 'text-white' : 'text-darkGray-500'} 
                                    text-sm font-raleway ml-1
                                `}>
                                    {exercise.repeticiones} Reps
                                </Text>
                            </View>

                            <View className="flex-row items-center">
                                <Ionicons 
                                    name="time-outline" 
                                    size={16} 
                                    color={isDark ? '#fff' : '#374151'} 
                                />
                                <Text className={`
                                    ${isDark ? 'text-white' : 'text-darkGray-500'} 
                                    text-sm font-raleway ml-1
                                `}>
                                    {exercise.tiempoDescanso}s descanso
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Complete Button */}
                    <Pressable
                        onPress={handleComplete}
                        className={`
                            ml-3 p-2 rounded-full
                            ${completed ? 'bg-green-500' : isDark ? 'bg-darkGray-500' : 'bg-white'}
                            border-2 border-${completed ? 'green' : 'eBlue'}-500
                        `}
                    >
                        <Ionicons 
                            name={completed ? "checkmark" : "checkmark-outline"} 
                            size={20} 
                            color={completed ? "white" : isDark ? "white" : "#1c1c1c"} 
                        />
                    </Pressable>
                </Pressable>
            </View>
        </View>
    );
};

export default RoutineExerciseCard;