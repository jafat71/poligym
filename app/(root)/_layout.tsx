import { Stack } from 'expo-router';

import Loading from '@/components/animatedUi/Loading';

import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';

export default function RootLayout() {
  const { loggedUserInfo } = useUser();
  const { isDark } = useTheme();

  if (!loggedUserInfo) return <Loading />;

  return (
      <Stack 
        screenOptions={{
          statusBarTranslucent: true,
          statusBarAnimation: 'fade',
          statusBarStyle: isDark ? 'light' : 'dark',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade', animationTypeForReplace: 'push' }} />
        <Stack.Screen name="(init)" options={{ headerShown: false, animation: 'fade', animationTypeForReplace: 'push'  }} />
        <Stack.Screen name="(config)" options={{ headerShown: false, animation: 'slide_from_bottom', animationTypeForReplace: 'push' }} />
      </Stack>
  );
}
