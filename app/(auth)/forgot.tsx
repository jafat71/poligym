import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Forgot = () => {
  return (
    <SafeAreaView className='flex flex-1 justify-center items-center dark:bg-darkGray-500'>
        <Text className='font-ralewayBold text-3xl text-darkGray-500 dark:text-white-100 '>Forgot Poligym</Text>
    </SafeAreaView>
  )
}

export default Forgot