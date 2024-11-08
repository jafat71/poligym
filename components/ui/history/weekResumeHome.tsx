import { View, Text, Pressable } from 'react-native'
import React from 'react'
import WeekCalendar from './weekCalendar'
import { useTheme } from '@/context/ThemeContext'
import { useUser } from '@/context/UserContext'
import { Ionicons } from '@expo/vector-icons'
const WeekResumeHome = () => {
    const { isDark } = useTheme()
    const { loggedUserInfo } = useUser()
    return (
        <View className={`px-4`}>
            <View className='flex flex-row items-center justify-between my-1'>
                <View className='flex flex-row items-center justify-center gap-x-1'>
                    <Ionicons name="calendar-outline" size={14} color={isDark ? "white" : "black"} />
                    <Text className={`${isDark ? "text-white" : "text-darkGray-500"}
            font-ralewayBold 
            `}>
                        Tu semana
                    </Text>
                </View>
                <Pressable className='flex flex-row items-center justify-center'>
                    <Text className={`text-eBlue-500 font-ralewayBold`}>Ver más</Text>
                </Pressable>
            </View>
            <WeekCalendar />
            <View className='flex flex-row items-start justify-between my-2'>

                <View >
                    <Text className={`font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Tiempo Trabajado</Text>
                    <Text className={`text-xl font-ralewaySemiBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>00h00m</Text>
                </View>
                <View >
                    <Text className={`text-sm font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Dias Activo</Text>
                    <Text className={`text-xl font-ralewaySemiBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{loggedUserInfo?.userNumberActivityDays}</Text>
                </View>

            </View>
        </View>
    )
}

export default WeekResumeHome