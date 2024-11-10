import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const HomePill = ({icon, text}: {icon: string, text: string}) => {
  return (
    <View className="bg-eBlue-500 rounded-full px-4 py-1.5 flex-row items-center">
        <Ionicons name={icon as any} size={14} color="white" />
        <Text className="text-white text-sm font-ralewayBold ml-1">
            {text}
        </Text>
    </View>
  )
}

export default HomePill