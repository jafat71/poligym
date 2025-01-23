import React from 'react'
import { View, Text, Pressable } from 'react-native'

import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import { TrainingPlanAPI } from '@/types/interfaces/entities/plan'

import { Ionicons } from '@expo/vector-icons'
import IconButton from '../common/buttons/IconButton'
import HomePill from '../common/pills/HomePill'

const PlanCard = (plan: TrainingPlanAPI) => {
    const handleNavigation = () => {
        router.push(`/(tabs)/(home)/playPlan/${plan.id}`)
    }
    const planFirstWord = plan.name.split(' ')[0]
    const planRest = plan.name.split(' ').slice(1).join(' ')
    return (
        <>
            <Pressable
                key={plan.id}
                onPress={handleNavigation}
                className={`w-72 h-72 mr-2 rounded-lg overflow-hidden`}>
                <LinearGradient
                    colors={[
                        'rgba(0,85,249,0.95)',
                        'rgba(0,85,249,0.8)',
                        'rgba(0,85,249,0.95)'
                    ]}
                    className="absolute w-full h-full"
                />

                <View className='absolute right-0 top-10 z-1 translate-x-14 '>
                    <Ionicons name="calendar-outline" size={194} color="#0085F9" />  
                </View>
                <View className='z-30 flex-1'>
                    <View className='p-4 flex flex-row justify-between'>
                        <View className='flex flex-col w-4/5'>
                            <Text className='text-white font-ralewayBold text-sm'>{planFirstWord}</Text>
                            <Text className='text-white font-ralewayBold text-4xl '>{planRest}</Text>
                        </View>
                        <View>
                            <IconButton
                                icon={<Ionicons name="information" size={24} color="white" />}
                                onPress={() => {
                                }}
                            />
                        </View>
                    </View>


                    <View className='flex-1 items-start justify-end p-4'>
                        <View className="flex-row items-start justify-between gap-x-2">
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

                </View>
            </Pressable>
        </>
    )
}

export default PlanCard