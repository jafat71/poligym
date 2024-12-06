import { useTheme } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function RootLayout() {
    const { isDark } = useTheme()
    return (
        <Stack
            initialRouteName='profile'
            screenOptions={{
                animation: 'none',
                headerStyle: {
                    backgroundColor: isDark ? '#171717' : '#fff',
                },
                headerTintColor: isDark ? '#fff' : '#1c1c1c',
                headerTitleStyle: {
                    fontFamily: 'Raleway-Bold',
                    fontSize: 20,
                    color: isDark ? '#fff' : '#1c1c1c',
                },
                statusBarStyle: isDark ? 'light' : 'dark',
            }}>
            <Stack.Screen name="config" options={{ animation: 'slide_from_right', headerTitle: 'Configuración' }} />
            <Stack.Screen name="updateinformation"
                options={{
                    animation: 'slide_from_right',
                    headerTitle: 'Actualizar Información',
                }} />
        </Stack>
    );
}
