import { Stack } from 'expo-router';

export default function AuthLayout() {

  return (
    <Stack
      screenOptions={
        { headerShown: false, animation: 'fade_from_bottom', animationTypeForReplace: 'push' }
      }
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgot" />
    </Stack>
  );
}
