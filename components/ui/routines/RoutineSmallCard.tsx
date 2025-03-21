import React from 'react'
import { View, Text, Pressable } from 'react-native'

import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import { WorkoutAPI } from '@/types/interfaces/entities/plan'
import HomePill from '../common/pills/HomePill'
import IconButton from '../common/buttons/IconButton'
import { Ionicons } from '@expo/vector-icons'
import { DIFFICULTY } from '@/types/interfaces/entities/plan'

const RoutineSmallCard = (routine: WorkoutAPI) => {

    const router = useRouter()
    const routineFirstWord = routine.name.split(' ')[0]
    const routineRest = routine.name.split(' ').slice(1).join(' ')

    return (
        <Pressable
            key={routine.id}
            onPress={() => {
                router.push(`/(home)/playWorkout/${routine.id}`)
            }}
            className={`w-72 h-60 mr-2 mb-1 
            overflow-hidden rounded-lg`}>
            <LinearGradient
                colors={[
                    'rgba(0,85,249,0.95)',
                    'rgba(0,85,249,0.8)',
                    'rgba(0,85,249,0.95)'
                ]}
                className="absolute w-full h-full"
            />
            <View className='absolute right-0 top-10 z-1 translate-x-14 '>
                <Ionicons name="barbell-outline" size={194} color="#0085F9" />  
            </View>
            <View className='z-30 flex-1'>
                <View className='p-4 flex flex-row justify-between'>
                    <View className='flex flex-col w-4/5'>
                        <Text className='text-white font-ralewayBold text-sm'>{routineFirstWord}</Text>
                        <Text className='text-white font-ralewayBold text-4xl '>{routineRest}</Text>
                    </View>
                    <View>
                        <IconButton
                            icon={<Ionicons name="information" size={24} color="white" />}
                            onPress={() => {
                                router.push(`/(library)/routine/${routine.id}`)
                            }}
                        />
                    </View>
                </View>
                <View className='flex-1 items-start justify-end p-4'>
                    <View className="flex-row items-start justify-between px-2 gap-x-2">

                        {/* <HomePill
                            icon="time-outline"
                            text={`${routine.duration ?? 0} min.`}
                        />
                        <HomePill
                            icon="flame-outline"
                            text={`${routine.level ?? ''}`}
                        /> */}

                        <Text className='text-white font-raleway text-sm'>
                            {routine.description}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default RoutineSmallCard