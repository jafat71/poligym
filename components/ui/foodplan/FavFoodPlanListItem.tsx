import React from 'react'
import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native'

import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import HomePill from '../common/pills/HomePill'
import { FOODPLAN_CATEGORY, NutritionPlan } from '@/types/interfaces/entities/foodplan'
import { Ionicons } from '@expo/vector-icons'
import { useFavoriteNutritionPlan } from '@/hooks/useFavoriteNutritionPlan'
import { useTheme } from '@/context/ThemeContext'
import { useUser } from '@/context/UserContext'

interface FavFoodPlanListItemProps {
    plan: NutritionPlan
}

const FavFoodPlanListItem = ({ plan }: FavFoodPlanListItemProps) => {
    const handleNavigation = () => {
        router.push(`/foodplan/${plan.id}`)
    }
    const { isDark } = useTheme();
    const { handleUnfollowPlan } = useFavoriteNutritionPlan(plan);
    return (
        <>
            <Pressable
                key={plan.id}
                onPress={handleNavigation}
                className={`w-full h-36 mb-1 rounded-lg overflow-hidden`}>
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
                <View className='flex flex-row h-full'>
                    <TouchableOpacity onPress={handleUnfollowPlan} className={`w-6 h-full ${isDark ? 'bg-white' : 'bg-darkGray-500'} flex flex-col justify-center`}>
                        <Ionicons name="trash-outline" size={24} color={isDark ? '#000' : '#fff'} />
                    </TouchableOpacity>
                    <View className='flex-1'>
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
                                    text={`${plan.duration} semanas`}
                                />
                                <HomePill
                                    icon="flame-outline"
                                    text={`${plan.category}`}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        </>
    )
}

export default FavFoodPlanListItem