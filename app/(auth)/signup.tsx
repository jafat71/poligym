import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { router } from 'expo-router';

import AuthSupportButton from '@/components/ui/common/buttons/AuthSupportButton';
import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import IconTextInputForm from '@/components/ui/common/form/IconTextInputForm';

import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';

import { signUp } from '@/lib/api/auth';
import { saveToken } from '@/lib/token/store';
import { transformEmailToName } from '@/lib/utils/transform';
import { validateSignup } from '@/lib/utils/validateAuthForm';

import { useMutation } from '@tanstack/react-query';
import CustomSnackbar from '@/components/ui/common/snackbar/CustomSnackbar';

const Signup = () => {

  const { isDark } = useTheme()
  const { setAccessToken } = useUser()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const signupMutation = useMutation({
    mutationFn: ({ name, email, password }: { name: string, email: string, password: string }) =>
      signUp(name, email, password),
    onSuccess: (data) => {
      if (!data) return
      if (data.accessToken) {
        saveToken('accessToken', data.accessToken);
        setAccessToken(data.accessToken);
      }
      setErrors([])
      setEmail('')
      setPassword('')
      router.push('/(animated)/form00')
    },
    onError: (error: any) => {
      setErrors([error.message || "Error al registrar el usuario. Inténtelo más tarde"])
    },
  });

  const handleSubmit = async () => {
    let { errors } = validateSignup(email, password)
    setErrors(errors)
    setIsVisible(errors.length > 0)
    if (errors.length > 0) return

    let name = transformEmailToName(email)
    signupMutation.mutate({ name, email: email.toLowerCase(), password });
  }

  return (
    <View>

      <View>

        <Text className={`text-2xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Registro</Text>

        <IconTextInputForm
          inputKeyboardType='email-address'
          inputPlaceholder='Correo institucional (@epn.edu.ec)'
          inputValue={email}
          inputOnChangeText={setEmail}
          inputSecure={false}
        />

        <IconTextInputForm
          inputKeyboardType='ascii-capable'
          inputPlaceholder='Contraseña'
          inputValue={password}
          inputOnChangeText={setPassword}
          inputSecure={true}
        />

        <View className='mb-2'>
          <AuthSupportButton
            title='Ya tengo una cuenta'
            onPress={() => {
              router.push('/(auth)/signin')
            }}
          />

        </View>
        <CTAButtonPrimary
          onPress={handleSubmit}
          text={signupMutation.isPending ? '' : 'Registrarse'}
          disabled={signupMutation.isPending}
          isLoading={signupMutation.isPending}
        />
      </View>
      <View className='w-full items-center mt-1'>
        <Text className={`text-sm font-ralewaySemiBold text-center  ${isDark ? "text-white" : "text-darkGray-400"} `}>Al seleccionar REGISTRARSE, estas de acuerdo con nuestros
          <TouchableOpacity
            onPress={() => router.push('/(info)/terms')}
            className='translate-y-1 translate-x-1'
          >
            <Text className={`text-sm scale-105 font-ralewayExtraBold  ${isDark ? "text-white" : "text-darkGray-500"}`}>
              {' '} TÉRMINOS Y CONDICIONES
            </Text>
          </TouchableOpacity>
        </Text>
      </View>

      <CustomSnackbar
        visible={isVisible}
        message={errors.join('\n')}
        setVisible={setIsVisible}
        translated={true}
        color='red'
        />

    </View>
  )
}

export default Signup