import { View, Text } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Level, levelColors, Plan } from './PlanConstants'
import { useNavigationFlowContext } from '@/context/NavFlowContext'
import { router } from 'expo-router'

const PlanCard = (plan: Plan) => {
    const { setScreenPlan } = useNavigationFlowContext()
    return (
        <Pressable
            key={plan.title}
            onPress={() => {
                setScreenPlan(plan)
                router.push('/(drawer)/(tabs)/(home)/plandetail')
            }}
            className={`w-72 h-72 mr-2 rounded-lg overflow-hidden bg-eBlue-500`}>
            <Image
                source={{ uri: plan.image }}
                className="w-full h-full absolute translate-x-1/3 opacity-75"
                resizeMode="cover"
            />

            <View className="flex-1 bg-eBlue-500/40 p-4 justify-between">

                <View >
                    <View className='flex flex-row items-center justify-between '>
                        <View
                            className='bg-darkGray-500 rounded-full px-2 py-1 w-1/3 flex items-center'>
                            <Text className='text-white text-sm font-ralewayExtraBold'>{plan.duration}</Text>
                        </View>
                        <View className={`${levelColors[plan.level]} 
                rounded-full px-2 py-1  flex items-center`}>
                            <Text className='text-darkGray-500 text-sm font-ralewayExtraBold'>{plan.level}</Text>
                        </View>
                    </View>

                    <Text className="text-white text-xl font-ralewayBold">
                        {plan.title}
                    </Text>
                    <View className='flex flex-row items-center justify-start gap-x-2'>
                        <Ionicons name="person-outline" size={18} color="white" />
                        <Text className='text-white text-sm font-ralewayExtraBold'>{plan.users}</Text>
                        <Ionicons name="star-outline" size={18} color="white" />
                        <Text className='text-white text-sm font-ralewayExtraBold'>{plan.rating}</Text>
                    </View>


                </View>


                <Text className="text-white font-ralewayLight">
                    {plan.description}
                </Text>
            </View>
        </Pressable>
    )
}

export default PlanCard