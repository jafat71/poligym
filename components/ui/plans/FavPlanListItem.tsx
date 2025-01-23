import React from 'react'
import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native'

import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import { DIFFICULTY, TrainingPlanAPI } from '@/types/interfaces/entities/plan'

import HomePill from '../common/pills/HomePill'
import { useUser } from '@/context/UserContext'
import { useFavoriteTrainingPlan } from '@/hooks/useFavoriteTrainingPlan'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/context/ThemeContext'

interface FavPlanListItemProps {
    plan: TrainingPlanAPI
}

const FavPlanListItem = ({ plan }: FavPlanListItemProps) => {
    const handleNavigation = () => {
        router.push(`/(root)/(tabs)/(library)/plan/${plan.id}`)
    }
    const { handleUnfavoriteTrainingPlan } = useFavoriteTrainingPlan(plan);
    const { isDark } = useTheme();
    const planDuration = plan.workouts.length;
    return (
        <>
            <Pressable
                key={plan.id}
                onPress={handleNavigation}
                className={`w-full h-36 mb-1 rounded-lg overflow-hidden`}>
                <LinearGradient
                    colors={[
                        'rgba(0,85,249,0.95)',
                        'rgba(0,85,249,0.8)',
                        'rgba(0,85,249,0.95)'
                    ]}
                    className="absolute w-full h-full"
                />
                <View className='flex flex-row h-full'>
                    <TouchableOpacity 
                    testID="remove-favorite-button"
                    onPress={handleUnfavoriteTrainingPlan} className={`w-6 h-full ${isDark ? 'bg-white' : 'bg-darkGray-500'} flex flex-col justify-center`}>
                        <Ionicons name="trash-outline" size={24} color={isDark ? '#000' : '#fff'} />
                    </TouchableOpacity>
                    <View className='flex-1'>
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
                    </View>
                </View>
            </Pressable>
        </>
    )
}

export default FavPlanListItem