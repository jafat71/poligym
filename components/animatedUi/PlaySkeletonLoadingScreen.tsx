

import { View } from 'react-native';
import Shimmer from './Shimmer';
const PlaySkeletonLoadingScreen = () => {

    return (
        <View className={`flex-1 bg-eBlue-500 p-4`}>
            <View className={`mb-4 p-4 rounded-md bg-eBlue-700`}>
                <View className={`h-6 mb-2 bg-eBlue-500 rounded`} />
                <View className={`h-10 bg-eBlue-600 rounded mt-2`} />
                <View className="flex-row justify-between mt-4">
                    <View className={`h-8 w-1/5 bg-eBlue-600 rounded`} />
                    <View className={`h-8 w-1/5 bg-eBlue-600 rounded`} />
                    <View className={`h-8 w-1/5 bg-eBlue-600 rounded`} />
                    <View className={`h-8 w-1/5 bg-eBlue-600 rounded`} />
                </View>
            </View>

            <View className={`h-48 w-full bg-eBlue-700 rounded mb-4`} />
            <View className={`h-48 w-full bg-eBlue-700 rounded mb-4`} />
            <Shimmer />
        </View>
    );
};

export default PlaySkeletonLoadingScreen;
