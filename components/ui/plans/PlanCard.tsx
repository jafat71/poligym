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
    const { setUserSelectedPlan, userSelectedPlan} = useUser()
    const handleNavigation = () => {
        setScreenPlan({...plan})
        router.push('/(tabs)/(home)/plandetail')
    }
    const isUserActualPlan = userSelectedPlan?.nombre === plan.nombre
    return (
        <Pressable
            key={plan.id}
            onPress={handleNavigation}
            className={`w-72 h-72 mr-2 rounded-lg overflow-hidden bg-eBlue-500`}>
            <Image
                source={{ uri: plan.imagenPlanEntrenamiento }}
                className="w-full h-full absolute translate-x-1/3 opacity-75"
                resizeMode="cover"
            />

            <View className="flex-1 bg-eBlue-500/40 p-4 justify-between">

                <View className='flex flex-col items-end'>
                    <View className='flex flex-row items-center'>
                        <View
                            className='bg-darkGray-500 rounded-full px-2 py-1 w-1/2 flex items-center'>
                            <Text className='text-white text-sm font-ralewayExtraBold'>{plan.duracion} semanas</Text>
                        </View>
        
                    </View>

                
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

                    <Pressable 
                    onPress={()=>{
                        setUserSelectedPlan(plan)
                        handleNavigation()
                    }}
                    className='border-2 border-white p-2 w-full rounded-md my-1'>
                        <Text className='text-white font-ralewayBold text-center'> 
                            {
                                isUserActualPlan
                                ? "CONTINUAR"
                                : "EMPEZAR"
                            }
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
}

export default PlanCard