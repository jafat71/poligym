import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'

import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import { DIFFICULTY, TrainingPlanAPI } from '@/types/interfaces/entities/plan'

import HomePill from '../common/pills/HomePill'

const FavPlanListItem = (plan: TrainingPlanAPI) => {
    const handleNavigation = () => {
        router.push(`/plan/${plan.id}`)
    }
    const planDuration = plan.workouts.length;
    return (
        <>
            <Pressable
                key={plan.id}
                onPress={handleNavigation}
                className={`w-full h-36 mr-2 rounded-lg overflow-hidden`}>
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
                <View className="absolute w-2 h-full bg-lightGreen  "/>
                <View className='p-4 flex flex-row justify-between'>
                        <Text numberOfLines={2} ellipsizeMode="tail" className='text-white font-ralewayBold text-xl'>{plan.name}</Text>
                </View>

                <View className='flex-1 items-start justify-end p-2'>
                    <View className="flex-row items-start justify-between px-2 gap-x-2">
                        <HomePill
                            icon="time-outline"
                            text={`${planDuration} rutinas`}
                        />
                        <HomePill
                            icon="flame-outline"
                            text={`${plan.level}`}
                        />
                    </View>
                </View>
            </Pressable>
        </>
    )
}

export default FavPlanListItem