import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Redirect } from 'expo-router'
import React from 'react'
import { ThemeProvider } from '@/context/ThemeContext';

const Home = () => {
  return (
    <ThemeProvider >
      <Redirect href={'/(auth)/welcome'} />
    </ThemeProvider>

  )
}

export default Home