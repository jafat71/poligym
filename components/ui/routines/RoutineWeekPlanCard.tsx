import { View, Text } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import * as Progress from 'react-native-progress';
import { RoutinePlanUser, TrainingPlan } from '@/types/interfaces/entities/plan';
import RoutineWeekDayPlanCard from './RoutineWeekDayPlanCard';

interface RoutineWeekPlanCardProps {
    index: number;
    wk: TrainingPlan["detalleDias"];
}

const RoutineWeekPlanCard = ({ index, wk }: RoutineWeekPlanCardProps) => {
    const { isDark } = useTheme();
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} text-xs font-raleway`;
    
    const [completedRoutines, setCompletedRoutines] = useState<{ [key: string]: boolean }>({});

    const weekProgress = useMemo(() => {
        if (!wk) return 0;
        
        const routines = Object.entries(wk).filter(([_, routine]) => routine !== "Descanso");
        const totalRoutines = routines.length;
        const completed = routines.filter(([day, _]) => completedRoutines[day]).length;
        
        return totalRoutines > 0 ? completed / totalRoutines : 0;
    }, [wk, completedRoutines]);

    const handleRoutineComplete = (day: string, isCompleted: boolean) => {
        setCompletedRoutines(prev => ({
            ...prev,
            [day]: isCompleted
        }));
    };

    return (
        <View className={`w-full my-2 p-4 rounded-2xl shadow-lg ${isDark ? 'bg-darkGray-800' : 'bg-white'}`}>
            <View className='flex flex-row items-center justify-between mb-4'>
                <View className='flex flex-row items-center gap-x-3'>
                    <Progress.Circle
                        progress={weekProgress}
                        size={50}
                        showsText
                        formatText={() => `${Math.round(weekProgress * 100)}%`}
                        color={isDark ? "white" : "#1c1c1c"}
                        unfilledColor={isDark ? "#374151" : "#E5E7EB"}
                        borderWidth={0}
                        thickness={4}
                        strokeCap="round"
                    />
                    <Text className={`${textStyle} text-xl font-ralewayBold`}>
                        Semana {index + 1}
                    </Text>
                </View>
                
                <View className="flex-row items-center">
                    <Text className={`${textStyle} text-sm`}>
                        {Object.values(completedRoutines).filter(Boolean).length}/
                        {Object.entries(wk || {}).filter(([_, r]) => r !== "Descanso").length} 
                        <Text className={`${textStyle} text-xs`}> rutinas</Text>
                    </Text>
                </View>
            </View>

            <View className='w-full flex flex-col'>
                {wk && Object.entries(wk).map(([day, routine]) => {
                    return (routine !== "Descanso") ? (
                        <RoutineWeekDayPlanCard
                            key={`${day}-${(routine as RoutinePlanUser).id}`}
                            day={day}
                            routine={routine}
                            onComplete={(isCompleted) => handleRoutineComplete(day, isCompleted)}
                            status={completedRoutines[day] ? 'completed' : 'pending'}
                        />
                    ) : null;
                })}
            </View>
        </View>
    );
};

export default RoutineWeekPlanCard;