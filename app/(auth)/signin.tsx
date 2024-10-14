import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import AuthSupportButton from '@/components/ui/buttons/AuthSupportButton';
import { useTheme } from '@/context/ThemeContext';
import IconTextInputForm from '@/components/ui/form/IconTextInputForm';
import { router } from 'expo-router';
import { emptyUser } from '@/constants';
import { useUser } from '@/context/UserContext';

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

  const { set1InitUser } = useUser()

  return (

    <View className='mt-2 rounded-lg '>

      <View>

        <View className={`pb-5 `}>

          <Text className={`text-3xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Iniciar Sesión</Text>

        </View>

        <View className={`py-5`}>
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
            set1InitUser(emptyUser)
            router.push('/(root)/(tabs)/home')
          }}
          text='Ingresar'
        />

      </View>

    </View>

  )
}

export default Signin