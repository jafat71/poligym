

import { View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Shimmer from './Shimmer';
const SkeletonLoadingScreen = () => {

    const { isDark } = useTheme();
    return (
        <View className={`flex-1 ${isDark ? "bg-darkGray-500" : "bg-darkGray-100"} p-4`}>
            <View className={`mb-4 p-4 rounded-md ${isDark ? "bg-darkGray-700" : "bg-gray-200"}`}>
                <View className={`h-6 mb-2 ${isDark ? "bg-darkGray-500" : "bg-gray-400"} rounded`} />
                <View className={`h-10 ${isDark ? "bg-darkGray-500" : "bg-gray-300"} rounded mt-2`} />
                <View className="flex-row justify-between mt-4">
                    <View className={`h-8 w-1/5 ${isDark ? "bg-darkGray-500" : "bg-gray-300"} rounded`} />
                    <View className={`h-8 w-1/5 ${isDark ? "bg-darkGray-500" : "bg-gray-300"} rounded`} />
                    <View className={`h-8 w-1/5 ${isDark ? "bg-darkGray-500" : "bg-gray-300"} rounded`} />
                    <View className={`h-8 w-1/5 ${isDark ? "bg-darkGray-500" : "bg-gray-300"} rounded`} />
                </View>
            </View>

            <View className={`h-48 w-full ${isDark ? "bg-darkGray-700" : "bg-gray-300"} rounded mb-4`} />
            <View className={`h-48 w-full ${isDark ? "bg-darkGray-700" : "bg-gray-300"} rounded mb-4`} />
            <Shimmer />
        </View>
    );
};

export default SkeletonLoadingScreen;
