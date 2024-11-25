import { SafeAreaView } from 'react-native-safe-area-context';

import { Slot } from 'expo-router';

import FormHeaderComponent from '@/components/ui/common/header/FormHeaderComponent';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (

      <SafeAreaView className={`flex flex-col items-center justify-between w-full h-full bg-eBlue-500`}>
        <StatusBar style="light" />
        <FormHeaderComponent />
        <Slot />
      
      </SafeAreaView>

  );
}
