import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'

import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import HomePill from '../common/pills/HomePill'
import { NutritionPlan } from '@/types/interfaces/entities/foodplan'
import { Ionicons } from '@expo/vector-icons'

const FoodPlanListItem = (plan: NutritionPlan) => {
    const handleNavigation = () => {
        router.push(`/foodplan/${plan.id}`)
    }
    const planFirstWord = plan.name.split(' ')[0]
    const planRest = plan.name.split(' ').slice(1).join(' ')
    const planDuration = plan.duration;

    return (
        <>
            <Pressable
                key={plan.id}
                onPress={handleNavigation}
                className={`w-full h-72 mr-2 rounded-lg overflow-hidden`}>
                <Image
                    source={{ uri: plan.imageURL }}
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
                <View className='absolute right-0 top-10 z-1 translate-x-14 '>
                    <Ionicons name="nutrition-outline" size={194} color="#0085F9" />
                </View>
                <View className='z-30 flex-1'>
                    <View className='p-4 flex flex-row justify-between'>
                        <View className='flex flex-col w-4/5'>
                            <Text className='text-white font-ralewayBold text-sm'>{planFirstWord}</Text>
                            <Text className='text-white font-ralewayBold text-4xl '>{planRest}</Text>
                        </View>

                    </View>

                    <View className='flex-1 items-start justify-end p-4'>
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
                        <Text
                            className="text-white font-ralewayLight text-sm"
                            numberOfLines={3}
                            ellipsizeMode="tail"
                        >
                            {plan.description}
                        </Text>
                    </View>

                </View>
            </Pressable>
        </>
    )
}

export default FoodPlanListItem