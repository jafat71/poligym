import AuthSupportButton from '@/components/ui/buttons/AuthSupportButton';
import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import IconTextInputForm from '@/components/ui/form/IconTextInputForm';
import TermsModal from '@/components/ui/modal/TermsModal';
import { useTheme } from '@/context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'

const Signup = () => {

  const { isDark } = useTheme()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsVisible, setTermsVisible] = useState(false);

  const toggleTermseModal = () => {
    setTermsVisible(!termsVisible);
  };

  const handleSubmit = () => {
    console.log({
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <View>

      <View className='mt-2 rounded-lg '>

        <View className={`pb-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>

          <Text className={`text-3xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Registro</Text>

        </View>

        <View className={`py-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
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
            inputValue={password}
            inputOnChangeText={setPassword}
            inputSecure={true}
          />

          <Text className={`text-base font-ralewaySemiBold text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>
            Tu contraseña debe contener mínimo 8 carácteres
          </Text>

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
          onPress={() => {
            router.push('/(animated)/form00')
          }}
          text='Registrarse'
        />
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

    </View>
  )
}

export default Signup