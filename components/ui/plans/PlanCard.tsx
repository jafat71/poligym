import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'

import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import { TrainingPlan } from '@/types/interfaces/entities/plan'

import { useNavigationFlowContext } from '@/context/NavFlowContext'
import { Ionicons } from '@expo/vector-icons'
import IconButton from '../common/buttons/IconButton'
import HomePill from '../common/pills/HomePill'

const PlanCard = (plan: TrainingPlan) => {
    const { setScreenPlan } = useNavigationFlowContext()
    const handleNavigation = () => {
        setScreenPlan({ ...plan })
        router.push('/(tabs)/(home)/plandetail')
    }
    const planFirstWord = plan.nombre.split(' ')[0]
    const planRest = plan.nombre.split(' ').slice(1).join(' ')
    return (
        <>
            <Pressable
                key={plan.id}
                onPress={handleNavigation}
                className={`w-72 h-72 mr-2 rounded-lg overflow-hidden`}>
                <Image
                    source={{ uri: plan.imagenPlanEntrenamiento }}
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
                    <View>
                        <IconButton
                            icon={<Ionicons name="information" size={24} color="white" />}
                            onPress={() => {
                                router.push('/(root)/(library)/info')
                            }}
                        />
                    </View>
                </View>


                <View className='flex-1 items-start justify-end p-4'>
                    <View className="flex-row items-start justify-between gap-x-2">
                        <HomePill
                            icon="time-outline"
                            text={`${plan.duracion} sem.`}
                        />
                        <HomePill
                            icon="flame-outline"
                            text={`${plan.dificultad}`}
                        />
                    </View>
                    <Text
                        className="text-white font-ralewayLight"
                        numberOfLines={3}
                        ellipsizeMode="tail"
                    >
                        {plan.descripcion}
                    </Text>
                </View>
            </Pressable>
        </>
    )
}

export default PlanCard