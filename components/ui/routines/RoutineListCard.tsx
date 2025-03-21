import React from 'react'
import { View, Text, Pressable } from 'react-native'

import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import { WorkoutAPI } from '@/types/interfaces/entities/plan'
import HomePill from '../common/pills/HomePill'
import { Ionicons } from '@expo/vector-icons'

const RoutineListCard = (workout: WorkoutAPI) => {
    const router = useRouter()
    const routineFirstWord = workout.name.split(' ')[0]
    const routineRest = workout.name.split(' ').slice(1).join(' ')

    return (
        <Pressable
            key={workout.id}
            onPress={() => {
                router.push(`/(root)/(tabs)/(library)/routine/${workout.id}`)
            }}
            className={`w-full h-60 mr-2 mb-1 
            overflow-hidden rounded-lg `}>
            <LinearGradient
                colors={[
                    'rgba(0,85,249,0.95)',
                    'rgba(0,85,249,0.8)',
                    'rgba(0,85,249,0.95)'
                ]}
                className="absolute w-full h-full"
            />
            <View className='absolute right-0 top-10 z-1 translate-x-14 '>
                <Ionicons name="body-outline" size={194} color="#0085F9" />
            </View>
            <View className='z-30 flex-1'>
                <View className='p-4 flex flex-col justify-between'>
                    <View className='flex flex-col'
                    >
                        <Text numberOfLines={1} className='text-white font-ralewayBold text-sm'>{routineFirstWord}</Text>
                        <Text numberOfLines={1} className='text-white font-ralewayBold text-4xl '>{routineRest}</Text>
                    </View>

                    <View>
                        <Text className='text-white font-ralewayLight text-sm'>{workout.description}</Text>
                    </View>
                </View>
                <View className='flex-1 items-start justify-end px-4'>
                    <View className="flex-col items-start justify-between gap-x-2">
                        <View className='flex-row items-start justify-between gap-x-2'>
                            <HomePill
                                icon="time-outline"
                                text={`${workout.duration} min.`}
                            />
                            <HomePill
                                icon="star-outline"
                                text={workout.level}
                            />

                        </View>
                        <View className='flex-row items-start justify-between gap-x-2'>
                            <HomePill
                                icon="barbell-outline"
                                text={`${workout.trainingType}`}
                            />
                            <HomePill
                                icon="flame-outline"
                                text={workout.category}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default RoutineListCard