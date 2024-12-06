import React, { useEffect, useRef } from "react";
import { Animated, Image, Text, View } from "react-native";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import {
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";

import { router, withLayoutContext } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";

import IconButton from "@/components/ui/common/buttons/IconButton";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
    const { isDark } = useTheme();
    const { loggedUserInfo } = useUser();

    const fadeAnim = useRef(new Animated.Value(0)).current; // Inicializa la opacidad

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <View className={`flex-1 bg-eBlue-500`}>


            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>

                <View className="flex-row items-center px-4 py-2">
                    <View className={`rounded-full w-20 h-20 flex items-center justify-center border-[2px] border-eBlue-100`}>
                        {loggedUserInfo?.avatarUrl ? (
                            <Image source={{ uri: loggedUserInfo.avatarUrl }}
                                className='w-full h-full rounded-full'
                                resizeMode='contain' />
                        ) : (
                            <Text className="text-4xl font-raleway text-eBlue-100">
                                {loggedUserInfo?.name?.split(' ').map(name => name[0]).join('')}
                            </Text>
                        )}
                    </View>
                    <View className="pl-3 flex-1">
                        <Text
                            numberOfLines={2}
                            className={`text-2xl font-ralewayBold text-white flex-wrap`}>
                            {loggedUserInfo?.name}
                        </Text>
                        <Text
                            numberOfLines={1}
                            className={`text-xs font-raleway text-white`}>
                            {loggedUserInfo?.email}
                        </Text>
                    </View>
                    <View>
                        <IconButton
                            icon={<Ionicons name="pencil-outline" size={24} color="white" />}
                            onPress={() => {
                                router.push('/(root)/(config)/updateinformation')
                            }}
                        />
                    </View>

                </View>

                <MaterialTopTabs
                    screenOptions={{
                        lazy: true,
                    }}
                >
                    <MaterialTopTabs.Screen name="public" options={{
                        title: "Público",
                        tabBarStyle: {
                            backgroundColor: "#0055f9",
                        },
                        tabBarActiveTintColor: '#fff',
                        tabBarLabelStyle: {
                            color: '#fff',
                            fontFamily: 'Raleway-ExtraBold'
                        },
                        tabBarIndicatorStyle: {
                            backgroundColor: isDark ? '#1c1c1c' : '#fff',
                            padding: 2
                        }
                    }} />
                    <MaterialTopTabs.Screen name="private" options={{
                        title: "Privado",
                        tabBarStyle: {
                            backgroundColor: "#0055f9",
                        },
                        tabBarActiveTintColor: '#fff',
                        tabBarLabelStyle: {
                            color: '#fff',
                            fontFamily: 'Raleway-ExtraBold'
                        },
                        tabBarIndicatorStyle: {
                            backgroundColor: isDark ? '#1c1c1c' : '#fff',
                            padding: 2
                        }
                    }} />
                </MaterialTopTabs>
            </Animated.View>

        </View>
    );
}