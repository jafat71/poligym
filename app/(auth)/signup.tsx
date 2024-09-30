import AuthSupportButton from '@/components/ui/buttons/AuthSupportButton';
import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import TopHeaderComponent from '@/components/ui/header/TopHeaderComponent';
import { useTheme } from '@/context/ThemeContext'
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context'

const Signup = () => {
  const { isDark } = useTheme()

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
    <SafeAreaView className={`flex flex-1 flex-col justify-center r ${isDark ? "bg-darkGray-500" : "bg-white-100"}`}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >


        <View className='p-4'>
        <TopHeaderComponent/>
          <View className='p-4 mt-2 bg-darkGray-900 rounded-xl'>

            <Text className='text-2xl font-ralewayBold text-center mb-6 text-lightGreen'>Registro</Text>

            <Text className='text-2xl font-ralewayBold text-white'>Email Institucional</Text>
            <View className='bg-darkGray-800 mt-2 rounded-lg shadow-lg text-white-100'>

              <View className='flex flex-row items-center justify-center w-full'>
                <View className='w-10'>
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
            <View className='bg-darkGray-800 mt-2 rounded-lg shadow-lg text-white-100'>

              <View className='flex flex-row items-center justify-center w-full'>
                <View className='w-10'>
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
            <View className='bg-darkGray-800 mt-2 rounded-lg shadow-lg text-white-100'>

              <View className='flex flex-row items-center justify-around w-full'>
                <View className='w-10'>
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


      </ScrollView>

    </SafeAreaView>
  )
}

export default Signup