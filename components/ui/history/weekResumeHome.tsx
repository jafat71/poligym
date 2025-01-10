import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { useUser } from '@/context/UserContext'

import WeekCalendar from './weekCalendar'
import IconButton from '../common/buttons/IconButton'
import { getUserHistoryWorkoutProgress, tempGetAllFromSqlite } from '@/database/sqlite'
import { getHistorialTime } from '@/lib/utils/getHistorialTime'
import { useHistorialTime } from '@/hooks/useHistorialTime'

const WeekResumeHome = () => {
    const { loggedUserInfo } = useUser()
    const { historyTime } = useHistorialTime();

    return (
        <View className={`px-4`}>
            <View className='flex flex-row items-center justify-between my-1'>
                <View className='flex flex-row items-center justify-center gap-x-1'>
                    <Text className={`text-white font-ralewayBold `}>
                        Tu semana
                    </Text>
                    
                </View>
                <IconButton
                    icon={<Ionicons name="add" size={24} color="white" />}
                    onPress={() => {
                            router.push('/(root)/(stats)/stats')
                        }}
                    />
            </View>
            <WeekCalendar />
            <View className='flex flex-row items-start justify-between my-2'>

                <View >
                    <Text className={`font-ralewayBold text-start text-white`}>Tiempo Trabajado</Text>
                    <View className='flex flex-row items-center justify-center'>
                    <Text className={`text-4xl text-start text-white`}>{historyTime.split(':')[0]}</Text>
                    <Text className={`text-4xl text-start text-white`}>{historyTime.split(':')[1]}</Text>
                    <Text className={`text-4xl text-start text-white`}>{historyTime.split(':')[2]}</Text>

                    </View>
                </View>
                <View className='flex flex-col items-end justify-end'>
                    <Text className={`text-sm font-ralewayBold text-start text-white`}>Dias Activo</Text>
                    <Text className={`text-4xl font-semibold text-start text-white`}>{loggedUserInfo?.userNumberActivityDays ?? 0}</Text>
                </View>

            </View>
        </View>
    )
}

export default WeekResumeHome