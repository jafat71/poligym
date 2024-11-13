

import { View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Shimmer from './Shimmer';
const IndividualCardSkeleton = () => {

    const { isDark } = useTheme();
    return (
        <View className={`flex-1 ${isDark ? "bg-darkGray-500" : "bg-darkGray-100"} p-4`}>
            <View className={`h-48 w-full ${isDark ? "bg-darkGray-700" : "bg-gray-300"} rounded mb-4`} />
            <View className={`h-48 w-full ${isDark ? "bg-darkGray-700" : "bg-gray-300"} rounded mb-4`} />
            <Shimmer />
        </View>
    );
};

export default IndividualCardSkeleton;
