import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import SkipButton from '@/components/ui/buttons/SkipButton';
import FormHeaderComponent from '@/components/ui/header/FormHeaderComponent';
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
    <SafeAreaView className={`flex flex-col items-center justify-center w-full h-full ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          className='w-full '

        >
          <FormHeaderComponent />
          <Slot />

        </ScrollView>
        <CTAButtonPrimary
          onPress={() => {
            router.push(routeMapping[actualPathname])
          }}
          text="Continuar"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
}
