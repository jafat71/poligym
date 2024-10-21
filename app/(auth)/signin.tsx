import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import AuthSupportButton from '@/components/ui/buttons/AuthSupportButton';
import IconTextInputForm from '@/components/ui/form/IconTextInputForm';
import FormErrorAlert from '@/components/ui/alerts/FormErrorAlert';

import { ActivityIndicator, Text, View } from 'react-native'
import { router } from 'expo-router';

import { useUser } from '@/context/UserContext';
import { useMutation } from '@tanstack/react-query';
import { useTheme } from '@/context/ThemeContext';

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
        saveToken('accessToken', data.accessToken);
        setAccessToken(data.accessToken);
      }
      router.push('/(root)/(tabs)/home');
    },
    onError: (error: any) => {
      setErrors([error.message]);
    },
  });

  const handleSubmit = async () => {
    const { errors } = validateSignIn(email, password)
    setErrors(errors)
    if (errors.length > 0) return
    signinMutation.mutate({ email, password });
  }

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
          onPress={handleSubmit}
          text={signinMutation.isPending ? 'Procesando...' : 'Ingresar'}
          disabled={signinMutation.isPending}
        >
          {signinMutation.isPending && (
            <ActivityIndicator
              size="small"
              color="white"
              style={{ marginLeft: 10 }}
            />
          )}
        </CTAButtonPrimary>

      </View>

      <FormErrorAlert
        errors={errors}
      />

    </View>

  )
}

export default Signin