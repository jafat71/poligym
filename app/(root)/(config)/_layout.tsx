import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack 
        initialRouteName='profile'
        screenOptions={{ headerShown: false, animation: 'none'}}>
            <Stack.Screen name="config" options={{headerShown: false, animation: 'slide_from_right'}} />
            <Stack.Screen name="updateinformation" options={{headerShown: false, animation: 'slide_from_right'}} />
        </Stack>
    );
}
