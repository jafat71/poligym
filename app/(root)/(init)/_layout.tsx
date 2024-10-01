import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import SkipButton from '@/components/ui/buttons/SkipButton';
import FormHeaderComponent from '@/components/ui/header/FormHeaderComponent';
import { useTheme } from '@/context/ThemeContext';
import { Href, Slot, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

type RouteMapping = Record<string, Href<string | object>>

export default function RootLayout() {
  const { isDark } = useTheme()
  const pathname = usePathname();

  const routeMapping: RouteMapping = {
    '/form01': '/form02',
    '/form02': '/form03',
    '/form03': '/form04',
    '/form04': '/form05',
    '/form05': '/form06',
    '/form06': '/form07',
    '/form07': '/(root)/(tabs)/home',
  };

  return (
    <SafeAreaView className={`p-2 pt-6 flex flex-1 ${isDark ? "bg-darkGray-500" : "bg-eBlue-500"}`}>
      <View className='flex-1 flex flex-col'>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <FormHeaderComponent />
          <Slot />

        </ScrollView>
        <View className='flex flex-col justify-between items-center p-4'>
          <CTAButtonPrimary
            route={routeMapping[pathname]}
            text="Continuar"
          />
          <SkipButton />
        </View>
      </View>
    </SafeAreaView>
  );
}
