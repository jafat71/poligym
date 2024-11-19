import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/context/ThemeContext'

const ThemeHomePill = ({icon, text}: {icon: string, text: string}) => {
    const {isDark} = useTheme()
  return (
    <View className="px-3 py-2 rounded-sm mr-1 mb-1 border-2 border-darkGray-200 flex flex-row items-center">
        <Ionicons name={icon as any} size={16} color={`${isDark ? "white" : "#1c1c1c"}`} />
        <Text className={`text-xs font-ralewayBold ml-1 capitalize ${isDark ? "text-white" : "text-darkGray-500"}`}>
            {text}
        </Text>
    </View>
  )
}

export default ThemeHomePill