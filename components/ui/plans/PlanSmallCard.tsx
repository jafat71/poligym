import { View, Text } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { RoutinePlan } from '@/types/interfaces/entities/plan'
import { getBannerImages } from './PlanConstants'
import { useNavigationFlowContext } from '@/context/NavFlowContext'
import { useRouter } from 'expo-router'

const PlanSmallCard = (routine: RoutinePlan) => {
    const iconColor = "white"
    const { setScreenRoutine } = useNavigationFlowContext()
    const router = useRouter()
    return (
        <Pressable
            key={routine.id}
            onPress={() => {
                setScreenRoutine(routine)
                router.push("/(tabs)/(home)/routinedetail")
            }}
            className={`w-40 h-28 mr-2 mb-1 
            overflow-hidden flex flex-row justify-start rounded-md`}>
            <Image
                source={{ uri: getBannerImages(routine) }}
                className="w-full h-28 absolute opacity-75"
                resizeMode="cover"
            />
            <View className="p-2 flex flex-row items-center justify-between  bg-eBlue-500/50 w-full">
                <View className='flex flex-col items-start justify-center '>
                    <Text className={`text-white text-base font-ralewayBold`}>
                        {routine.nombre}
                    </Text>
                    <View className='flex flex-row items-center justify-between '>
                        <View className='flex flex-row items-center justify-between gap-x-8'>
                            <View>
                                <Ionicons name="person-outline" size={18} color={iconColor} />
                                <Text className={`text-white text-xs font-raleway`}>{routine.dificultad}</Text>
                            </View>
                            <View>
                                <Ionicons name="star-outline" size={18} color={iconColor} />
                                <Text className={`text-white text-xs font-raleway`}>{routine.ejercicios.length} Ejercicios</Text>
                            </View>
                        </View>

                    </View>
                </View>

            </View>
        </Pressable>
    )
}

export default PlanSmallCard