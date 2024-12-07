import MainLogoCustomComponent from '@/components/ui/common/logo/mainLogo';
import { useTheme } from '@/context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
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
                    headerShown: true,
                    headerTitle: () => (
                        <MainLogoCustomComponent
                            height="30"
                            width="30"
                                principal={`${isDark ? "#fff" : "#1c1c1c"}`}
                            />
                        ),
                        headerStyle: {
                            backgroundColor: isDark ? "#1c1c1c" : "#fff",
                        },
                        headerTintColor: isDark ? "#fff" : "#1c1c1c",
                        headerTitleAlign: "center",
                    }}
                />
        </Stack>
    );
}
