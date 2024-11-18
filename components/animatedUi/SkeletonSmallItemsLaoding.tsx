

import { View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Shimmer from './Shimmer';
const SkeletonSmallItemsLoading = () => {

    const { isDark } = useTheme();
    return (
        <View className={`flex flex-col ${isDark ? "bg-darkGray-500" : "bg-darkGray-100"} p-4`}>
            <View className={`h-8 w-1/2 ${isDark ? "bg-darkGray-500" : "bg-gray-300"} rounded`} />
            <View className={`h-8 w-1/2 ${isDark ? "bg-darkGray-500" : "bg-gray-300"} rounded`} />
            <View className={`h-8 w-1/2 ${isDark ? "bg-darkGray-500" : "bg-gray-300"} rounded`} />
            <View className={`h-8 w-1/2 ${isDark ? "bg-darkGray-500" : "bg-gray-300"} rounded`} />
            <Shimmer />
        </View>
    );
};

export default SkeletonSmallItemsLoading;
