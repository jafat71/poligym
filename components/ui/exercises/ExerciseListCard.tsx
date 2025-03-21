import React, { memo } from 'react'
import { View, Text, Pressable, Image } from 'react-native'

import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import { ExerciseAPI } from '@/types/interfaces/entities/plan'
import HomePill from '../common/pills/HomePill'
import { MuscleGroups } from '@/types/types/muscles'
import { Ionicons } from '@expo/vector-icons'

const ExerciseListCard = memo((exercise: ExerciseAPI) => {
    const router = useRouter()

    return (
        <Pressable
            key={exercise.id}
            onPress={() => {
                router.push(`/(library)/exercise/${exercise.id}`)
            }}
            className={`w-full h-60 mr-2 mb-1 
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
                <View className='p-4 flex flex-col justify-between'>
                    <View className='flex flex-col'>
                        <Text numberOfLines={1} className='text-white font-ralewayBold text-4xl '>{exercise.name}</Text>
                    </View>

                    <View>
                        <Text className='text-white font-ralewayLight text-sm'>{exercise.description}</Text>
                    </View>
                </View>
                <View className='flex-1 items-start justify-end px-4'>
                    <View className="flex-col items-start justify-between gap-x-2">
                        <View className='flex-row items-start justify-between gap-x-2'>
                            <HomePill
                                icon="fitness-outline"
                                text={exercise.category}
                            />
                            <HomePill
                                icon="flame-outline"
                                text={exercise.level}
                            />

                        </View>
                        <View className='flex-row items-start justify-between gap-x-2'>

                            {
                                exercise.muscleGroups.length > 0 && exercise.muscleGroups.map((muscleGroup) => (
                                    <HomePill
                                        key={muscleGroup as any}
                                        icon="fitness-outline"
                                        text={`${MuscleGroups[muscleGroup as unknown as keyof typeof MuscleGroups]}`}
                                    />
                                ))
                            }

                        </View>
                        <View className='flex-row items-start justify-between gap-x-2'>
                            {
                                exercise.equipment.length > 0 && exercise.equipment.map((equipment) => (
                                    <HomePill
                                        key={equipment.id}
                                        icon="fitness-outline"
                                        text={`${equipment.name}`}
                                    />
                                ))
                            }
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
})

export default ExerciseListCard