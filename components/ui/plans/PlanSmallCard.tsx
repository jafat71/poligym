import { View, Text } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { RoutinePlan } from '@/types/interfaces/entities/plan'
import { getBannerImages } from './PlanConstants'

const PlanSmallCard = (routine: RoutinePlan) => {
    const iconColor = "white"
    return (
        <Pressable
            key={routine.id}
            className={`w-40 h-28 mr-2 mb-1 
            overflow-hidden flex flex-row justify-start rounded-xl`}>
            <Image
                source={{ uri: getBannerImages(routine) }}
                className="w-full h-28 absolute opacity-75"
                resizeMode="cover"
            />
            <View className="p-2 flex flex-row items-center justify-between  bg-eBlue-500/40 w-full">
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