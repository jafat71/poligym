import React from 'react'
import { router, Stack } from 'expo-router'
import { View } from 'react-native';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainLogoCustomComponent from '@/components/ui/common/logo/mainLogo';
import { useTheme } from '@/context/ThemeContext';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useUser } from '@/context/UserContext';
import Loading from '@/components/animatedUi/Loading';
const _layout = () => {
    const { isDark } = useTheme()
    const navigation = useNavigation();
    const { loggedUserInfo } = useUser()

    if (!loggedUserInfo) return <Loading />

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="home"
                options={{
                    headerShown: true,
                    headerTitle: () => (
                        <View >
                            <MainLogoCustomComponent
                                height='24'
                                principal={isDark ? "#fff" : "#1c1c1c"}
                            />
                        </View>
                    ),
                    headerLeft: () => (
                        <Pressable
                            onPress={() => {
                                navigation.dispatch(DrawerActions.openDrawer());
                            }}
                        >
                            <Ionicons name="menu" size={24} color={isDark ? "#fff" : "#1c1c1c"} />
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
            <Stack.Screen name="plandetail"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    )
}

export default _layout