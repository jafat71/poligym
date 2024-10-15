import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import AuthSupportButton from '@/components/ui/buttons/AuthSupportButton';
import { useTheme } from '@/context/ThemeContext';
import IconTextInputForm from '@/components/ui/form/IconTextInputForm';
import { router } from 'expo-router';

const Update = () => {

  const { isDark } = useTheme()
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    console.log({});
  };

  return (
      <View className='mt-2 rounded-lg '>
        <View className={`pb-5 `}>

          <Text className={`text-2xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Actualizar Contraseña</Text>
          <Text className={`text-lg font-raleway text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>Ingresa tu contraseña actual para confirmar tu identidad</Text>

        </View>
        <View className={`py-5`}>

          <IconTextInputForm
            title='Contraseña Actual'
            icon={<Ionicons name="shield-half" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
            inputKeyboardType='ascii-capable'
            inputPlaceholder='*********'
            inputValue={oldPassword}
            inputOnChangeText={setOldPassword}
            inputSecure={true}
          />


          <IconTextInputForm
            title='Nueva Contraseña'
            icon={<Ionicons name="shield-checkmark-sharp" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
            inputKeyboardType='ascii-capable'
            inputPlaceholder='*********'
            inputValue={password}
            inputOnChangeText={setPassword}
            inputSecure={true}
          />

          <IconTextInputForm
            title='Confirmar Nueva Contraseña'
            icon={<Ionicons name="shield-checkmark-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
            inputKeyboardType='ascii-capable'
            inputPlaceholder='*********'
            inputValue={confirmPassword}
            inputOnChangeText={setConfirmPassword}
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
              router.replace('/(root)/(tabs)/home')
            }}
          text='Actualizar'
        />
      </View>
  )
}

export default Update