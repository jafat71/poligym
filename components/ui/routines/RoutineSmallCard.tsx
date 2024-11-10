import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'

import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import { RoutinePlan } from '@/types/interfaces/entities/plan'
import { useNavigationFlowContext } from '@/context/NavFlowContext'
import { getBannerImages } from '../plans/PlanConstants'
import HomePill from '../common/pills/HomePill'
import IconButton from '../common/buttons/IconButton'
import { Ionicons } from '@expo/vector-icons'

const RoutineSmallCard = (routine: RoutinePlan) => {
    const { setScreenRoutine } = useNavigationFlowContext()
    const router = useRouter()
    const routineFirstWord = routine.nombre.split(' ')[0]
    const routineRest = routine.nombre.split(' ').slice(1).join(' ')
    return (
        <Pressable
            key={routine.id}
            onPress={() => {
                setScreenRoutine(routine)
                router.push("/(tabs)/(home)/routinedetail")
            }}
            className={`w-72 h-40 mr-2 mb-1 
            overflow-hidden rounded-lg`}>
            <Image
                source={{ uri: getBannerImages(routine) }}
                className="w-full h-full absolute"
                resizeMode="cover"
            />
            <LinearGradient
                colors={[
                    'rgba(0,85,249,0.95)',
                    'rgba(0,85,249,0.8)',
                    'rgba(0,85,249,0.95)'
                ]}
                className="absolute w-full h-full"
            />
            <View className='p-4 flex flex-row justify-between'>
                <View className='flex flex-col w-4/5'>
                    <Text className='text-white font-ralewayBold text-sm'>{routineFirstWord}</Text>
                    <Text className='text-white font-ralewayBold text-2xl '>{routineRest}</Text>
                </View>
                <View>
                    <IconButton
                        icon={<Ionicons name="information" size={24} color="white" />}
                        onPress={() => {
                            router.push('/(root)/(library)/info')
                        }}
                    />
                </View>
            </View>
            <View className='flex-1 items-start justify-end p-4'>
                <View className="flex-row items-start justify-between gap-x-2">

                    <HomePill
                        icon="time-outline"
                        text={`30 min.`}
                    />
                    <HomePill
                        icon="flame-outline"
                        text={`${routine.dificultad}`}
                    />
                </View>
            </View>
        </Pressable>
    )
}

export default RoutineSmallCard