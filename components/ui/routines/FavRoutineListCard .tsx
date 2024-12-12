import React from 'react'
import { View, Text, Pressable } from 'react-native'

import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import { WorkoutAPI } from '@/types/interfaces/entities/plan'
import HomePill from '../common/pills/HomePill'

const FavRoutineListCard = (workout: WorkoutAPI) => {
    const router = useRouter()

    return (
        <Pressable
            key={workout.id}
            onPress={() => {
                router.push(`/(root)/(tabs)/(library)/routine/${workout.id}`)
            }}
            className={`w-full h-36 mr-2 mb-1 
            overflow-hidden rounded-lg `}>
            <LinearGradient
                colors={[
                    'rgba(0,85,249,0.95)',
                    'rgba(0,85,249,0.8)',
                    'rgba(0,85,249,0.95)'
                ]}
                className="absolute w-full h-full"
            />
            <View className="absolute w-2 h-full bg-ePurple-500" />
            <View className='p-4 flex flex-col justify-between'>
                <View className='flex flex-col'
                >
                    <Text numberOfLines={1} className='text-white font-ralewayBold text-2xl'>{workout.name}</Text>
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
        </Pressable>
    )
}

export default FavRoutineListCard