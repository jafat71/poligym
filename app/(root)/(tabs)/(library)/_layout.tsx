import { useTheme } from '@/context/ThemeContext';
import { Stack } from 'expo-router';

export default function TabLayout() {
    const { isDark } = useTheme()

    return (
        <Stack>
            <Stack.Screen 
                name="info"
                options={{
                    headerShown: false,
                }}
            />
            {/* <Stack.Screen 
                name="info"
                options={{
                    headerTitle: "Información",
                    headerStyle: {
                        backgroundColor: isDark ? "#1c1c1c" : "#fff",
                    },
                    headerTintColor: isDark ? "#fff" : "#1c1c1c",
                    headerTitleStyle: {
                        fontFamily: 'Raleway-Bold'
                    },
                }}
            /> */}
        </Stack>
    );
}