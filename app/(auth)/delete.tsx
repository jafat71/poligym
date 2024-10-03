import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import { useTheme } from '@/context/ThemeContext';
import IconTextInputForm from '@/components/ui/form/IconTextInputForm';
import { router } from 'expo-router';
import { StackActions } from '@react-navigation/native';
const Delete = () => {
  const { isDark } = useTheme()
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log({
      password,
    });
  };
  return (
    <View className={`p-4 border-[1px] ${isDark ? "border-darkGray-400" : "border-darkGray-200"}  rounded-sm`}>

      <View className='p-4 mt-2 rounded-lg '>

        <View className={`pb-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-200"}`}>

          <Text className={`text-2xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Eliminar Cuenta</Text>
          <Text className={`text-lg font-raleway text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>Ingresa tu contraseña para confirmar tu identidad</Text>

        </View>

        <View className={`py-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-200"}`}>

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

        <CTAButtonPrimary
          onPress={() => {
            router.replace('/(auth)/signin')
          }} text='Eliminar'
        />
      </View>
    </View>
  )
}

export default Delete