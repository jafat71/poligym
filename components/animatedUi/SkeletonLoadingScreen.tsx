

import { View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Shimmer from './Shimmer';
const SkeletonLoadingScreen = () => {

    const { isDark } = useTheme();
    return (
        <View className={`flex-1 ${isDark ? "bg-blueEPN-900" : "bg-blueEPN-500"} p-4`}>
            <View className={`mb-4 p-4 rounded-md ${isDark ? "bg-blueEPN-800" : "bg-blueEPN-600"}`}>
                <View className={`h-6 mb-2 ${isDark ? "bg-blueEPN-700" : "bg-blueEPN-500"} rounded`} />
                <View className={`h-10 ${isDark ? "bg-blueEPN-600" : "bg-blueEPN-400"} rounded mt-2`} />
                <View className="flex-row justify-between mt-4">
                    <View className={`h-8 w-1/5 ${isDark ? "bg-blueEPN-700" : "bg-blueEPN-800"} rounded`} />
                    <View className={`h-8 w-1/5 ${isDark ? "bg-blueEPN-700" : "bg-blueEPN-800"} rounded`} />
                    <View className={`h-8 w-1/5 ${isDark ? "bg-blueEPN-700" : "bg-blueEPN-800"} rounded`} />
                    <View className={`h-8 w-1/5 ${isDark ? "bg-blueEPN-700" : "bg-blueEPN-800"} rounded`} />
                </View>
            </View>

            <View className={`h-48 w-full ${isDark ? "bg-blueEPN-800" : "bg-blueEPN-600"} rounded mb-4`} />
            <View className={`h-48 w-full ${isDark ? "bg-blueEPN-800" : "bg-blueEPN-600"} rounded mb-4`} />
            <Shimmer />
        </View>
    );
};

export default SkeletonLoadingScreen;
