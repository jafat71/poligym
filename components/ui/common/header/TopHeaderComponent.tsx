import React from "react";
import { Pressable, View } from "react-native";

import { router } from "expo-router";
import { useSegments } from "expo-router";

import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import MainLogoCustomComponent from "../logo/mainLogo";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { OnboardingItems } from "@/constants";

const TopHeaderComponent = () => {
    const { isDark } = useTheme();
    const segments = useSegments();
    return (
        <View className="w-full h-48 p-4 bg-eBlue-500">
            <Image
                source={{ uri: OnboardingItems[2].image }}
                resizeMode="cover"
                className="absolute top-0 left-0 right-0 bottom-0 opacity-30"
            />
            <LinearGradient
                colors={['rgba(0,85,249,0.8)', 'rgba(41,111,255,0.6)', 'rgba(102,155,255,0.05)']}
                className="absolute top-0 left-0 right-0 bottom-0"
            />
            <View>
                <Pressable
                    className="flex flex-row items-center justify-center"
                    onPress={() => {
                        const currentRoute = segments[segments.length - 1];
                        if (currentRoute === "update") {
                            router.back();
                        } else {
                            router.replace("/welcome");
                        }
                    }}
                >
                    <MainLogoCustomComponent
                        width="40"
                        height="40"
                        principal={`#fff`}
                    />
                </Pressable>

                <Text className="text-white font-ralewayBold text-7xl opacity-20">
                    POLIGYM
                </Text>
                <Text className="text-eBlue-500 font-ralewayBold text-7xl -translate-y-12">
                    POLIGYM
                </Text>
                <Text className="text-eBlue-600 font-ralewayBold text-7xl -translate-y-24">
                    POLIGYM
                </Text>
                <Text className="text-white font-ralewayBold text-7xl -translate-y-36">
                    POLIGYM
                </Text>
            </View>
        </View>
    );
};

export default TopHeaderComponent;
