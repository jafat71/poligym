import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { Ionicons } from '@expo/vector-icons';

interface RoutineWeekDayPlanCardProps {
    day: string;
    routine: any;
    status?: 'pending' | 'completed' | 'in-progress';
    onComplete?: (isCompleted: boolean) => void;

}

const RoutineWeekDayPlanCard = ({ 
    day, 
    routine, 
    status = 'pending' ,
    onComplete
}: RoutineWeekDayPlanCardProps) => {
    const { isDark } = useTheme();
    const router = useRouter();
    const { setScreenRoutine, screenRoutine } = useNavigationFlowContext();
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} font-raleway`;
    const [isCompleted, setIsCompleted] = useState(status === 'completed');

    const handlePress = () => {
        setScreenRoutine(routine);
        router.push('/routinedetail');
    };

    const toggleComplete = (e: any) => {
        e.stopPropagation();
        setIsCompleted(!isCompleted);
        onComplete && onComplete(!isCompleted);
    };

    const isNextRoutine = true

    return (
        <TouchableOpacity
            disabled={!isNextRoutine}
            onPress={handlePress}
            className={`
                my-2 p-4 rounded-xl
                ${isDark ? 'bg-darkGray-600' : 'bg-darkGray-100'}
                border-l-4 ${isCompleted ? 'border-eBlue-500' : 'border-darkGray-200'}
                flex flex-row items-center justify-between
                active:opacity-80
            `}
        >
            <View className="mr-3">
                <TouchableOpacity 
                    onPress={toggleComplete}
                    className={`
                        w-6 h-6 rounded-full 
                        ${isCompleted ? 'bg-eBlue-500' : 'bg-gray-300'}
                        items-center justify-center
                    `}
                >
                    {isCompleted && (
                        <Ionicons 
                            name="checkmark" 
                            size={16} 
                            color="white" 
                        />
                    )}
                </TouchableOpacity>
            </View>

            <View className="flex-1">
                <View className="flex-row items-center space-x-2">
                    <Text className={`${textStyle} text-sm font-ralewayBold uppercase mb-1`}>
                        {day}
                    </Text>
                </View>

                <Text 
                    numberOfLines={1} 
                    className={`${textStyle} text-base font-ralewayMedium`}
                >
                    {routine.nombre}
                </Text>
                
                <View className="flex-row items-center mt-2 space-x-4">
                    <View className="flex-row items-center">
                        <Ionicons 
                            name="time-outline" 
                            size={16} 
                            color={isDark ? '#fff' : '#374151'} 
                        />
                        <Text className={`${textStyle} text-xs ml-1`}>
                            30 min
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        <Ionicons 
                            name="barbell-outline" 
                            size={16} 
                            color={isDark ? '#fff' : '#374151'} 
                        />
                        <Text className={`${textStyle} text-xs ml-1`}>
                            {routine.dificultad}
                        </Text>
                    </View>
                </View>
            </View>

            <View className="ml-4">
                <Ionicons 
                    name="chevron-forward" 
                    size={24} 
                    color={isDark ? '#fff' : '#374151'} 
                />
            </View>
        </TouchableOpacity>
    );
};

export default RoutineWeekDayPlanCard;