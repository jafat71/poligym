import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useIcons from '@/hooks/useIcons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ThemeProvider } from '@/context/ThemeContext';

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

  useEffect(() => {
    if (loaded && iconsloaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, iconsloaded]);

  if (!loaded && !iconsloaded) {
    //TODO: Loading animation
    return null;
  }

  return (
    <ThemeProvider >

      <GestureHandlerRootView style={{ flex: 1 }}>

        <Stack
          initialRouteName='index'
          screenOptions={{
            animation: 'flip'
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false, animation: 'fade_from_bottom', animationTypeForReplace: 'push' }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'fade_from_bottom', animationTypeForReplace: 'push' }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>

  );
}
