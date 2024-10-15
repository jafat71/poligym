import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function Private() {
    const { isDark } = useTheme()

    return (
        <View>

            <View className={`border-[1px] my-2
        p-2
        ${isDark ? "border-darkGray-400" : "border-darkGray-500"}  rounded-sm`}>

                <View className={`flex flex-row items-center 
          justify-between
          pb-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
                    <View className='flex flex-row items-center'>
                        <View className={`rounded-full w-12 h-12
                        flex items-center justify-center mt-2
                        border-[1px] 
                        ${isDark ? "border-darkGray-400" : "bg-darkGray-200 border-darkGray-500"}`}>
                            <Text className={` text-xl font-raleway ${isDark ? "text-white" : "text-darkGray-400"} `}>JD</Text>
                        </View>
                        <View className={`pl-3`}>
                            <Text className={`text-base font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Jhon Doe</Text>
                            <Text className={`text-base font-raleway text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>18:35</Text>
                        </View>
                    </View>
                    <View >
                        <Ionicons name="ellipsis-vertical" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                    </View>
                </View>

                <View className='py-2'>
                    <Text className={`text-2xl font-ralewayLight text-start ${isDark ? "text-white" : "text-darkGray-500"} `} >
                        Jhon Doe ha realizado 10 repeticiones de ...
                    </Text>
                </View>

                <View className={`flex flex-row items-center justify-end`}>

                    <View className='flex flex-row items-center ' >
                        <Text className={`text-2xl font-ralewayLight  ${isDark ? "text-white" : "text-darkGray-500"} `} >
                            37
                        </Text>
                        <Ionicons name="heart" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                    </View>
                </View>

            </View>
        </View>
    );
}
