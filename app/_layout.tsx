import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import useIcons from '@/hooks/useIcons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { ThemeProvider } from '@/context/ThemeContext';
import { UserProvider } from '@/context/UserContext';
import { NavigationFlowProvider } from '@/context/NavFlowContext';
import { ExerciseExecutionProvider } from '@/context/ExerciseExecutionContext';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/lib/queryClient/queryClient';

import Loading from '@/components/animatedUi/Loading';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    "Raleway-Bold": require("../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-ExtraBold": require("../assets/fonts/Raleway-ExtraBold.ttf"),
    "Raleway-ExtraLight": require("../assets/fonts/Raleway-ExtraLight.ttf"),
    "Raleway-Light": require("../assets/fonts/Raleway-Light.ttf"),
    "Raleway-Regular": require("../assets/fonts/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("../assets/fonts/Raleway-SemiBold.ttf"),
    "Raleway-Thin": require("../assets/fonts/Raleway-Thin.ttf"),
  });

  const { iconsloaded } = useIcons() //Preload Icons
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loaded && iconsloaded) {
      setReady(true)
      SplashScreen.hideAsync();
    }
    if (!loaded || !iconsloaded) {
      setReady(false)
    }

  }, [loaded, iconsloaded]);

  if (!ready) {
    return (
      <Loading />
    )
  }

  return (
    <ThemeProvider >
      <QueryClientProvider client={queryClient}>
        <NavigationFlowProvider>
          <UserProvider>
            <ExerciseExecutionProvider>

              <GestureHandlerRootView style={{ flex: 1 }}>

                <Stack
                  screenOptions={{
                    statusBarTranslucent: true
                  }}
                >
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="welcome" options={{ headerShown: false, animation: 'fade_from_bottom', animationTypeForReplace: 'push' }} />
                  <Stack.Screen name="(animated)" options={{ headerShown: false }} />
                  <Stack.Screen name="(root)" options={{ headerShown: false, animation: 'slide_from_right', animationTypeForReplace: 'pop' }} />
                  <Stack.Screen name="(auth)" options={{
                    animation: 'fade_from_bottom',
                    animationTypeForReplace: 'push',
                    headerShown: false
                  }} />
                  <Stack.Screen name="+not-found" options={{ headerShown: false }} />
                </Stack>
              </GestureHandlerRootView>
            </ExerciseExecutionProvider>
          </UserProvider>
        </NavigationFlowProvider>
      </QueryClientProvider>
    </ThemeProvider>

  );
}
