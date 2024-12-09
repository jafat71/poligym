import React from 'react'
import { View, Text, Pressable } from 'react-native'

import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import { WorkoutAPI } from '@/types/interfaces/entities/plan'
import HomePill from '../common/pills/HomePill'

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
                    'rgba(255,87,34,0.8)',
                    'rgba(255,87,34,0.95)',
                    'rgba(255,87,34,1)',
                ]}
                className="absolute w-full h-full"
            />
            <View className="absolute w-2 h-full bg-ePurple-500" />
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
                            icon="flame-outline"
                            text={workout.level}
                        />

                    </View>
                    <View className='flex-row items-start justify-between gap-x-2'>
                        <HomePill
                            icon="flame-outline"
                            text={`${workout.frequency} veces`}
                        />
                        <HomePill
                            icon="flame-outline"
                            text={workout.category}
                        />
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default RoutineListCard