import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import { useTheme } from '@/context/ThemeContext';
import IconTextInputForm from '@/components/ui/form/IconTextInputForm';
import { router } from 'expo-router';
import { StackActions } from '@react-navigation/native';
import AuthSupportButton from '@/components/ui/buttons/AuthSupportButton';
const Delete = () => {
  const { isDark } = useTheme()
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log({
      password,
    });
  };
  return (

    <View className='mt-2 rounded-lg '>

      <View className={`pb-5 `}>

        <Text className={`text-2xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Eliminar Cuenta</Text>
        <Text className={`text-lg font-raleway text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>Ingresa tu contraseña para confirmar tu identidad</Text>

      </View>

      <View className={`py-5 `}>

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
            title='Regresar'
            onPress={() => {
              router.back()
            }}          
            />


        </View>

      <CTAButtonPrimary
        onPress={() => {
          router.replace('/(auth)/signin')
        }} text='Eliminar'
      />
    </View>
  )
}

export default Delete