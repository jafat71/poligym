import React, { useState } from 'react'
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import AuthSupportButton from '@/components/ui/common/buttons/AuthSupportButton';
import { useTheme } from '@/context/ThemeContext';
import IconTextInputForm from '@/components/ui/common/form/IconTextInputForm';
import { router } from 'expo-router';
import { forgotPassword } from '@/lib/api/auth';
import { useMutation } from '@tanstack/react-query';
import FormErrorAlert from '@/components/ui/common/alerts/FormErrorAlert';
import FormSuccessAlert from '@/components/ui/common/alerts/FormSuccesAlert';
import { validateForgotPassword } from '@/lib/utils/validateAuthForm';

const Forgot = () => {
  const { isDark } = useTheme()
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  const forgotPasswordMutation = useMutation({
    mutationFn: ({ email }: { email: string }) => forgotPassword(email),
    onSuccess: (data) => {
      console.log('success', data)
      setSuccessMessage('Se ha enviado un correo con las instrucciones para recuperar la contraseña');
      setTimeout(() => {
        router.push('/(auth)/signin')
      }, 3000);
    },
    onError: (error: any) => {
      setErrors([error.message]);
    },
  })
  const handleSubmit = () => {
    const { errors } = validateForgotPassword(email)
    setErrors(errors)
    if (errors.length > 0) return
    forgotPasswordMutation.mutate({ email });
  };

  return (
    <View className='mt-2 rounded-lg '>

      <View >

        <View className={`pb-5 `}>

          <Text className={`text-3xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Olvidé mi contraseña</Text>
          <Text className={`text-lg font-ralewaySemiBold text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>Ingresa tu correo electónico para recibir las instrucciones necesarias para recuperar el acceso a tu cuenta</Text>

        </View>

        <View className={`py-5 `}>
          <IconTextInputForm
            title='Email Institucional'
            icon={<Ionicons name="person-circle-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
            inputKeyboardType='email-address'
            inputPlaceholder='tu.nombre@epn.edu.ec'
            inputValue={email}
            inputOnChangeText={setEmail}
            inputSecure={false}
          />

        </View>

        <View className='mb-5'>
          <AuthSupportButton
            title='Regresar al login'
            onPress={() => {
              router.push('/(auth)/signin')
            }}
          />


        </View>

        <CTAButtonPrimary
          onPress={handleSubmit}
          text={forgotPasswordMutation.isPending ? 'Procesando...' : 'Enviar'}
          disabled={forgotPasswordMutation.isPending}
        >
          {forgotPasswordMutation.isPending && (
            <ActivityIndicator
              size="small"
              color="white"
              style={{ marginLeft: 10 }}
            />
          )}
        </CTAButtonPrimary>
      </View>

      <FormSuccessAlert
        message={successMessage}
      />
      <FormErrorAlert
        errors={errors}
      />

    </View>
  )
}

export default Forgot