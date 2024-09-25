import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView className='flex flex-1 justify-center items-center'>
        <Text className='text-3xl text-white'>Home</Text>
    </SafeAreaView>
  )
}

export default Home