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
    <SafeAreaView className={`p-4 pt-6 flex flex-1 ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className='flex-1 flex flex-col'>

          <FormHeaderComponent />
          <Slot />

    
        </View>
      <View className={`py-3 px-2 w-full
          border-t-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
            <CTAButtonPrimary
              onPress={() => {
                router.push(routeMapping[actualPathname])
              }}
              text="Continuar"
            />
            <SkipButton />
          </View>
      </ScrollView>

    </KeyboardAvoidingView>
    </SafeAreaView>

  );
}
