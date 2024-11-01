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
import SearchBar from "@/components/ui/common/searchbar/SearchBar";

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
                <View className={`flex flex-row items-center`}>
                    <View className={`rounded-full w-16 h-16 
                        flex items-center justify-center mt-2
                        border-[2px] border-eBlue-500 
                        ${isDark ? "" : "bg-darkGray-200"}`}>
                        {
                            loggedUserInfo?.userProfileImgUrl ? (
                                <Image source={{ uri: loggedUserInfo.userProfileImgUrl }} className='w-full h-full rounded-full' resizeMode='contain' />
                            ) : (
                                <Text className={` text-xl font-raleway text-eBlue-500 `}>
                                    {loggedUserInfo?.userName?.split(' ').map(name => name[0]).join('')}
                                </Text>
                            )
                        }
                    </View>
                    <View className={`pl-3 w-full items-start`}>
                        <Text className={`text-2xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>
                            {
                                loggedUserInfo?.userName
                            }
                        </Text>
                        <Text className={`text-base font-raleway text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>
                            {
                            loggedUserInfo?.userEmail
                            }
                        </Text>

                    </View>
                </View>

                <View className="flex flex-row items-center justify-between py-2">
                    <View className="flex flex-row items-center justify-center gap-2">
                        <Text className={`text-base font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Posts</Text>
                        <Text className={`text-lg font-ralewayExtraBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>0</Text>
                    </View>

                    <View className="h-full">
                        <Pressable
                            onPress={() => {
                                router.push('/updateinformation')
                            }}
                            className="flex flex-col items-center justify-center">
                            <View className="flex flex-row items-center justify-center rounded-2xl border-[2px] border-eBlue-500 px-2 py-1">
                                <Ionicons name="pencil" size={18} color={"#0055f9"} />
                                <Text className={`text-sm font-ralewayBold text-start text-eBlue-500 `}>Editar</Text>
                            </View>
                        </Pressable>
                    </View>
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

            <Pressable 
                onPress={() => {
                    //TODO: OPEN SEARCHBAR
                }}
            className="absolute bottom-0 right-0 w-1/4 p-4">
                <View className="flex flex-row items-center justify-center rounded-2xl bg-eBlue-500 p-2">
                    <Ionicons name="search" size={34} color={"#fff"} />
                </View>
            </Pressable>
        </SafeAreaView>
    );
}