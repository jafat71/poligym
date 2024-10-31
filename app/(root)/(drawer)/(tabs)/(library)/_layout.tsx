import {
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import {  withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
    const { isDark } = useTheme()

    return (
        <SafeAreaView className={`flex-1 ${isDark ? "bg-darkGray-500" : "bg-white"} `}>

            <MaterialTopTabs>
                <MaterialTopTabs.Screen name="exercises" options={{
                    title: "Ejercicios",
                    tabBarStyle: {
                        backgroundColor: isDark ? "#1c1c1c" : "#fff",
                    },
                    tabBarActiveTintColor:  isDark ? "#1c1c1c" : "#fff",
                    tabBarLabelStyle: {
                        color: '#0055f9',
                        fontFamily: 'Raleway-Bold'
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: '#0055f9',
                        padding: 2
                    }
                }} />
                <MaterialTopTabs.Screen name="food" options={{
                    title: "Planes Alimenticios",
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