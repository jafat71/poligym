import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import { TrainingPlan } from '@/types/interfaces/entities/plan'

interface PlanDetailedInfoProps {
    screenPlan: TrainingPlan
}

const PLanDetailedInfo = ({ screenPlan }: PlanDetailedInfoProps) => {
    const { isDark } = useTheme()
    const textStyle = `${isDark ? 'text-white' : 'text-darkGray-500'} text-xs font-raleway`

    return (
        <View className='my-2'>

            <View className={`border-2 border-${isDark ? "white" : "darkGray-500"} p-2
        rounded-md
    `}>
                <Text className={`${textStyle} text-lg`}>Información del Plan</Text>

                <View className='flex flex-row items-start justify-center'>
                    <View className='w-1/4'>
                        <Ionicons name='time-outline' size={22} color={isDark ? "white" : "#1c1c1c"} />
                        <Text className={`${textStyle}`}>Duración</Text>
                    </View>
                    <Text className={`${textStyle} w-3/4`}>{screenPlan?.duracion} Semanas</Text>
                </View>

                <View className='flex flex-row items-start justify-center'>
                    <View className='w-1/4'>
                        <Ionicons name='walk-outline' size={22} color={isDark ? "white" : "#1c1c1c"} />
                        <Text className={`${textStyle}`}>Dificultad</Text>
                    </View>
                    <Text className={`${textStyle} w-3/4`}>
                        {screenPlan?.dificultad}
                    </Text>
                </View>

                <View className='flex flex-row items-start justify-center'>
                    <View className='w-1/4'>
                        <Ionicons name='book-outline' size={22} color={isDark ? "white" : "#1c1c1c"} />
                        <Text className={`${textStyle}`}>Descripción</Text>
                    </View>
                    <Text className={`${textStyle} w-3/4`}>
                        {screenPlan?.descripcion}
                    </Text>
                </View>
            </View>

        </View>
    )
}

export default PLanDetailedInfo