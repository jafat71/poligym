import { Stack } from 'expo-router';

export default function RootLayout() {

  return (
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false, animation: 'fade_from_bottom'}} />
        <Stack.Screen name="signin" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
        <Stack.Screen name="signup" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
        <Stack.Screen name="forgot" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
      </Stack>
  );
}
