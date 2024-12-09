import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Slot } from 'expo-router';

import TopHeaderComponent from '@/components/ui/common/header/TopHeaderComponent';

import { useTheme } from '@/context/ThemeContext';
import { View } from 'react-native';

export default function AuthLayout() {
  const { isDark } = useTheme()

  //TODO:  CHECK  react-native-keyboard-controller 
  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-blueEPN-900" : "bg-blueEPN-500"}`}>    
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className='w-full px-4'
        keyboardShouldPersistTaps='handled'
      >
        <TopHeaderComponent />
        <Slot />
      </ScrollView>
    </SafeAreaView>

  );
}
