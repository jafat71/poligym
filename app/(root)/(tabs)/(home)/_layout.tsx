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
                            principal={`${isDark ? "#fff" : "#1c1c1c"}`}
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
                                color={isDark ? "#fff" : "#1c1c1c"}
                            />
                        </Pressable>
                    ),
                    headerStyle: {
                        backgroundColor: isDark ? "#1c1c1c" : "#fff",
                    },
                    headerTintColor: isDark ? "#fff" : "#1c1c1c",
                    headerTitleAlign: "center",
                    statusBarTranslucent: true,
                    statusBarColor: 'transparent',
                    statusBarStyle: isDark ? 'light' : 'dark'
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
                                principal={`${isDark ? "#fff" : "#1c1c1c"}`}
                            />
                            </>,
                    headerStyle: {
                        backgroundColor: isDark ? "#1c1c1c" : "#fff",
                    },
                    headerTintColor: isDark ? "#fff" : "#1c1c1c",
                    headerTitleAlign: "center",
                    statusBarStyle: isDark ? 'light' : 'dark',
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
