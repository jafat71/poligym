import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import AuthSupportButton from '@/components/ui/common/buttons/AuthSupportButton';
import { useTheme } from '@/context/ThemeContext';
import IconTextInputForm from '@/components/ui/common/form/IconTextInputForm';
import { router } from 'expo-router';

const Forgot = () => {
  const { isDark } = useTheme()
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log({
      email,
    });
  };
  return (
    <View className='mt-2 rounded-lg '>

      <View >

        <View className={`pb-5 `}>

          <Text className={`text-3xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Olvidé mi contraseña</Text>
          <Text className={`text-lg font-ralewaySemiBold text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>Ingresa tu correo electónico para recibir las instrucciones necesarias para recuperar el acceso a tu cuenta</Text>

        </View>

        <View className={`py-5 `}>
          <IconTextInputForm
            title='Email Institucional'
            icon={<Ionicons name="person-circle-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
            inputKeyboardType='email-address'
            inputPlaceholder='tu.nombre@epn.edu.ec'
            inputValue={email}
            inputOnChangeText={setEmail}
            inputSecure={false}
          />

        </View>

        <View className='mb-5'>
          <AuthSupportButton
            title='Regresar al login'
            onPress={() => {
              router.push('/(auth)/signin')
            }}
          />


        </View>

        <CTAButtonPrimary
          onPress={() => {
            router.push('/(auth)/signin')
          }} text='Enviar'
        />
      </View>
    </View>
  )
}

export default Forgot