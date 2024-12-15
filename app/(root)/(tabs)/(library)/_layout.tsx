import { Stack } from 'expo-router';

export default function TabLayout() {
    return (
        <Stack
            initialRouteName='index'
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="plan/index"
                options={{
                    headerShown: false,
                    animation: 'fade_from_bottom',
                }}
            />

            <Stack.Screen
                name="plan/[id]"
                options={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            />

            <Stack.Screen
                name="exercise/index"
                options={{
                    headerShown: false,
                    animation: 'fade_from_bottom',
                }}
            />

            <Stack.Screen
                name="exercise/[id]"
                options={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            />

            <Stack.Screen
                name="routine/index"
                options={{
                    headerShown: false,
                    animation: 'fade_from_bottom',
                }}
            />

            <Stack.Screen
                name="routine/[id]"
                options={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            />

            <Stack.Screen
                name="foodplan/index"
                options={{
                    headerShown: false,
                    animation: 'fade_from_bottom',
                }}
            />
            <Stack.Screen
                name="foodplan/[id]"
                options={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            />

        </Stack>
    );
}