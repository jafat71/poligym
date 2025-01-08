import MainLogoCustomComponent from '@/components/ui/common/logo/mainLogo';
import { useTheme } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
    const { isDark } = useTheme()
    return (
        <Stack
            screenOptions={{
                animation: 'slide_from_bottom',
                headerStyle: {
                    backgroundColor: isDark ? '#171717' : '#fff',
                },
                headerTintColor: isDark ? '#fff' : '#1c1c1c',
                headerTitleStyle: {
                    color: isDark ? '#fff' : '#1c1c1c',
                },
                headerTitle: () => (
                    <View className='items-center justify-center'>
                        <MainLogoCustomComponent
                            height="30"
                            width="30"
                            principal={`${isDark ? "#fff" : "#1c1c1c"}`}
                        />
                    </View>
                ),
                statusBarStyle: isDark ? 'light' : 'dark',
                statusBarAnimation: 'none',
            }}
        >
            <Stack.Screen name="terms" options={{ animation: 'slide_from_bottom', animationTypeForReplace: 'push' }} />
            <Stack.Screen name="faq" options={{ animation: 'slide_from_bottom', animationTypeForReplace: 'push' }} />
            <Stack.Screen name="about" options={{ animation: 'slide_from_bottom', animationTypeForReplace: 'push' }} />

        </Stack>

    );
}
