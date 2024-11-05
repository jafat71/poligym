import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import * as Progress from 'react-native-progress';

import { TrainingPlan } from '@/types/interfaces/entities/plan'
import RoutineWeekDayPlanCard from './RoutineWeekDayPlanCard';
import { Ionicons } from '@expo/vector-icons';

interface RoutineWeekPlanCardProps {
    index: number
    wk: TrainingPlan["detalleDias"]
}

const RoutineWeekPlanCard = ({ index, wk }: RoutineWeekPlanCardProps) => {
    const { isDark } = useTheme()
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} text-xs font-raleway`

    return (
        <View className='w-full '>
            <View className='flex flex-row items-center justify-start my-2 gap-x-3'>
                <Progress.Pie progress={0.4} size={50} color={isDark ? "white" : "#1c1c1c"} />
                <Text className={`${textStyle} text-xl my-2`}>Semana {index + 1}</Text>
            </View>
            <View
                className={`w-full flex flex-col `}>
                {wk && Object.entries(wk).map(([day, routine]) => {
                    return (routine !== "Descanso") ?
                        <RoutineWeekDayPlanCard
                            key={routine.id}
                            day={day}
                            routine={routine}
                        />
                        : null; // Skip "Descanso" days
                })}
            </View>
        </View>
    )
}

export default RoutineWeekPlanCard