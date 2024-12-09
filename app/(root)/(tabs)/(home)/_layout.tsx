import React from "react";
import { Pressable, View } from "react-native";

import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/context/ThemeContext";

import MainLogoCustomComponent from "@/components/ui/common/logo/mainLogo";

const _layout = () => {
    const { isDark } = useTheme();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="home"
                options={{
                    animation: "fade",
                    headerShown: true,
                    headerTitle: () => <></>,
                    headerLeft: () => (
                        <MainLogoCustomComponent
                            height="30"
                            width="30"
                            principal="#fff"
                        />
                    ),
                    headerRight: () => (
                        <Pressable
                            onPress={() => {
                                router.navigate("/(config)/config");
                            }}
                        >
                            <Ionicons
                                name="settings-outline"
                                size={24}
                                color="#fff"
                            />
                        </Pressable>
                    ),
                    headerStyle: {
                        backgroundColor: isDark ? '#050b12' : '#0f172a',
                    },
                    headerTintColor: '#fff',
                    headerTitleAlign: "center",
                    statusBarTranslucent: true,
                    statusBarColor: 'transparent',
                    statusBarStyle: 'light'
                }}
            />

            <Stack.Screen
                name="playWorkout/[id]"
                options={{
                    headerShown: true,
                    headerTitle: () => <>
                    <MainLogoCustomComponent
                                height="30"
                                width="30"
                                principal="#fff"
                            />
                            </>,
                    headerStyle: {
                        backgroundColor: isDark ? "#050b12" : "#0f172a",
                    },
                    headerTintColor: "#fff" ,
                    headerTitleAlign: "center",
                    statusBarStyle: 'light',
                    animation: "fade",
                    statusBarTranslucent: true,
                    statusBarColor: 'transparent',
                    fullScreenGestureEnabled: true
                }}
            />

            <Stack.Screen
                name="plandetail"
                options={{
                    headerShown: false,
                    animation: "fade",

                }}
            />

            <Stack.Screen
                name="exerciseDetail"
                options={{
                    headerShown: false,
                    animation: "fade_from_bottom",
                    animationTypeForReplace: 'pop'
                }}
            />
        </Stack>
    );
};

export default _layout;
