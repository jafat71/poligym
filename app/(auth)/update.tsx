import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import AuthSupportButton from '@/components/ui/buttons/AuthSupportButton';

const Update = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSubmit = () => {
    console.log({});
  };

  return (
    <View className='p-4'>

          <View className='p-4 mt-2 bg-eBlue-800 rounded-lg shadow-2xl shadow-eBlue-700'>

            <Text className='text-2xl font-ralewayBold text-center mb-6 text-lightGreen'>Actualizar Contraseña</Text>

            <Text className='text-2xl font-ralewayBold text-white'>Contraseña Actual</Text>
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
                  value={oldPassword}
                  onChangeText={setOldPassword}
                />
              </View>

            </View>

            <Text className='text-2xl font-ralewayBold text-white'>Nueva Contraseña</Text>
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

            <Text className='text-2xl font-ralewayBold text-white'>Confirmar nueva contraseña</Text>
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
          title='Regresar'
          route={'/(drawer)/(profile)/config'}
        />


      </View>

      <CTAButtonPrimary
        route={'/(drawer)/(profile)/config'}
        text='Actualizar'
      />
    </View>
  )
}

export default Update