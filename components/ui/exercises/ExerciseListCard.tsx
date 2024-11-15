import React, { memo } from 'react'
import { View, Text, Pressable, Image } from 'react-native'

import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import { ExerciseAPI} from '@/types/interfaces/entities/plan'
import HomePill from '../common/pills/HomePill'
import { CATEGORIES, DIFFICULTIES } from '@/constants';
import { useNavigationFlowContext } from '@/context/NavFlowContext'

const ExerciseListCard = memo((exercise: ExerciseAPI) => {
    const router = useRouter()
    return (
        <Pressable
            key={exercise.id}
            onPress={() => {
                router.push(`/(library)/(exercise)/${exercise.id}`)
            }}
            className={`w-full h-40 mr-2 mb-1 
            overflow-hidden rounded-lg`}>
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
                    <Text className='text-white font-ralewayBold text-4xl '>{exercise.name}</Text>
                </View>

                <View>
                    <Text className='text-white font-ralewayLight text-sm'>{exercise.description}</Text>
                </View>
            </View>
            <View className='flex-1 items-start justify-end px-4'>
                <View className="flex-col items-start justify-between gap-x-2">
                    <View className='flex-col items-start justify-between gap-x-2'>
                        <HomePill
                            icon="fitness-outline"
                            text={`${CATEGORIES.find(category => category.value === exercise.category)?.label}`}
                        />  
                        <HomePill
                            icon="flame-outline"
                            text={`${DIFFICULTIES.find(difficulty => difficulty.value === exercise.level)?.label}`}
                        />
                        {
                            exercise.equipment.length > 0 && exercise.equipment.map((equipment) => (
                                <HomePill
                                    key={equipment.id}
                                    icon="fitness-outline"
                                    text={`${equipment.name}`}
                                />
                            ))
                        }
                        {
                            exercise.muscleGroups.length > 0 && exercise.muscleGroups.map((muscleGroup) => (
                                <HomePill
                                    key={muscleGroup as any}
                                    icon="fitness-outline"
                                    text={`${muscleGroup}`}
                                />
                            ))
                        }
                    </View>
                </View>
            </View>
        </Pressable>
    )
})

export default ExerciseListCard