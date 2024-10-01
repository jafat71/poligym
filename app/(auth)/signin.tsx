import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import AuthSupportButton from '@/components/ui/buttons/AuthSupportButton';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log({
      email,
      password,
    });
  };

  return (

          <View className={`p-4`}>

            <View className='p-4 mt-2 bg-eBlue-800 rounded-lg shadow-2xl shadow-eBlue-700'>

              <Text className='text-2xl font-ralewayBold text-center mb-6 text-lightGreen'>Login</Text>

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
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>

              </View>

            </View>

            <View className='mb-10'>
              <AuthSupportButton
                title='No tengo una cuenta'
                route={'/(auth)/signup'}
              />

              <AuthSupportButton
                title='Olvidé mi contraseña'
                route={'/(auth)/forgot'}
              />
            </View>

            <CTAButtonPrimary
              route={'/(root)/(tabs)/home'}
              text='Ingresar'
            />

          </View>

  )
}

export default Signin