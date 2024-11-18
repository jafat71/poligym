import { Pressable, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { ExerciseInWorkoutAPI } from '@/types/interfaces/entities/plan';

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
            transition-all duration-300 px-2 h-28
            ${isActive ? '-translate-x-2' : ''}
        `}>
            <Pressable 
                onLongPress={onDrag} 
                className="p-2 justify-center bg-eBlue-700 h-full"
            >
                <Ionicons 
                    name="menu-outline" 
                    size={24} 
                    color={"white"} 
                />
            </Pressable>

            <View className={`
                flex-1 my-2 rounded-sm overflow-hidden
            `}>
                <Pressable 
                    onPress={() => {
                    }}
                    className={`
                        p-4 flex-row items-center justify-between
                        border-l-4 ${completed ? 'border-lightGreen' : 'border-eBlue-500'}
                    `}
                >
                    <View className="flex-1">
                        <Text className={`
                            ${isDark ? 'text-white' : 'text-darkGray-500'} 
                            text-base font-ralewayBold mb-1
                        `}>
                            {exercise.name}
                        </Text>
                        
                        <View className="flex-col">
                            <View className="flex-row items-center">
                                <Ionicons 
                                    name="repeat-outline" 
                                    size={24} 
                                    color={'#fff'} 
                                />
                                <Text className={`text-white 
                                    text-xl font-ralewaySemiBold ml-1
                                `}>
                                    {exercise.sets} X {exercise.reps} Reps
                                </Text>
                            </View>

                            <View className="flex-row items-center">
                                <Ionicons 
                                    name="time-outline" 
                                    size={24} 
                                    color={'#fff'} 
                                />
                                <Text className={`text-white 
                                    text-xl font-ralewaySemiBold ml-1
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
                            ${completed ? 'bg-lightGreen' : ''}
                            border-2 border-${completed ? 'lightGreen' : 'white'}
                        `}
                    >
                        <Ionicons 
                            name={completed ? "checkmark" : "checkmark-outline"} 
                            size={24} 
                            color={`${completed ? '#1c1c1c' : 'white'}`} 
                        />
                    </Pressable>
                </Pressable>
            </View>
        </View>
    );
};

export default PlayRoutineExerciseItem;