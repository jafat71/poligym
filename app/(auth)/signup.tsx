import CTAButtonPrimary from '@/components/ui/CtaButtonPrimary';
import WelcomeHeaderComponent from '@/components/ui/welcomeHeader'
import { useTheme } from '@/context/ThemeContext'
import FontAwesome6 from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
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
    <SafeAreaView className={`p-4 flex flex-1 flex-col justify-center r ${isDark ? "bg-darkGray-500" : "bg-white-100"}`}>

      <WelcomeHeaderComponent />

      <View className='p-4 mt-2 bg-darkGray-900'>
        <Text className='text-2xl font-ralewayBold text-white'>Email Institucional</Text>
        <View className='bg-darkGray-800 mt-2 rounded-lg shadow-lg text-white-100'>

          <View className='flex flex-row items-center justify-center w-full'>
            <View className='w-10'>
              <FontAwesome6 name="person" size={35} color="#0059FF" />
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
              <FontAwesome6 name="shield" size={35} color="#0059FF" />
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
            <FontAwesome6 name="shield-checkmark-sharp" size={35} color="#0059FF" />
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

      <View className='w-full items-end justify-end'>
        <TouchableOpacity
          className='mb-5'
          onPress={()=>{
            handleSubmit()
            router.replace('/(auth)/signin')
          }}
        >
          <Text className={`mt-2 text-xl ${isDark ? "text-white" : "text-darkGray-500"} `}>Ya tengo una cuenta</Text>
        </TouchableOpacity>
      </View>

      <CTAButtonPrimary
        route={'/(root)/(tabs)/home'}
        text='Registrarse'
      />

    </SafeAreaView>
  )
}

export default Signup