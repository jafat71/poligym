import { useTheme } from '@/context/ThemeContext'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Welcome = () => {
    const { isDark } = useTheme()
    return (
        <SafeAreaView className={`flex flex-1 justify-center items-center ${isDark ? "bg-darkGray-500 " : "bg-white-100 "} `}>
            <Text className={`font-ralewayBold text-3xl text-white-100 ${isDark ? "text-white-100" : "text-darkGray-500"}`}>Welcome Poligym s</Text>
        </SafeAreaView>
    )
}

export default Welcome