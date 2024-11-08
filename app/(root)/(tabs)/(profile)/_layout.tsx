import {
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { router, withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/context/UserContext";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);


export default function TabLayout() {
    const { isDark } = useTheme()
    const { loggedUserInfo } = useUser()

    return (
        <SafeAreaView className={`flex-1 ${isDark ? "bg-darkGray-500" : "bg-white"} `}>

<View className="px-4">
                {/* Perfil header */}
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <View className={`rounded-full w-16 h-16 
                            flex items-center justify-center
                            border-[2px] border-eBlue-500 
                            ${isDark ? "" : "bg-darkGray-200"}`}>
                            {
                                loggedUserInfo?.userProfileImgUrl ? (
                                    <Image source={{ uri: loggedUserInfo.userProfileImgUrl }} 
                                        className='w-full h-full rounded-full' 
                                        resizeMode='contain' />
                                ) : (
                                    <Text className="text-xl font-raleway text-eBlue-500">
                                        {loggedUserInfo?.userName?.split(' ').map(name => name[0]).join('')}
                                    </Text>
                                )
                            }
                        </View>
                        <View className="pl-3">
                            <Text className={`text-2xl font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"}`}>
                                {loggedUserInfo?.userName}
                            </Text>
                            <Text className={`text-base font-raleway ${isDark ? "text-white" : "text-darkGray-400"}`}>
                                {loggedUserInfo?.userEmail}
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="mt-4 px-4">
             
            </View>
            </View>


            <MaterialTopTabs>
                <MaterialTopTabs.Screen name="public" options={{
                    title: "Público",
                    tabBarStyle: {
                        backgroundColor: isDark ? "#1c1c1c" : "#fff",
                    },
                    tabBarActiveTintColor: '#0055f9',
                    tabBarLabelStyle: {
                        color: '#0055f9',
                        fontFamily: 'Raleway-Bold'
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: '#0055f9',
                        padding: 2
                    }
                }} />
                <MaterialTopTabs.Screen name="private" options={{
                    title: "Privado",
                    tabBarStyle: {
                        backgroundColor: isDark ? "#1c1c1c" : "#fff",
                    },
                    tabBarActiveTintColor: '#0055f9',
                    tabBarLabelStyle: {
                        color: '#0055f9',
                        fontFamily: 'Raleway-Bold'
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: '#0055f9',
                        padding: 2
                    }
                }} />
            </MaterialTopTabs>


        </SafeAreaView>
    );
}