import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import AuthSupportButton from '@/components/ui/buttons/AuthSupportButton';
import { useTheme } from '@/context/ThemeContext';
import IconTextInputForm from '@/components/ui/form/IconTextInputForm';
import { router } from 'expo-router';

const Signin = () => {

  const { isDark } = useTheme()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    console.log({
      email,
      password,
    });
  };

  return (

    <View className={`p-4 border-[1px] ${isDark ? "border-darkGray-400" : "border-darkGray-500"}  rounded-sm`}>

      <View className='p-4 mt-2 rounded-lg '>

        <View className={`pb-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>

          <Text className={`text-2xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Login</Text>
          <Text className={`text-lg font-raleway text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>Ingresa tus credenciales para acceder a la plataforma</Text>

        </View>

        <View className={`py-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
          <IconTextInputForm
            title='Email Institucional'
            icon={<Ionicons name="person-circle-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
            inputKeyboardType='email-address'
            inputPlaceholder='tu.nombre@epn.edu.ec'
            inputValue={email}
            inputOnChangeText={setEmail}
            inputSecure={false}
          />

          <IconTextInputForm
            title='Contraseña'
            icon={<Ionicons name="shield-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
            inputKeyboardType='ascii-capable'
            inputPlaceholder='*********'
            inputValue={password}
            inputOnChangeText={setPassword}
            inputSecure={true}
          />

        </View>

        <View className='mb-5'>
          <AuthSupportButton
            title='No tengo una cuenta'
            onPress={() => {
              router.push('/(auth)/signup')
            }}
          />

          <AuthSupportButton
            title='Olvidé mi contraseña'
            onPress={() => {
              router.push('/(auth)/forgot')
            }} />
        </View>

        <CTAButtonPrimary
          onPress={() => {
            router.push('/(root)/(tabs)/home')
          }}
          text='Ingresar'
        />

      </View>

    </View>

  )
}

export default Signin