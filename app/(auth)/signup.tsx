import AuthSupportButton from '@/components/ui/buttons/AuthSupportButton';
import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import IconTextInputForm from '@/components/ui/form/IconTextInputForm';
import { useTheme } from '@/context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

const Signup = () => {

  const { isDark } = useTheme()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    console.log({
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <View className={`p-4 border-[1px] ${isDark ? "border-darkGray-400" : "border-darkGray-200"}  rounded-sm`}>

      <View className='p-4 mt-2 rounded-lg '>

        <View className={`pb-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-200"}`}>

          <Text className={`text-2xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Registro</Text>
          <Text className={`text-lg font-raleway text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>Ingresa tu información para crear una cuenta</Text>

        </View>

        <View className={`py-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-200"}`}>
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

          <IconTextInputForm
            title='Confirmar Contraseña'
            icon={<Ionicons name="shield-checkmark-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
            inputKeyboardType='ascii-capable'
            inputPlaceholder='*********'
            inputValue={password}
            inputOnChangeText={setPassword}
            inputSecure={true}
          />

        </View>


        <View className='mb-5'>
          <AuthSupportButton
            title='Ya tengo una cuenta'
            onPress={() => {
              router.push('/(auth)/signin')
            }}
          />

        </View>

        <CTAButtonPrimary
          onPress={() => {
            router.push('/(animated)/form00')
          }}
          text='Registrarse'
        />
      </View>

      <View className='w-full items-center'>
        <Text className={`text-sm font-raleway text-center  ${isDark ? "text-white" : "text-darkGray-400"} `}>Al seleccionar REGISTRARSE, estas de acuerdo con nuestros TÉRMINOS Y CONDICIONES y nuestra POLÍTICA DE PRIVACIDAD</Text>
      </View>

    </View>
  )
}

export default Signup