import FormErrorAlert from '@/components/ui/alerts/FormErrorAlert';
import AuthSupportButton from '@/components/ui/buttons/AuthSupportButton';
import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import IconTextInputForm from '@/components/ui/form/IconTextInputForm';
import TermsModal from '@/components/ui/modal/TermsModal';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { signUp } from '@/lib/api/api';
import { saveToken } from '@/lib/token/store';
import { transformEmailToName } from '@/lib/utils/transform';
import { validateSignup } from '@/lib/utils/validateAuthForm';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'

const Signup = () => {

  const { isDark } = useTheme()
  const { setToken } = useUser()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [termsVisible, setTermsVisible] = useState(false);

  const signupMutation = useMutation({
    mutationFn: ({ name, email, password }: { name: string, email: string, password: string }) =>
      signUp(name, email, password),
    onSuccess: (response) => {
      saveToken('accessToken', response.accessToken)
      setToken(response.accessToken)
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

      <View className='mt-2 rounded-lg '>

        <Text className={`text-3xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Registro</Text>

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

          <IconTextInputForm
            title='Confirmar Contraseña'
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
            title='Ya tengo una cuenta'
            onPress={() => {
              router.push('/(auth)/signin')
            }}
          />

        </View>

        <CTAButtonPrimary
          onPress={handleSubmit}
          text={signupMutation.isPending ? 'Procesando...' : 'Registrarse'}
          disabled={signupMutation.isPending}
        >
          {signupMutation.isPending && (
            <ActivityIndicator
              size="small"
              color="white"
              style={{ marginLeft: 10 }}
            />
          )}
        </CTAButtonPrimary>
      </View>

      <View className='w-full items-center'>
        <Text className={`text-sm font-raleway text-center  ${isDark ? "text-white" : "text-darkGray-400"} `}>Al seleccionar REGISTRARSE, estas de acuerdo con nuestros
          <Pressable
            onPress={toggleTermseModal}
            className='translate-y-1'
          >
            <Text className={`text-sm font-ralewayExtraBold  ${isDark ? "text-white" : "text-darkGray-400"}`}>
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