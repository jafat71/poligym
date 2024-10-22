import React, { useState } from 'react'
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import AuthSupportButton from '@/components/ui/common/buttons/AuthSupportButton';
import { useTheme } from '@/context/ThemeContext';
import IconTextInputForm from '@/components/ui/common/form/IconTextInputForm';
import { router } from 'expo-router';
import { updatePassword } from '@/lib/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import { validateUpdatePassword } from '@/lib/utils/validateAuthForm';
import FormErrorAlert from '@/components/ui/common/alerts/FormErrorAlert';
import FormSuccessAlert from '@/components/ui/common/alerts/FormSuccesAlert';

const Update = () => {

  const { isDark } = useTheme()
  const { accessToken, loggedUserInfo } = useUser()
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  const updatePasswordMutation = useMutation({
    mutationFn: ({ userId, currentPassword, newPassword, confirmPassword }: { userId: string, currentPassword: string, newPassword: string, confirmPassword: string }) =>
      updatePassword(userId, currentPassword, newPassword, confirmPassword, accessToken ?? ""),
    onSuccess: (data) => {
      console.log("DATA", data)
      setSuccessMessage('Contraseña actualizada correctamente')
      setTimeout(() => {
        router.navigate('/(root)/(tabs)/home')
      }, 2000)
    },
    onError: (error: any) => {
      setErrors([error.message || "Error al actualizar la contraseña. Inténtelo más tarde"])
    },
  });

  const handleSubmit = () => {
    let { errors } = validateUpdatePassword(oldPassword, password, confirmPassword)
    setErrors(errors)
    if (errors.length > 0) return

    updatePasswordMutation.mutate({
      userId: loggedUserInfo?.userId ?? '',
      currentPassword: oldPassword,
      newPassword: password,
      confirmPassword: confirmPassword
    });
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
        onPress={handleSubmit}
        text={updatePasswordMutation.isPending ? 'Procesando...' : 'Actualizar'}
        disabled={updatePasswordMutation.isPending}
      >
        {updatePasswordMutation.isPending && (
          <ActivityIndicator
            size="small"
            color="white"
            style={{ marginLeft: 10 }}
          />
        )}
      </CTAButtonPrimary>


      <FormSuccessAlert
        message={successMessage}
      />
      <FormErrorAlert
        errors={errors}
      />


    </View>
  )
}

export default Update