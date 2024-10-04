import { Stack } from 'expo-router';

export default function ProfileLayout() {
    return (
        <Stack 
        initialRouteName='profile'
        screenOptions={{ headerShown: false, animation: 'none'}}>
            <Stack.Screen name="profile" options={{headerShown: false, animation: 'slide_from_bottom'}} />
            <Stack.Screen name="config" options={{headerShown: false, animation: 'none'}} />
            <Stack.Screen name="updateinformation" options={{headerShown: false}} />
        </Stack>
    );
}
