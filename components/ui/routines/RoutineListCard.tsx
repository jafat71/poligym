import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'

import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import { WorkoutAPI } from '@/types/interfaces/entities/plan'
import HomePill from '../common/pills/HomePill'
import { CATEGORIES, DIFFICULTIES } from '@/constants';

const RoutineListCard = (workout: WorkoutAPI) => {
    const router = useRouter()
    const routineFirstWord = workout.name.split(' ')[0]
    const routineRest = workout.name.split(' ').slice(1).join(' ')

    return (
        <Pressable
            key={workout.id}
            onPress={() => {
            }}
            className={`w-full h-56 mr-2 mb-1 
            overflow-hidden rounded-lg`}>
            {
                //TODO: Get workout muscles and print body image
            }
            <LinearGradient
                colors={[
                    'rgba(0,85,249,0.95)',
                    'rgba(0,85,249,0.8)',
                    'rgba(0,85,249,0.95)'
                ]}
                className="absolute w-full h-full"
            />
            <View className='p-4 flex flex-col justify-between'>
                <View className='flex flex-col w-4/5'>
                    <Text className='text-white font-ralewayBold text-sm'>{routineFirstWord}</Text>
                    <Text className='text-white font-ralewayBold text-4xl '>{routineRest}</Text>
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
                            text={`${DIFFICULTIES.find(difficulty => difficulty.value === workout.level)?.label}`}
                        />
                        
                    </View>
                    <View className='flex-row items-start justify-between gap-x-2'>
                        <HomePill
                            icon="flame-outline"
                            text={`${workout.frequency} veces`}
                        />
                        <HomePill
                            icon="flame-outline"
                            text={`${CATEGORIES.find(category => category.value === workout.category)?.label}`}
                        />
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default RoutineListCard