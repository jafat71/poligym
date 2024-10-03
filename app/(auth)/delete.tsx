import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import AuthSupportButton from '@/components/ui/buttons/AuthSupportButton';

const Delete = () => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log({
      password,
    });
  };
  return (
    <View className='p-4'>

      <View className='p-4 mt-2 bg-eBlue-800 rounded-lg shadow-2xl shadow-eBlue-700'>

        <Text className='text-2xl font-ralewayBold text-center mb-6 text-lightGreen'>Eliminar Cuenta</Text>

        <Text className={`mt-2 text-xl text-center mb-4 text-white`}>Ingresa tu contraseña para confirmar tu identidad</Text>

        <Text className='text-2xl font-ralewayBold text-white'>Contraseña</Text>
            <View className='bg-eBlue-800 mt-2 rounded-lg shadow-lg text-white-100'>

              <View className='flex flex-row items-center justify-center w-full'>
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

        <Text className='text-sm text-center font-ralewayBold text-white-100'>
        </Text>


      </View>

      <View className='mb-10'>
        <AuthSupportButton
          title='Regresar'
          route={'/(drawer)/(profile)/config'}
        />


      </View>

      <CTAButtonPrimary
          route={'/(auth)/signin'}
          text='Eliminar'
      />
    </View>
  )
}

export default Delete