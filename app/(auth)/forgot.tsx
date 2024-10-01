import { useTheme } from '@/context/ThemeContext'
import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import TopHeaderComponent from '@/components/ui/header/TopHeaderComponent';
import { ScrollView } from 'react-native-gesture-handler';
import AuthSupportButton from '@/components/ui/buttons/AuthSupportButton';

const Forgot = () => {
  const { isDark } = useTheme()
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log({
      email,
    });
  };
  return (
    <SafeAreaView className={`flex flex-1 flex-col justify-center r ${isDark ? "bg-darkGray-500" : "bg-eBlue-500"}`}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >

        <View className='p-4'>

          <TopHeaderComponent />

          <View className='p-4 mt-2 bg-eBlue-800 rounded-lg shadow-2xl shadow-eBlue-700'>

            <Text className='text-2xl font-ralewayBold text-center mb-6 text-lightGreen'>Olvidé mi contraseña</Text>

            <Text className={`mt-2 text-xl text-center mb-4 text-white`}>Ingresa tu correo electónico para recibir las instrucciones necesarias para recuperar el acceso a tu cuenta</Text>

            <Text className='text-2xl font-ralewayBold text-white'>Email Institucional</Text>
            <View className='bg-eBlue-800 mt-2 rounded-lg shadow-lg text-white-100'>

              <View className='flex flex-row items-center justify-center w-full'>
                <View className='w-10 h-10 items-center p-1 '>
                  <Ionicons name="person" size={35} color="#0059FF" />
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

          <View className='mb-10'>
            <AuthSupportButton
              title='Regresar al login'
              route={'/(auth)/signin'}
            />


          </View>

          <CTAButtonPrimary
            route={'/(auth)/signin'}
            text='Enviar Correo'
          />
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default Forgot