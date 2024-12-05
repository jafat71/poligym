import React, { useState } from 'react'
import { ActivityIndicator, Keyboard, Text, View } from 'react-native'

import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useMutation } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';

import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import AuthSupportButton from '@/components/ui/common/buttons/AuthSupportButton';
import IconTextInputForm from '@/components/ui/common/form/IconTextInputForm';
import FormErrorAlert from '@/components/ui/common/alerts/FormErrorAlert';

import { validateSignIn } from '@/lib/utils/validateAuthForm';
import { signin } from '@/lib/api/auth';
import { saveToken } from '@/lib/token/store';

const Signin = () => {

  const { isDark } = useTheme()
  const { setAccessToken } = useUser()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<string[]>([]);

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
    },
  });

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const { errors } = validateSignIn(email, password)
    setErrors(errors)
    if (errors.length > 0) return
    signinMutation.mutate({ email, password });
  }

  return (

    <View>

      <View>
        <Text className={`${isDark ? "text-white" : "text-darkGray-500"} text-4xl font-ralewayBold mb-2`}>
          Iniciar Sesión
        </Text>

        <View className={`pt-1`}>
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

      <FormErrorAlert
        errors={errors}
      />

    </View>

  )
}

export default Signin