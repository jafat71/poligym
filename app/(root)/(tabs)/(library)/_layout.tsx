import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function TabLayout() {
    const { isDark } = useTheme();
    return (
        <Stack>
            <Stack.Screen
                name="info"
                options={{
                    headerTitle: () => (
                            <Text className={`text-xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Biblioteca</Text>
                    ),
                    headerLeft: () => (
                        <Pressable
                            onPress={() => {
                                router.navigate('/(tabs)/home');
                            }}
                        >
                            <Ionicons name="arrow-back" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable
                            onPress={() => {
                                router.navigate('/(config)/config')
                            }}
                        >
                            <Ionicons name="settings-outline" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
                        </Pressable>
                    ),
                    headerStyle: {
                        backgroundColor: isDark ? '#1c1c1c' : '#fff',
                    },
                    headerTintColor: isDark ? "#fff" : "#1c1c1c",
                    headerTitleAlign: 'center',

                }}
            />
            <Stack.Screen
                name="alimentationInfo"
                options={{
                    headerShown: false,
                    animation: 'fade_from_bottom',
                    animationTypeForReplace: 'pop',
                }}
            />
            <Stack.Screen
                name="exerciseInfo"
                options={{
                    headerShown: false,
                    animation: 'fade_from_bottom',
                    animationTypeForReplace: 'pop',
                }}
            />
        </Stack>
    );
}