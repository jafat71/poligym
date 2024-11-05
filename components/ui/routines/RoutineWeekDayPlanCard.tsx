import { Pressable, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import { RoutinePlan } from '@/types/interfaces/entities/plan'
import * as Progress from 'react-native-progress';
import { router } from 'expo-router'
import { useNavigationFlowContext } from '@/context/NavFlowContext'
import { Ionicons } from '@expo/vector-icons'

interface RoutineWeekDayPlanCardProps {
    day: string
    routine: RoutinePlan
}

const RoutineWeekDayPlanCard = ({ day, routine }: RoutineWeekDayPlanCardProps) => {
    const { isDark } = useTheme()
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} text-xs font-raleway`
    const { setScreenRoutine} = useNavigationFlowContext()

    return (
        <View className='flex flex-row items-center justify-start '>
            <View className='p-2 justify-center'>
                <Ionicons name="chevron-forward-outline" size={24} color={isDark ? "white" : "#1c1c1c"} />
            </View>

            <Pressable 
                onPress={() => {
                    setScreenRoutine(routine)
                    router.push("/(tabs)/(home)/routinedetail")
                }}
                className={`mb-2 ${isDark ? 'bg-darkGray-500' : 'bg-white'}
            border-2 ${isDark ? 'border-white' : 'border-darkGray-500'}
            rounded-md p-2 flex flex-col  flex-1`}>
                <View className='flex flex-row items-center justify-start gap-x-2'>
                    <Progress.Pie progress={0.0} size={18} color={isDark ? "white" : "#1c1c1c"} />
                    <Text className={`${textStyle} text-base`}>
                        {day.slice(0, 3).toUpperCase()}
                    </Text>
                </View>
                <Text className={`${textStyle} 
                        font-ralewayBold `}>
                    {routine.nombre}
                </Text>
                <View className='flex flex-row items-center justify-between w-full'>

                </View>

            </Pressable>
        </View>
    )

}

export default RoutineWeekDayPlanCard
