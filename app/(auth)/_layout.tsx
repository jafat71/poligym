import TopHeaderComponent from '@/components/ui/header/TopHeaderComponent';
import { useTheme } from '@/context/ThemeContext';
import { Slot } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthLayout() {
  const { isDark } = useTheme()

  return (
    <SafeAreaView className={`flex flex-col items-center justify-center h-full ${isDark ? "bg-darkGray-500" : "bg-white"}`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className='w-full p-4'
      >
            <TopHeaderComponent />
            <Slot />
      </ScrollView>
    </SafeAreaView>
  );
}
