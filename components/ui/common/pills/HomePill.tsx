import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const HomePill = ({icon, text}: {icon: string, text: string}) => {
  return (
    <View className="px-3 py-2 mr-1 mb-1  backdrop-blur-lg
    bg-eBlue-500/20 rounded-full
    flex flex-row items-center">
        <Ionicons name={icon as any} size={16} color="white" />
        <Text className="text-white text-xs font-ralewayBold ml-1 capitalize">
            {text}
        </Text>
    </View>
  )
}

export default HomePill