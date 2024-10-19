import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import React, { useState } from 'react'
import { ActivityIndicator, Text, TextInput, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import AuthSupportButton from '@/components/ui/buttons/AuthSupportButton';
import { useTheme } from '@/context/ThemeContext';
import IconTextInputForm from '@/components/ui/form/IconTextInputForm';
import { router } from 'expo-router';
import { emptyUser } from '@/constants';
import { useUser } from '@/context/UserContext';
import { validateSignIn } from '@/lib/utils/validateAuthForm';
import { signin } from '@/lib/api/api';
import { saveToken } from '@/lib/token/store';
import FormErrorAlert from '@/components/ui/alerts/FormErrorAlert';

const Signin = () => {

  const { isDark } = useTheme()
  const { setToken } = useUser()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    let { errors } = validateSignIn(email,password)
    setErrors(errors)
    if (errors.length > 0) return

    setIsLoading(true)
    try {
      const response = await signin(email.toLowerCase(), password)
      saveToken('accessToken', response.accessToken)
      setToken(response.accessToken)
      router.push('/(root)/(tabs)/home')
    } catch (error: any) {
      setErrors([error.message])
    } finally {
      setIsLoading(false)
    }

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
          text={isLoading ? 'Procesando...' : 'Ingresar'}
          disabled={isLoading}
        >
          {isLoading && (
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