import { View, Text } from 'react-native'
import React from 'react'
import WeekCalendar from './weekCalendar'
import { useTheme } from '@/context/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import IconButton from '../common/buttons/IconButton'
import { StatsWeekChart } from '../stats/StatsWeekChart'
import { useRouter } from 'expo-router'
import { useHistorial } from '@/hooks/useHistorial'

const TimeResumeFull = () => {
    const { isDark } = useTheme()
    const router = useRouter()
    const { historyTime , completedWorkouts} = useHistorial();

    return (
        <View>
            <View className='flex flex-row items-center justify-between my-1'>
                <View className='flex flex-row items-center justify-center gap-x-1'>
                    <Text className={`${isDark ? "text-white" : "text-darkGray-500"} font-ralewayBold `}>
                        Tu semana
                    </Text>

                </View>
                <IconButton
                    icon={<Ionicons name="add" size={24} color={isDark ? "white" : "black"} />}
                    onPress={() => {
                        router.push('/(root)/(tabs)/(stats)/historial')
                    }}
                />
            </View>
            <WeekCalendar />
            <View className='flex flex-row items-start justify-between my-2'>

                <View >
                    <Text className={`font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Tiempo Trabajado</Text>
                    <Text className={`text-3xl font-semibold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{historyTime}</Text>
                </View>
                <View >
                    <Text className={`text-sm font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Rutinas Completadas</Text>
                    <Text className={`text-3xl font-semibold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{completedWorkouts}</Text>
                </View>

            </View>
            <StatsWeekChart />
        </View>
    )
}

export default TimeResumeFull