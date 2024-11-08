import { View, Text } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import { Image } from 'react-native'
import { useNavigationFlowContext } from '@/context/NavFlowContext'
import { router } from 'expo-router'
import { TrainingPlan } from '@/types/interfaces/entities/plan'
import { useUser } from '@/context/UserContext'

const PlanCard = (plan: TrainingPlan) => {
    const { setScreenPlan } = useNavigationFlowContext()
    const { userSelectedPlan } = useUser()
    const handleNavigation = () => {
        setScreenPlan({ ...plan })
        router.push('/(tabs)/(home)/plandetail')
    }
    const isUserPlan = userSelectedPlan && userSelectedPlan.id === plan.id
    return (
        <>
            <Pressable
                key={plan.id}
                onPress={handleNavigation}
                className={`w-72 h-72 mr-2 rounded-lg overflow-hidden bg-eBlue-500`}>
                <Image
                    source={{ uri: plan.imagenPlanEntrenamiento }}
                    className="w-full h-full absolute translate-x-1/3 opacity-75"
                    resizeMode="cover"
                />

                <View className="flex-1 bg-eBlue-500/50 p-4 justify-end">
                    {
                        isUserPlan && (
                            <View className="absolute top-2 left-2 bg-white rounded-full px-3 py-1">
                                <Text className="text-eBlue-500 text-sm font-ralewayBold">Plan Actual</Text>
                            </View>
                        )
                    }
                    <View
                        className='absolute top-2 right-2 bg-darkGray-500 rounded-full px-3 py-1 '>
                        <Text className='text-white text-sm font-ralewayExtraBold'>{plan.duracion} semanas</Text>
                    </View>
                    <View>
                        <Text className="text-white text-xl font-ralewayBold">
                            {plan.nombre}
                        </Text>
                        <View className='flex flex-row items-center justify-start'>
                            <Text className="text-white font-ralewayBold">Dificultad: </Text>
                            <Text className="text-white font-raleway">{plan.dificultad}</Text>
                        </View>
                        <Text className="text-white font-ralewayLight">
                            {plan.descripcion}
                        </Text>
                    </View>
                </View>
            </Pressable>
        </>
    )
}

export default PlanCard