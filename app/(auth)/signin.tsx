import React, { useState } from 'react'
import { Keyboard, Text, View } from 'react-native'

import { router } from 'expo-router';

import { useMutation } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';

import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import AuthSupportButton from '@/components/ui/common/buttons/AuthSupportButton';
import IconTextInputForm from '@/components/ui/common/form/IconTextInputForm';

import { validateSignIn } from '@/lib/utils/validateAuthForm';
import { signin } from '@/lib/api/auth';
import { saveToken } from '@/lib/token/store';
import CustomSnackbar from '@/components/ui/common/snackbar/CustomSnackbar';

const Signin = () => {

  const { isDark } = useTheme()
  const { setAccessToken } = useUser()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const signinMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signin(email.toLowerCase(), password),
    onSuccess: (data) => {
      if (!data) return
      if (data.accessToken) {
        setErrors([])
        setEmail('')
        setPassword('')
        saveToken('accessToken', data.accessToken);  //save token on secure storage
        setAccessToken(data.accessToken); //set token on context
        router.replace('/(root)/(tabs)/(home)/home');
      }
    },
    onError: (error: any) => {
      setErrors([error.message]);
      setIsVisible(true)

    },
  });

  const handleSubmit = async () => {
    const { errors } = validateSignIn(email, password)
    setErrors(errors)
    setIsVisible(errors.length > 0)

    if (errors.length > 0) return
    signinMutation.mutate({ email, password });
  }

  return (
    <View>
      
      <View>
        <Text className={`${isDark ? "text-white" : "text-darkGray-500"} text-2xl font-ralewayBold`}>
          Iniciar Sesión
        </Text>

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
            title='Olvidé mi contraseña'
            onPress={() => {
              router.push('/(auth)/forgot')
            }} />

          <AuthSupportButton
            title='No tengo una cuenta'
            onPress={() => {
              router.push('/(auth)/signup')
            }}
          />

        </View>

        <CTAButtonPrimary
          onPress={handleSubmit}
          text={signinMutation.isPending ? '' : 'Ingresar'}
          disabled={signinMutation.isPending}
          isLoading={signinMutation.isPending}
        />

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

export default Signin