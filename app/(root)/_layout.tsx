import { Stack } from 'expo-router';

import Loading from '@/components/animatedUi/Loading';

import { useUser } from '@/context/UserContext';

export default function RootLayout() {
  const { loggedUserInfo } = useUser();

  if (!loggedUserInfo) return <Loading />;

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade', animationTypeForReplace: 'push' }} />
        <Stack.Screen name="(init)" options={{ headerShown: false, animation: 'fade', animationTypeForReplace: 'push'  }} />
        <Stack.Screen name="(config)" options={{ headerShown: false, animation: 'slide_from_bottom', animationTypeForReplace: 'push' }} />
      </Stack>
  );
}
