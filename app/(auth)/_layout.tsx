import { KeyboardAvoidingView, Platform, StatusBar, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Slot } from 'expo-router';

import TopHeaderComponent from '@/components/ui/common/header/TopHeaderComponent';

import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function AuthLayout() {
  const { isDark } = useTheme()

  //TODO:  CHECK  react-native-keyboard-controller 
  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    className="flex-1"
  >
    <SafeAreaView className={`flex flex-col items-center justify-center h-full ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      {/* <LinearGradient
                colors={[
                    'rgba(0,85,249,0.95)',
                    'rgba(0,85,249,0.8)',
                    'rgba(0,85,249,0.95)'
                ]}
                className="absolute w-full h-full"
            /> */}
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
    </KeyboardAvoidingView>

  );
}
