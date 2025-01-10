import { useCallback, useEffect, useMemo, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { ThemeProvider } from '@/context/ThemeContext';
import { UserProvider } from '@/context/UserContext';
import { NavigationFlowProvider } from '@/context/NavFlowContext';
import { KeyboardProvider } from "react-native-keyboard-controller";

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/lib/queryClient/queryClient';
import { useFonts } from 'expo-font';
import { WorkoutPlayProvider } from '@/context/PlayWorkoutContext';

import { initializeDatabase } from '@/database/sqlite';

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

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

  useEffect(() => {
    async function prepare() {
      if (loaded) {
        await SplashScreen.hideAsync();
        await initializeDatabase();
      }
    }
    prepare();
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <ThemeProvider >
      <KeyboardProvider>
        <ActionSheetProvider>

          <QueryClientProvider client={queryClient}>

            <NavigationFlowProvider>
              <UserProvider>
                <WorkoutPlayProvider>
                  <GestureHandlerRootView
                    style={{ flex: 1, backgroundColor: '#0055f9' }}>
                    <Stack>
                      <Stack.Screen name="welcome" options={{ headerShown: false, animation: 'fade_from_bottom', animationTypeForReplace: 'push', 
                        statusBarColor: '#0055f9',
                        statusBarStyle: 'light'
                       }} />
                      <Stack.Screen name="(animated)" options={{ headerShown: false, animation: 'fade_from_bottom', animationTypeForReplace: 'push' }} />
                      <Stack.Screen name="(root)" options={{ headerShown: false, animation: 'simple_push', animationTypeForReplace: 'pop' }} />
                      <Stack.Screen name="(auth)" options={{
                        animation: 'fade_from_bottom',
                        animationTypeForReplace: 'push',
                        headerShown: false
                      }} />
                      <Stack.Screen name="(info)" options={{ headerShown: false, animation: 'fade_from_bottom', animationTypeForReplace: 'push' }} />
                      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
                    </Stack>
                    {/* <DebugCache /> */}

                  </GestureHandlerRootView>
                </WorkoutPlayProvider>
              </UserProvider>
            </NavigationFlowProvider>
          </QueryClientProvider>
        </ActionSheetProvider>
      </KeyboardProvider>
    </ThemeProvider>
  );
}

