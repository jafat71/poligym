import { Stack } from 'expo-router';

export default function TabLayout() {
    return (
        //TODO: FLOATING CUSTOM TABS
        <Stack 
        initialRouteName='index'
        screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    animation: 'fade_from_bottom',
                    animationTypeForReplace: 'pop',
                }}
            />
            
            <Stack.Screen
                name="(plan)/index"
                options={{
                    headerShown: false,
                    animation: 'slide_from_bottom',
                    animationTypeForReplace: 'pop',
                }}
            />

            <Stack.Screen
                name="(exercise)/index"
                options={{
                    headerShown: false,
                    animation: 'slide_from_bottom',
                    animationTypeForReplace: 'pop',
                }}
            />

            <Stack.Screen
                name="(foodplan)/index"
                options={{
                    headerShown: false,
                    animation: 'slide_from_bottom',
                    animationTypeForReplace: 'pop',
                }}
            />

            <Stack.Screen
                name="(routine)/index"
                options={{
                    headerShown: false,
                    animation: 'slide_from_bottom',
                    animationTypeForReplace: 'pop',
                }}
            />
        </Stack>
    );
}