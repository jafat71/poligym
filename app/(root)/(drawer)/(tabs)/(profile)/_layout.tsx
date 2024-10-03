import { Stack } from 'expo-router';

export default function ProfileLayout() {
    return (
        <Stack 
        initialRouteName='profile'
        screenOptions={{ headerShown: false, animation: 'none'}}>
            <Stack.Screen name="profile" options={{headerShown: false}} />
            <Stack.Screen name="config" options={{headerShown: false}} />
            <Stack.Screen name="updateinformation" options={{headerShown: false}} />
        </Stack>
    );
}
