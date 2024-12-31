import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View } from 'react-native';

const HorizontalFlatlistSkeleton = () => {
    return (
        <View
        className={`w-72 h-60 mr-2 my-2 mb-1 
        overflow-hidden rounded-lg`}>
        <LinearGradient
            colors={[
                'rgba(0,85,249,0.95)',
                'rgba(0,85,249,0.8)',
                'rgba(0,85,249,0.95)'
            ]}
            className="absolute w-full h-full"
        />
        <View className='z-30 flex-1'>
            <View className='p-4 flex flex-row justify-between'>
                <View className='flex flex-col w-4/5'>
                <View className={`h-3 bg-gray-300 rounded opacity-10`} />
                <View className={`h-3 bg-gray-300 rounded opacity-10`} />
                </View>
                <View>
                <View className={`h-10 w-10 bg-gray-300 rounded opacity-10`} />
                </View>
            </View>
            <View className='flex-1 items-start justify-end p-4'>
                <View className="flex-row items-start justify-between px-2 gap-x-2">
                    <View className={`h-10 w-10 bg-gray-300 rounded opacity-10`} />
                    <View className={`h-10 w-10 bg-gray-300 rounded opacity-10`} />
                </View>
            </View>
        </View>
    </View>
    );
}


export default HorizontalFlatlistSkeleton;
