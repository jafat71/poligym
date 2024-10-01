import TopHeaderComponent from '@/components/ui/header/TopHeaderComponent';
import { useTheme } from '@/context/ThemeContext';
import { Slot } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthLayout() {
  const { isDark } = useTheme()

  return (
    <SafeAreaView className={`flex flex-1 flex-col justify-center r ${isDark ? "bg-darkGray-500" : "bg-eBlue-500"}`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
          <TopHeaderComponent />
            <Slot />
      </ScrollView>
    </SafeAreaView>
  );
}
