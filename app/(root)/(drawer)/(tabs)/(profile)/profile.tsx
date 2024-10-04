import { useTheme } from '@/context/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  const { isDark } = useTheme()
  return (
    <SafeAreaView className={`flex flex-1
    px-2 border-[1px] ${isDark ? "border-darkGray-400" : "border-darkGray-500"}  rounded-sm
    ${isDark ? "bg-darkGray-500" : "bg-white"} `}>


      <View className={`border-[1px] ${isDark ? "border-darkGray-400" : "border-darkGray-500"}  rounded-sm`}>
        <View className='p-2 rounded-lg '>
          <View className={`pb-2 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}
                    flex flex-row items-center justify-between`}>
            <View className={`rounded-full w-32 h-32 
                        flex items-center justify-center
                        border-[1px] ${isDark ? "border-darkGray-400" : "bg-darkGray-200 border-darkGray-500"}`}>
              <Text className={` text-2xl font-raleway ${isDark ? "text-white" : "text-darkGray-400"} `}>JD</Text>
            </View>
            <View className='h-full'>
              <Pressable
                onPress={() => {
                  router.navigate('/(profile)/config')
                }}
              >
                <Ionicons name="settings-outline" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
              </Pressable>
            </View>
          </View>

          <View className={`flex flex-row items-center`}>

            <View className={`pl-3 w-full items-end`}>
              <Text className={`text-2xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Jhon Doe</Text>
              <Text className={`text-base font-raleway text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>jhon.doe@epn.edu.ec</Text>

            </View>
          </View>
        </View>
      </View>



    </SafeAreaView>
  )
}

export default Profile