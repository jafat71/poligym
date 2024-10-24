import React, { useState } from 'react'
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import AuthSupportButton from '@/components/ui/common/buttons/AuthSupportButton';
import { useTheme } from '@/context/ThemeContext';
import IconTextInputForm from '@/components/ui/common/form/IconTextInputForm';
import { router } from 'expo-router';
import { forgotPassword, resetPassword } from '@/lib/api/auth';
import { useMutation } from '@tanstack/react-query';
import FormErrorAlert from '@/components/ui/common/alerts/FormErrorAlert';
import FormSuccessAlert from '@/components/ui/common/alerts/FormSuccesAlert';
import { validateForgotPassword, validateResetPassword } from '@/lib/utils/validateAuthForm';

const Forgot = () => {
  const { isDark } = useTheme()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('');
  const [newPassword, setnewPassword] = useState('')
  const [confirmNewPassword, setconfirmNewPassword] = useState('');

  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const forgotPasswordMutation = useMutation({
    mutationFn: ({ email }: { email: string }) => forgotPassword(email),
    onSuccess: () => {
      setSuccessMessage('Se ha enviado un correo con un codigo de recuperación');
      setResetSent(true);
    },
    onError: (error: any) => {
      setErrors([error.message]);
    },
  })

  const resetPasswordMutation = useMutation({
    mutationFn: ({ code, newPassword }: { code: string; newPassword: string }) => resetPassword(code, newPassword),
    onSuccess: (data) => {
      setSuccessMessage('Contraseña restablecida correctamente');
      setTimeout(() => {
        setSuccessMessage('');
        router.push('/(auth)/signin')
      }, 3000);
    },
    onError: (error: any) => {
      setErrors([error.message]);
    },
  })

  const handleSendMailSubmit = () => {
    const { errors } = validateForgotPassword(email)
    setErrors(errors)
    if (errors.length > 0) return
    forgotPasswordMutation.mutate({ email });
  };

  const handleResetPasswordSubmit = () => {
    const { errors } = validateResetPassword(code, newPassword, confirmNewPassword)
    setErrors(errors)
    if (errors.length > 0) return
    resetPasswordMutation.mutate({ code, newPassword });
  };

  return (
    <View className='mt-2 rounded-lg '>

      <View >

        <View className={`pb-5 `}>

          <Text className={`text-3xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Olvidé mi contraseña</Text>

        </View>

        <View className={`py-5 `}>

          {
            !resetSent ? (
              <>
                <Text className={`text-lg font-ralewaySemiBold text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>Ingresa tu correo electónico para recibir las instrucciones necesarias para recuperar el acceso a tu cuenta</Text>

                <IconTextInputForm
                  title='Email Institucional'
                  icon={<Ionicons name="person-circle-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                  inputKeyboardType='email-address'
                  inputPlaceholder='tu.nombre@epn.edu.ec'
                  inputValue={email}
                  inputOnChangeText={setEmail}
                  inputSecure={false}
                />

                <View className='mb-5'>
                  <AuthSupportButton
                    title='Regresar al login'
                    onPress={() => {
                      router.push('/(auth)/signin')
                    }}
                  />

                  <AuthSupportButton
                    title='Ya tengo mi código'
                    onPress={() => {
                      setResetSent(true);
                    }}
                  />

                </View>
              </>
            ) : (
              <>
                <IconTextInputForm
                  title='Código de recuperación'
                  icon={<Ionicons name="key-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                  inputKeyboardType='default'
                  inputPlaceholder='***********************************'
                  inputValue={code}
                  inputOnChangeText={setCode}
                  inputSecure={false}
                />

                <IconTextInputForm
                  title='Nueva Contraseña'
                  icon={<Ionicons name="shield-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                  inputKeyboardType='ascii-capable'
                  inputPlaceholder='*********'
                  inputValue={newPassword}
                  inputOnChangeText={setnewPassword}
                  inputSecure={true}
                />

                <IconTextInputForm
                  title='Confirmar Nueva Contraseña'
                  icon={<Ionicons name="shield-checkmark-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                  inputKeyboardType='ascii-capable'
                  inputPlaceholder='*********'
                  inputValue={confirmNewPassword}
                  inputOnChangeText={setconfirmNewPassword}
                  inputSecure={true}
                />

                <View className='mb-5'>
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
              resetPasswordMutation.isPending ? 'Procesando...' : 'Restablecer'
              :
              forgotPasswordMutation.isPending ? 'Procesando...' : 'Enviar'}
          disabled={
            forgotPasswordMutation.isPending || resetPasswordMutation.isPending
          }
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