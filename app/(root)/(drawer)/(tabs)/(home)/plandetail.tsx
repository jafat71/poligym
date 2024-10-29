import { ActivityIndicator, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigationFlowContext } from '@/context/NavFlowContext'
import { useTheme } from '@/context/ThemeContext'
import { Image } from 'react-native'

const plandetail = () => {
    const { screenPlan } = useNavigationFlowContext()
    const { isDark } = useTheme()

    return (
        <View className={`flex-1 ${isDark ? 'bg-darkGray-500' : 'bg-white'}`}>
            <View className='flex-1'>
                <Image source={{ uri: screenPlan?.image }} className='w-full h-40' />
                <Text className={`${isDark ? 'text-white' : 'text-darkGray-500'}
                text-center text-2xl font-ralewayExtraBold`}>{screenPlan?.title}</Text>
            </View>

        </View>
    )
}

export default plandetail
