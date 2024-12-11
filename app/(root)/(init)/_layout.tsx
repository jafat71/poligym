import { SafeAreaView } from 'react-native-safe-area-context';

import { Slot } from 'expo-router';

import FormHeaderComponent from '@/components/ui/common/header/FormHeaderComponent';
import { StatusBar } from 'expo-status-bar';
import Animated, { withTiming, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useEffect } from 'react';
import { View } from 'react-native';
import MainLogoGradientComponent from '@/components/ui/common/logo/mainLogoGrandient';

export default function RootLayout() {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 }); // Duración de 500 ms
  }, []);

  return (
      <SafeAreaView className={`flex flex-col items-center justify-between w-full h-full bg-eBlue-500`}>
        <StatusBar style="light" />
        <FormHeaderComponent />
        <Animated.View 
                style={animatedStyle}

          className='flex-1 w-full'>
          <Slot />
          <View className='absolute opacity-20 -z-20 w-full h-full flex flex-col items-center justify-center px-4 '>
            <MainLogoGradientComponent
              width={'250'}
              height={'250'}  
              principal='#061826'
              secondary='#061826'
            />
          </View>
      
        </Animated.View>
      </SafeAreaView>

  );
}
