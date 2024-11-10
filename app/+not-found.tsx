import React from 'react'
import { Pressable, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { router } from 'expo-router'

import MainLogoCustomComponent from '@/components/ui/common/logo/mainLogo'

const NotFound = () => {

  return (
    <SafeAreaView className='bg-eBlue-500 flex flex-1 flex-col items-center justify-center '>
        
        <MainLogoCustomComponent
          height='100'
          width='100'
          principal='#fff'
        />
        <Text className='font-ralewayBold text-xl text-white'>Recurso no encontrado :(</Text>
        <Pressable 
          onPress={()=>{
            router.replace('/(root)/(home)/home')
          }}
          className='p-2 bg-eBlue-300 rounded-lg mt-2'>
          <Text className='text-white font-ralewayBold'>Regresar al Home</Text>
        </Pressable>
    </SafeAreaView>
  )
}

export default NotFound