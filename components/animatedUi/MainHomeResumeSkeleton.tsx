import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MainHomeResumeSkeleton = () => {
    return (
        <View className={`w-full h-[460px] rounded-lg overflow-hidden bg-gray-300`}>
            <LinearGradient
                colors={['rgba(220, 220, 220, 1)', 'rgba(245, 245, 245, 1)', 'rgba(220, 220, 220, 1)']}
                start={[0, 0]}
                end={[1, 0]}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
            />
            <View className="p-4">
                {/* Header Skeleton */}
                <View className="flex-row justify-between items-center mb-4">
                    <View className="w-1/2 h-8 bg-gray-400 rounded-md" />
                    <View className="w-8 h-8 bg-gray-400 rounded-full" />
                </View>
                {/* Week Summary Skeleton */}
                <View className="w-full h-16 bg-gray-400 rounded-md mb-4" />
                {/* Plan Info Skeleton */}
                <View className="flex-1 justify-between">
                    <View>
                        <View className="h-4 bg-gray-400 rounded-md w-1/3 mb-2" />
                        <View className="h-8 bg-gray-400 rounded-md w-3/4 mb-4" />
                    </View>
                    {/* Button Skeleton */}
                    <View className="h-12 bg-gray-400 rounded-md" />
                </View>
            </View>
        </View>
    );
};

export default MainHomeResumeSkeleton;
