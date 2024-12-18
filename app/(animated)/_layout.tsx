import { useTheme } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="form00" options={{ headerShown: false, animation: 'fade_from_bottom', animationTypeForReplace: 'push' }} />
            <Stack.Screen name="splash" options={{ headerShown: false, animation: 'fade_from_bottom', animationTypeForReplace: 'push' }} />
            <Stack.Screen name="loading" options={{ headerShown: false, animation: 'fade_from_bottom', animationTypeForReplace: 'push', statusBarColor: '#0f2' }} />
            <Stack.Screen name="playexercise"
                options={{ 
                    headerShown: false, 
                    animation: 'slide_from_bottom', 
                    animationTypeForReplace: 'push',
                    statusBarStyle: 'light'
                }} />

        </Stack>

    );
}
