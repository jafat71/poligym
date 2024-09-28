import CTAButton from '@/components/ui/ctaButton';
import MainLogoGradientComponent from '@/components/ui/mainLogoGrandient'
import WelcomeHeaderComponent from '@/components/ui/welcomeHeader'
import { useTheme } from '@/context/ThemeContext'
import FontAwesome6 from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import React from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Signin = () => {
  const { isDark } = useTheme()

  return (
    <SafeAreaView className={`p-4 flex flex-1 flex-col justify-center r ${isDark ? "bg-darkGray-500" : "bg-white-100"}`}>

      <WelcomeHeaderComponent />

      <View className='p-4 mt-2 bg-darkGray-900'>
        <Text className='text-2xl font-ralewayBold text-white-100'>Email Institucional</Text>
        <View className='bg-darkGray-800 mt-2 rounded-lg shadow-lg text-white-100'>

          <View className='flex flex-row items-center justify-around w-full'>
            <View className='w-10'>
              <FontAwesome6 name="user" size={24} color="white" />
            </View>
            <TextInput
              className='flex-1 bg-darkGray-800 mt-2 rounded-lg shadow-lg text-white-100 ml-2'
              placeholder="useless "
              keyboardType="numeric"
              placeholderTextColor="#FFFFFF"
            />
          </View>



        </View>

        <Text className='text-2xl font-ralewayBold text-white-100'>Contraseña</Text>
        <View className='bg-darkGray-800 mt-2 rounded-lg shadow-lg text-white-100'>

          <View className='flex flex-row items-center justify-around w-full'>
            <View className='w-10'>
              <FontAwesome6 name="shield" size={24} color="white" />
            </View>
            <TextInput
              className='flex-1 bg-darkGray-800 mt-2 rounded-lg shadow-lg text-white-100 ml-2'
              placeholder="useless "
              keyboardType="ascii-capable"
              placeholderTextColor="#FFFFFF"
            />
          </View>



        </View>


      </View>

      <View className='w-full items-end justify-end'>
        <Pressable
          className='mb-5'
          onPress={() => {
            router.replace('/(auth)/signup')
          }}
        >
          <Text className={`mt-2 text-xl ${isDark ? "text-white-100" : "text-darkGray-500"} `}>Ya tengo una cuenta</Text>
        </Pressable>
      </View>

      <View className='w-full items-end justify-end'>
        <Pressable
          className='mb-5'
          onPress={() => {
            router.replace('/(auth)/forgot')
          }}
        >
          <Text className={`mt-2 text-xl ${isDark ? "text-white-100" : "text-darkGray-500"} `}>Olvide mi contraseña</Text>
        </Pressable>
      </View>


      <CTAButton
        route={'/(tabs)/home'}
        text='Ingresar'
      />

    </SafeAreaView>
  )
}

export default Signin