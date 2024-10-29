import { View, Text } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Plan } from './PlanConstants'

const PlanSmallCard = ({ title, duration, users, rating, image, level }: Plan) => {
    return (
        <Pressable
            key={title}
            className={`w-full h-14 mr-2 mb-1 
            border-b-2 border-r-2 border-white
            overflow-hidden flex flex-row justify-start rounded-xl`}>
            <Image
                source={{ uri: image }}
                className="w-14 h-14"
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
                                <Ionicons name="person-outline" size={18} color={"white"} />
                                <Text className={`text-white text-xs font-raleway`}>{users}</Text>
                            </View>
                            <View>
                                <Ionicons name="star-outline" size={18} color={"white"} />
                                <Text className={`text-white text-xs font-raleway`}>{rating}</Text>
                            </View>
                            <View>
                                <Ionicons name="calendar" size={18}color={"white"} />
                                <Text className={`text-white text-xs font-raleway`}>{duration}</Text>
                            </View>
                            <View>
                                <Ionicons name="flame-outline" size={18} color={"white"} />
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