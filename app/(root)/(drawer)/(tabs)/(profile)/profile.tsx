import { useTheme } from '@/context/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  const { isDark } = useTheme()
  return (
    <SafeAreaView className={`flex flex-1 ${isDark ? "bg-darkGray-500" : "bg-eBlue-500"} `}>

      <View className='flex flex-row items-center justify-between w-full bg-eBlue-800'>
        <View className='flex flex-row items-center justify-center gap-2'>
          <View className={`w-24 h-24 scale-110 rounded-full  flex items-center justify-center p-1 ${isDark ? "bg-eBlue-500" : "bg-eBlue-900"}  `}>
            <Ionicons name="person-circle" size={42} color={`#fff`} />
          </View>
          <Text className='text-3xl text-white font-ralewayBold pl-2'>Jhon Doe</Text>
        </View>

        <View className='mr-4'>
          <TouchableOpacity
            onPress={()=> {
              router.navigate('/(profile)/config')
            }}
          >
            <Ionicons name="settings-outline" size={32} color={`#fff`} />
          </TouchableOpacity>
        </View>

      </View>


    </SafeAreaView>
  )
}

export default Profile