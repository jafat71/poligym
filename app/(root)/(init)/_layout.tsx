import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import SkipButton from '@/components/ui/buttons/SkipButton';
import FormHeaderComponent from '@/components/ui/header/FormHeaderComponent';
import { useTheme } from '@/context/ThemeContext';
import { User } from '@/types/interfaces/entities/user';
import { Href, router, Slot, usePathname } from 'expo-router';
import { useState } from 'react';
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
    '/form06': '/(root)/(tabs)/home',
  };

  return (
    <SafeAreaView className={`p-4 pt-6 flex flex-1 ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
      <View className='flex-1 flex flex-col'>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <FormHeaderComponent />
          <Slot />

        </ScrollView>
        <View className={`py-3 px-2 w-full
          border-t-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
          <CTAButtonPrimary
            onPress={() => {
              router.push(routeMapping[pathname])
            }}
            text="Continuar"
          />
          <SkipButton />
        </View>
      </View>
    </SafeAreaView>
  );
}
