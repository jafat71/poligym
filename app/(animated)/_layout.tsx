import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="form00" options={{ headerShown: false, animation: 'fade_from_bottom', animationTypeForReplace: 'push' }} />
        </Stack>

    );
}
