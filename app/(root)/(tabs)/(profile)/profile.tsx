import { useTheme } from '@/context/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, Pressable, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  const { isDark } = useTheme()
  return (
    <SafeAreaView className={`flex flex-1 ${isDark ? "bg-darkGray-500" : "bg-eBlue-500"} `}>

      <View className='flex flex-row items-center justify-between w-full bg-blue-900'>
        <View className='flex flex-row items-center justify-center gap-2'>
          <View className={`w-24 h-24 scale-110 rounded-full  flex items-center justify-center p-1 ${isDark ? "bg-eBlue-500" : "bg-eBlue-900"}  `}>
            <Ionicons name="person-circle" size={42} color={`#fff`} />
          </View>
          <Text className='text-3xl text-white font-ralewayBold pl-2'>Jhon Doe</Text>
        </View>

        <View className='mr-4'>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={32} color={`#fff`} />
          </TouchableOpacity>
        </View>

      </View>

      <View className='p-4'>
        <TouchableOpacity className='my-2'>
          <View className='flex flex-row items-center gap-3'>
            <Ionicons name="person-sharp" size={32} color={`#fff`} />
            <Text className='text-xl text-white font-ralewayBold'>Mi Perfil</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className='my-2'>
          <View className='flex flex-row items-center gap-3'>
            <Ionicons name="calendar-clear-outline" size={32} color={`#fff`} />
            <Text className='text-xl text-white font-ralewayBold'>Mi Plan</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className='my-2'>
          <View className='flex flex-row items-center gap-3'>
            <Ionicons name="star-half" size={32} color={`#fff`} />
            <Text className='text-xl text-white font-ralewayBold'>Mi Progreso</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className='my-2'>
          <View className='flex flex-row items-center gap-3'>
            <Ionicons name="reload-circle-outline" size={32} color={`#fff`} />
            <Text className='text-xl text-white font-ralewayBold'>Historial de ejercicios</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className='my-2'>
          <View className='flex flex-row items-center gap-3'>
            <Ionicons name="heart-circle" size={32} color={`#fff`} />
            <Text className='text-xl text-white font-ralewayBold'>Favoritos</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Profile