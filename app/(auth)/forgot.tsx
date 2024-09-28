import CTAButton from '@/components/ui/ctaButton';
import MainLogoGradientComponent from '@/components/ui/mainLogoGrandient'
import WelcomeHeaderComponent from '@/components/ui/welcomeHeader'
import { useTheme } from '@/context/ThemeContext'
import FontAwesome6 from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import React from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Forgot = () => {
  const { isDark } = useTheme()

  return (
    <SafeAreaView className={`p-4 flex flex-1 flex-col justify-center r ${isDark ? "bg-darkGray-500" : "bg-white-100"}`}>

      <WelcomeHeaderComponent />

      <View className='p-4 mt-2 bg-darkGray-900'>
        <Text className={`mt-2 text-xl text-center mb-4 text-white-100`}>Ingresa tu correo electónico para recibir las instrucciones necesarias para recuperar el acceso a tu cuenta</Text>

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

        <Text className='text-sm text-center font-ralewayBold text-white-100'>
        </Text>


      </View>

      <View className='w-full items-end justify-end'>
        <Pressable
          className='mb-5'
          onPress={() => {
            router.replace('/(auth)/signin')
          }}
        >
          <Text className={`mt-2 text-xl ${isDark ? "text-white-100" : "text-darkGray-500"} `}>Regresar al login</Text>
        </Pressable>
      </View>


      <CTAButton
        route={'/(tabs)/home'}
        text='Enviar Correo'
      />

    </SafeAreaView>
  )
}

export default Forgot