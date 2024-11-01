import { Stack } from 'expo-router';

export default function RootLayout() {

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(init)" options={{ headerShown: false }} />
        <Stack.Screen name="(config)" options={{ headerShown: false, animation: 'fade', animationTypeForReplace: 'push' }} />
      </Stack>
  );
}
