import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Slot } from 'expo-router';

import TopHeaderComponent from '@/components/ui/common/header/TopHeaderComponent';

import { useTheme } from '@/context/ThemeContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export default function AuthLayout() {
  const { isDark } = useTheme()

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      alwaysBounceVertical
      contentContainerStyle={{ flexGrow: 1, backgroundColor: '#0059ff' }}
    >
      <StatusBar backgroundColor="#0059ff" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0059ff' }}>
        <TopHeaderComponent />
        <View
          className={`h-96 p-4 rounded-t-3xl rounded-r-3xl ${isDark ? 'bg-darkGray-900' : 'bg-white'}`}>
          <Slot />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
