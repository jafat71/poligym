import React, { useState } from 'react'
import { Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import AuthSupportButton from '@/components/ui/common/buttons/AuthSupportButton';
import FormErrorAlert from '@/components/ui/common/alerts/FormErrorAlert';
import IconTextInputForm from '@/components/ui/common/form/IconTextInputForm';
import FormSuccessAlert from '@/components/ui/common/alerts/FormSuccesAlert';

import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { useMutation } from '@tanstack/react-query';

import { updatePassword } from '@/lib/api/auth';
import { validateUpdatePassword } from '@/lib/utils/validateAuthForm';
import CustomSnackbar from '@/components/ui/common/snackbar/CustomSnackbar';

const Update = () => {

  const { isDark } = useTheme()
  const { accessToken, loggedUserInfo } = useUser()
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [isVisibleErrors, setIsVisibleErrors] = useState(false);
  const [isVisibleSuccess, setIsVisibleSuccess] = useState(false);

  const updatePasswordMutation = useMutation({
    mutationFn: ({ userId, currentPassword, newPassword, confirmPassword }: { userId: string, currentPassword: string, newPassword: string, confirmPassword: string }) =>
      updatePassword(userId, currentPassword, newPassword, confirmPassword, accessToken ?? ""),
    onSuccess: (data) => {
      setSuccessMessage('Contraseña actualizada correctamente')
      setIsVisibleSuccess(true);
      setTimeout(() => {
        router.navigate('/(root)/(tabs)/home')
      }, 2000)
    },
    onError: (error: any) => {
      setErrors([error.message || "Error al actualizar la contraseña. Inténtelo más tarde"])
      setIsVisibleErrors(true);
    },
  });

  const handleSubmit = () => {
    let { errors } = validateUpdatePassword(oldPassword, password, confirmPassword)
    setErrors(errors)
    setIsVisibleErrors(errors.length > 0)
    if (errors.length > 0) return
    updatePasswordMutation.mutate({
      userId: loggedUserInfo?.id ?? '',
      currentPassword: oldPassword,
      newPassword: password,
      confirmPassword: confirmPassword
    });
  };

  return (
    <View>

      <Text className={`text-2xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Actualizar Contraseña</Text>
      <Text className={`text-sm font-raleway text-start ${isDark ? "text-white" : "text-darkGray-500"}`}>Confirma tu identidad con tu contraseña actual</Text>

      <View className={`pt-1`}>

        <IconTextInputForm
          inputKeyboardType='ascii-capable'
          inputPlaceholder='Contraseña actual'
          inputValue={oldPassword}
          inputOnChangeText={setOldPassword}
          inputSecure={true}
        />

        <IconTextInputForm
          inputKeyboardType='ascii-capable'
          inputPlaceholder='Nueva contraseña'
          inputValue={password}
          inputOnChangeText={setPassword}
          inputSecure={true}
        />

        <IconTextInputForm
          inputKeyboardType='ascii-capable'
          inputPlaceholder='Confirmar contraseña'
          inputValue={confirmPassword}
          inputOnChangeText={setConfirmPassword}
          inputSecure={true}
        />
      </View>

      <View className='mb-2'>
        <AuthSupportButton
          title='Regresar'
          onPress={() => {
            router.back()
          }}
        />

      </View>

      <CTAButtonPrimary
        onPress={handleSubmit}
        text={updatePasswordMutation.isPending ? '' : 'Actualizar'}
        disabled={updatePasswordMutation.isPending}
        isLoading={updatePasswordMutation.isPending}
      />  

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

export default Update