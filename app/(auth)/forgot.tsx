import WelcomeHeaderComponent from '@/components/ui/welcomeHeader'
import { useTheme } from '@/context/ThemeContext'
import { router } from 'expo-router';
import React, { useState } from 'react'
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome6 from '@expo/vector-icons/Ionicons';
import CTAButtonPrimary from '@/components/ui/CtaButtonPrimary';

const Forgot = () => {
  const { isDark } = useTheme()
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log({
      email,
    });
  };
  return (
    <SafeAreaView className={`p-4 flex flex-1 flex-col justify-center r ${isDark ? "bg-darkGray-500" : "bg-white-100"}`}>

      <WelcomeHeaderComponent />

      <View className='p-4 mt-2 bg-darkGray-900'>
        <Text className={`mt-2 text-xl text-center mb-4 text-lightGreen`}>Ingresa tu correo electónico para recibir las instrucciones necesarias para recuperar el acceso a tu cuenta</Text>

        <Text className='text-2xl font-ralewayBold text-white'>Email Institucional</Text>
      <View className='bg-darkGray-800 mt-2 rounded-lg shadow-lg text-white-100'>

          <View className='flex flex-row items-center justify-center w-full'>
            <View className='w-10'>
              <FontAwesome6 name="person" size={35} color="#0059FF" />
            </View>
            <TextInput
              className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
              placeholder="tu.nombre@epn.edu.ec"
              keyboardType="email-address"
              placeholderTextColor="#FFFFFF"
              value={email}
              onChangeText={setEmail}
            />
          </View>

        </View>
        <Text className='text-sm text-center font-ralewayBold text-white-100'>
        </Text>


      </View>

      <View className='w-full items-end justify-end'>
        <TouchableOpacity
          className='mb-5'
          onPress={() => {
            router.replace('/(auth)/signin')
          }}
        >
          <Text className={`mt-2 text-xl ${isDark ? "text-white" : "text-darkGray-500"} `}>Regresar al login</Text>
        </TouchableOpacity>
      </View>


      <CTAButtonPrimary
        route={'/(auth)/signin'}
        text='Enviar Correo'
      />

    </SafeAreaView>
  )
}

export default Forgot