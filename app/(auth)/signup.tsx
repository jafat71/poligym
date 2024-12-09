import React, { useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'

import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import FormErrorAlert from '@/components/ui/common/alerts/FormErrorAlert';
import AuthSupportButton from '@/components/ui/common/buttons/AuthSupportButton';
import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import IconTextInputForm from '@/components/ui/common/form/IconTextInputForm';
import TermsModal from '@/components/ui/common/modal/TermsModal';

import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';

import { signUp } from '@/lib/api/auth';
import { saveToken } from '@/lib/token/store';
import { transformEmailToName } from '@/lib/utils/transform';
import { validateSignup } from '@/lib/utils/validateAuthForm';

import { useMutation } from '@tanstack/react-query';

const Signup = () => {

  const { isDark } = useTheme()
  const { setAccessToken } = useUser()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [termsVisible, setTermsVisible] = useState(false);

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
      setConfirmPassword('')
      router.push('/(animated)/form00')
    },
    onError: (error: any) => {
      setErrors([error.message || "Error al registrar el usuario. Inténtelo más tarde"])
    },
  });

  const toggleTermseModal = () => {
    setTermsVisible(!termsVisible);
  };

  const handleSubmit = async () => {
    let { errors } = validateSignup(email, password, confirmPassword)
    setErrors(errors)
    if (errors.length > 0) return

    let name = transformEmailToName(email)
    signupMutation.mutate({ name, email: email.toLowerCase(), password });
  }

  return (
    <View>

      <View>

        <Text className={`text-4xl mb-2  font-ralewayBold text-start text-white `}>Registro</Text>

        <View className={`pt-1`}>
          <IconTextInputForm
            title='Email Institucional'
            icon={<Ionicons name="person-circle-outline" size={35} color={`#ff7756`} />}
            inputKeyboardType='email-address'
            inputPlaceholder='tu.nombre@epn.edu.ec'
            inputValue={email}
            inputOnChangeText={setEmail}
            inputSecure={false}
          />

          <IconTextInputForm
            title='Contraseña'
            icon={<Ionicons name="shield-outline" size={35} color={`#ff7756`} />}
            inputKeyboardType='ascii-capable'
            inputPlaceholder='*********'
            inputValue={password}
            inputOnChangeText={setPassword}
            inputSecure={true}
          />

          <IconTextInputForm
            title='Confirmar Contraseña'
            icon={<Ionicons name="shield-checkmark-outline" size={35} color={`#ff7756`} />}
            inputKeyboardType='ascii-capable'
            inputPlaceholder='*********'
            inputValue={confirmPassword}
            inputOnChangeText={setConfirmPassword}
            inputSecure={true}
          />

        </View>

        <View className='mb-5'>
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
          <Pressable
            onPress={toggleTermseModal}
            className='translate-y-1'
          >
            <Text className={`text-sm font-ralewayExtraBold  text-white`}>
              {' '} TÉRMINOS Y CONDICIONES
            </Text>
          </Pressable>
        </Text>
      </View>

      <TermsModal
        modalVisible={termsVisible}
        toggleModal={() => toggleTermseModal()}
      />

      <FormErrorAlert
        errors={errors}
      />

    </View>
  )
}

export default Signup