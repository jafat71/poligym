import { View, Text } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Plan } from './PlanConstants'
import { useTheme } from '@/context/ThemeContext'

const PlanSmallCard = ({ title, duration, users, rating, image, level }: Plan) => {
    const iconColor = "white" 
    return (
        <Pressable
            key={title}
            className={`w-40 h-28 mr-2 mb-1 bg-eBlue-500 
            overflow-hidden flex flex-row justify-start rounded-xl`}>
            <Image
                source={{ uri: image }}
                className="w-full h-28 absolute translate-x-1/3 opacity-75"
                resizeMode="cover"
            />
            <View className="p-2 flex flex-row items-center justify-between ">
                <View className='flex flex-col items-start justify-center '>
                    <Text className={`text-white text-base font-ralewayBold`}>
                        {title}
                    </Text>
                    <View className='flex flex-row items-center justify-between '>
                        <View className='flex flex-row items-center justify-between gap-x-8'>
                            <View>
                                <Ionicons name="person-outline" size={18} color={iconColor} />
                                        <Text className={`text-white text-xs font-raleway`}>{users}</Text>
                            </View>
                            <View>
                                <Ionicons name="star-outline" size={18} color={iconColor} />
                                        <Text className={`text-white text-xs font-raleway`}>{rating}</Text>
                            </View>
                            <View>
                                <Ionicons name="calendar" size={18} color={iconColor} />
                                        <Text className={`text-white text-xs font-raleway`}>{duration}</Text>
                            </View>
                            <View>
                                <Ionicons name="flame-outline" size={18} color={iconColor} />
                                        <Text className={`text-white text-xs font-raleway`}>{level}</Text>
                            </View>
                        </View>

                    </View>
                </View>

            </View>
        </Pressable>
    )
}

export default PlanSmallCard