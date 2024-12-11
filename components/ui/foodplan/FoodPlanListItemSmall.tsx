import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'

import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import HomePill from '../common/pills/HomePill'
import { NutritionPlan } from '@/types/interfaces/entities/foodplan'

const FoodPlanListItemSmall = (plan: NutritionPlan) => {
    const handleNavigation = () => {
        router.push(`/foodplan/${plan.id}`)
    }
    const planDuration = plan.duration;

    return (
        <>
            <Pressable
                key={plan.id}
                onPress={handleNavigation}
                className={`w-full h-36 mr-2 rounded-lg overflow-hidden`}>
                <Image
                    source={{ uri: plan.imageURL }}
                    className="w-full h-full absolute"
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={[
                        'rgba(0,128,0,0.95)',
                        'rgba(0,128,0,0.8)',
                        'rgba(0,128,0,0.95)'
                    ]}
                    className="absolute w-full h-full"
                />
                <View className="absolute w-2 h-full bg-lightGreen  "/>
                <View className='p-4 flex flex-row justify-between'>
                    <View className='flex flex-col'>
                        <Text 
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            className='text-white font-ralewayBold text-xl'>{plan.name}</Text>
                    </View>
                </View>

                <View className='flex-1 items-start justify-end p-2'>
                    <View className="flex-row items-start justify-between px-2 gap-x-2">
                        <HomePill
                            icon="time-outline"
                            text={`${planDuration} semanas`}
                        />
                        <HomePill
                            icon="flame-outline"
                            text={`${plan.category}`}
                        />
                    </View>
                </View>
            </Pressable>
        </>
    )
}

export default FoodPlanListItemSmall