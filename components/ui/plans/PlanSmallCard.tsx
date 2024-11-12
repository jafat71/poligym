import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'

import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import { TrainingPlanAPI } from '@/types/interfaces/entities/plan'

import HomePill from '../common/pills/HomePill'

const PlanSmallCard = (plan: TrainingPlanAPI) => {
    const handleNavigation = () => {

    }
    const planFirstWord = plan.name.split(' ')[0]
    const planRest = plan.name.split(' ').slice(1).join(' ')
    const planDuration = plan.workouts.length;
    return (
        <>
            <Pressable
                key={plan.id}
                onPress={handleNavigation}
                className={`w-full h-72 mr-2 rounded-lg overflow-hidden`}>
                <Image
                    source={{ uri: plan.image }}
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
                        <Text className='text-white font-ralewayBold text-sm'>{planFirstWord}</Text>
                        <Text className='text-white font-ralewayBold text-4xl '>{planRest}</Text>
                    </View>
  
                </View>


                <View className='flex-1 items-start justify-end p-4'>
                    <View className="flex-row items-start justify-between gap-x-2">
                        <HomePill
                            icon="time-outline"
                            text={`${planDuration} rutinas`}
                        />
                        <HomePill
                            icon="flame-outline"
                            text={`${plan.level}`}
                        />
                    </View>
                    <Text
                        className="text-white font-ralewayLight"
                        numberOfLines={3}
                        ellipsizeMode="tail"
                    >
                        {plan.description}
                    </Text>
                </View>
            </Pressable>
        </>
    )
}

export default PlanSmallCard