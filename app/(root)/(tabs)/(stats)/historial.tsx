import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import CalendarResumeFull from '@/components/ui/history/CalendarResumeFull'

export const Historial = () => {
    const { isDark } = useTheme()
    return (
        <View className={`flex-1 px-4
        ${isDark ? "bg-darkGray-500" : "bg-white"}
    `}>
      <Text className={`text-4xl font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"}`}>Historial</Text>
      <CalendarResumeFull/>
    </View>
  )
}

export default Historial