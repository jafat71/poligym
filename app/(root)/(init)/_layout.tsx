import { Stack } from 'expo-router';

export default function RootLayout() {

  return (
      <Stack
      screenOptions={
        { headerShown: false, animation: 'slide_from_right', animationTypeForReplace: 'pop' }
      }
      >  
        <Stack.Screen name="form00" options={{ headerShown: false }} />
        <Stack.Screen name="form01" options={{ headerShown: false }} />
        <Stack.Screen name="form02" options={{ headerShown: false }} />
      </Stack>
  );
}
