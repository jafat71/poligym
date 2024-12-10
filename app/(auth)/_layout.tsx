import { KeyboardAvoidingView, Platform, StatusBar, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Slot } from 'expo-router';

import TopHeaderComponent from '@/components/ui/common/header/TopHeaderComponent';

import { useTheme } from '@/context/ThemeContext';

export default function AuthLayout() {
  const { isDark } = useTheme()

  //TODO:  CHECK  react-native-keyboard-controller to add slow scroll
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#0059ff' }}
    >
      <StatusBar backgroundColor="#0059ff" barStyle={"light-content"} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}

          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >
          <TopHeaderComponent />
          <View className={`flex-1 ${isDark ? "bg-darkGray-900" : "bg-white"} p-4 rounded-t-3xl`}>
            <Slot />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>

  );
}
