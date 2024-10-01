import AuthSupportButton from '@/components/ui/buttons/AuthSupportButton';
import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    console.log({
      email,
      password,
      confirmPassword,
    });
  };

  return (
        <View className='p-4'>
          <View className='p-4 mt-2 bg-eBlue-800 rounded-lg shadow-2xl shadow-eBlue-700'>

            <Text className='text-2xl font-ralewayBold text-center mb-6 text-lightGreen'>Registro</Text>

            <Text className='text-2xl font-ralewayBold text-white'>Email Institucional</Text>
            <View className='bg-eBlue-800 mt-2 rounded-lg shadow-lg text-white-100'>

              <View className='flex flex-row items-center justify-center w-full'>
                <View className='w-10 h-10 items-center p-1 '>
                  <Ionicons name="person" size={35} color="#0059FF" />
                </View>
                <TextInput
                  className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
                  placeholder="tu.nombre@epn.edu.ec"
                  keyboardType="email-address"
                  placeholderTextColor="#FFFFFF"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

            </View>

            <Text className='text-2xl font-ralewayBold text-white'>Contraseña</Text>
            <View className='bg-eBlue-800 mt-2 rounded-lg shadow-lg text-white-100'>

              <View className='flex flex-row items-center justify-center w-full'>
                <View className='w-10 h-10 items-center p-1 '>
                  <Ionicons name="shield" size={35} color="#0059FF" />
                </View>
                <TextInput
                  className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
                  placeholder="********"
                  secureTextEntry
                  keyboardType="ascii-capable"
                  placeholderTextColor="#FFFFFF"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

            </View>

            <Text className='text-2xl font-ralewayBold text-white'>Confirmar contraseña</Text>
            <View className='bg-eBlue-800 mt-2 rounded-lg shadow-lg text-white-100'>

              <View className='flex flex-row items-center justify-around w-full'>
                <View className='w-10 h-10 items-center p-1 '>
                  <Ionicons name="shield-checkmark-sharp" size={35} color="#0059FF" />
                </View>
                <TextInput
                  className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen  ml-2 font-raleway'
                  placeholder="********"
                  keyboardType="ascii-capable"
                  placeholderTextColor="#FFFFFF"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

            </View>
          </View>

          <View className='mb-10'>
            <AuthSupportButton
              title='Ya tengo una cuenta'
              route={'/(auth)/signin'}
            />

          </View>

          <CTAButtonPrimary
            route={'/(root)/(init)/form00'}
            text='Registrarse'
          />

        </View>
  )
}

export default Signup