import Loading from '@/components/animatedUi/Loading';
import { useUser } from '@/context/UserContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const { loggedUserInfo } = useUser();

  if (!loggedUserInfo) return <Loading />;

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(init)" options={{ headerShown: false }} />
        <Stack.Screen name="(config)" options={{ headerShown: false, animation: 'fade', animationTypeForReplace: 'push' }} />
      </Stack>
  );
}
