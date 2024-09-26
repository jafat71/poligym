import { Stack } from 'expo-router';

export default function RootLayout() {

  return (
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="sigin" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="forgot" options={{ headerShown: false }} />
      </Stack>
  );
}
