import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, Text, View } from "react-native";
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
import SimpleInfoComponent from "@/components/ui/common/info/SimpleInfoComponent";

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
    const [infoVisible, setInfoVisible] = useState(false);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <View className={`flex-1 bg-${isDark ? 'darkGray-900' : 'white'}`}>

            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                <View className='px-4 flex flex-row justify-between items-center'>
                    <View className='flex flex-col '>
                        <Text className={`${isDark ? 'text-white' : 'text-darkGray-900'} font-ralewayBold text-4xl`}>Posts</Text>
                    </View>
                    <IconButton
                        icon={<Ionicons name="information-circle-outline" size={24} color={isDark ? 'white' : '#1c1c1c'} />}
                        onPress={() => {
                            setInfoVisible(!infoVisible)
                        }}
                    />
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

            
            <SimpleInfoComponent
                text="Un post se genera al momento que completas una rutina y decides compartir tu logro con la comunidad"
                modalVisible={infoVisible}
                toggleModal={() => setInfoVisible(!infoVisible)}
                pressable={
                    <Text className={`text-eOrange-500 font-ralewaySemiBold`}>Si deseas que un post ya no se muestre en tu perfil, puedes cambiar su visibilidad.</Text>
                }
            />

        </View>
    );
}