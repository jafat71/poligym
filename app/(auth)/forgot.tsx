import React, { useState } from 'react'
import { ActivityIndicator, Text, TextInput, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

import { useTheme } from '@/context/ThemeContext';
import { useMutation } from '@tanstack/react-query';

import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import AuthSupportButton from '@/components/ui/common/buttons/AuthSupportButton';
import IconTextInputForm from '@/components/ui/common/form/IconTextInputForm';
import FormErrorAlert from '@/components/ui/common/alerts/FormErrorAlert';
import FormSuccessAlert from '@/components/ui/common/alerts/FormSuccesAlert';

import { forgotPassword, resetPassword } from '@/lib/api/auth';
import { validateForgotPassword, validateResetPassword } from '@/lib/utils/validateAuthForm';
import CustomSnackbar from '@/components/ui/common/snackbar/CustomSnackbar';

const Forgot = () => {
  const { isDark } = useTheme()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<string[]>([]);
  const [isVisibleErrors, setIsVisibleErrors] = useState(false);
  const [isVisibleSuccess, setIsVisibleSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const forgotPasswordMutation = useMutation({
    mutationFn: ({ email }: { email: string }) => forgotPassword(email),
    onSuccess: () => {
      setSuccessMessage('Se ha enviado un correo con un código de recuperación');
      setIsVisibleSuccess(true);
      setResetSent(true);
    },
    onError: (error: any) => {
      setErrors([error.message]);
      setIsVisibleErrors(true);
    },
  })

  const resetPasswordMutation = useMutation({
    mutationFn: ({ code, newPassword }: { code: string; newPassword: string }) => resetPassword(code, newPassword),
    onSuccess: (data) => {
      setSuccessMessage('Contraseña restablecida correctamente');
      setIsVisibleSuccess(true);
      setTimeout(() => {
        setIsVisibleSuccess(false);
        setSuccessMessage('');
        router.push('/(auth)/signin')
      }, 3000);
    },
    onError: (error: any) => {
      setSuccessMessage('');
      setErrors([error.message]);
      setIsVisibleErrors(true);
    },
  })

  const handleSendMailSubmit = () => {
    const { errors } = validateForgotPassword(email)
    setErrors(errors)
    setIsVisibleErrors(errors.length > 0)
    if (errors.length > 0) return
    forgotPasswordMutation.mutate({ email });
  };

  const handleResetPasswordSubmit = () => {
    const { errors } = validateResetPassword(code, password)
    setSuccessMessage('');
    setErrors(errors)
    setIsVisibleErrors(errors.length > 0)
    if (errors.length > 0) return
    resetPasswordMutation.mutate({ code, newPassword: password });
  };

  return (
    <View>

      <View >

        <Text className={`text-2xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Olvidé mi contraseña</Text>

        <View className={``}>

          {
            !resetSent ? (
              <>
                <Text className={`text-sm font-ralewaySemiBold text-start  
                  ${isDark ? "text-darkGray-400" : "text-darkGray-500"} `}>
                  Ingresa tu correo electónico para recibir un código de recuperación
                </Text>

                <IconTextInputForm
                  inputKeyboardType='email-address'
                  inputPlaceholder='Correo institucional (@epn.edu.ec)'
                  inputValue={email}
                  inputOnChangeText={setEmail}
                  inputSecure={false}
                />

                <View className='mb-2'>
                  <AuthSupportButton
                    title='Regresar al login'
                    onPress={() => {
                      router.push('/(auth)/signin')
                      setSuccessMessage('');
                      setErrors([]);
                    }}
                  />

                  <AuthSupportButton
                    title='Ya tengo mi código'
                    onPress={() => {
                      setResetSent(true);
                      setSuccessMessage('');
                      setErrors([]);
                    }}
                  />

                </View>
              </>
            ) : (
              <>
                <IconTextInputForm
                  inputKeyboardType='default'
                  inputPlaceholder='Código de recuperación'
                  inputValue={code}
                  inputOnChangeText={setCode}
                  inputSecure={false}
                />

                <IconTextInputForm
                  inputKeyboardType='ascii-capable'
                  inputPlaceholder='Nueva contraseña'
                  inputValue={password}
                  inputOnChangeText={setPassword}
                  inputSecure={true}
                />

                <View className='mb-2'>
                  <AuthSupportButton
                    title='Regresar al login'
                    onPress={() => {
                      router.push('/(auth)/signin')
                    }}
                  />

                  <AuthSupportButton
                    title='No tengo mi código'
                    onPress={() => {
                      setResetSent(false);
                    }}
                  />

                </View>
              </>
            )
          }

        </View>


        <CTAButtonPrimary
          onPress={() => {
            resetSent ? handleResetPasswordSubmit() : handleSendMailSubmit()
          }}
          text={
            resetSent
              ?
              resetPasswordMutation.isPending ? '' : 'Restablecer'
              :
              forgotPasswordMutation.isPending ? '' : 'Enviar'}
          disabled={
            forgotPasswordMutation.isPending || resetPasswordMutation.isPending
          }
          isLoading={
            forgotPasswordMutation.isPending || resetPasswordMutation.isPending
          }
        />
      </View>

      <CustomSnackbar
        visible={isVisibleSuccess}
        message={successMessage}
        setVisible={setIsVisibleSuccess}
        translated={true}
        color='green'
        />
      <CustomSnackbar
        visible={isVisibleErrors}
        message={errors.join('\n')}
        setVisible={setIsVisibleErrors}
        translated={true}
        color='red'
        />

    </View>
  )
}

export default Forgot