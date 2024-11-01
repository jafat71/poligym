import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import FormHeaderComponent from '@/components/ui/common/header/FormHeaderComponent';
import { useTheme } from '@/context/ThemeContext';
import useRouteMappinginitForm from '@/hooks/useRouteMappinginitForm';
import { router, Slot, usePathname } from 'expo-router';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const { isDark } = useTheme()
  const actualPathname = usePathname()
  const { routeMapping } = useRouteMappinginitForm()
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <SafeAreaView className={`flex flex-col items-center justify-center w-full h-full ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          className='w-full px-2'
        >

          <FormHeaderComponent />
          <Slot />

        </ScrollView>
        <View className='w-full px-2'>
          <CTAButtonPrimary
            onPress={() => {
              
              if (actualPathname === '/form05') {
                router.replace('/(root)/(tabs)/home')
              } else {
                router.push(routeMapping[actualPathname])
              }
              
            }}
            text="Continuar"
          />

        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>



  );
}
