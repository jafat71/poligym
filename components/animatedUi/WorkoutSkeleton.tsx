import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import * as Progress from 'react-native-progress';

const WorkoutSkeleton = () => {
    return (
        <View className="rounded-lg overflow-hidden">
            <LinearGradient
                colors={[
                    'rgba(0,85,249,0.95)',
                    'rgba(0,85,249,0.8)',
                    'rgba(0,85,249,0.95)'
                ]}
                className="absolute w-full h-full"
            />
            <View className="p-4 pb-3 ">
                <View className={`h-6 w-full bg-gray-100 rounded mb-4 opacity-10`} />
                <View className={`h-6 w-full bg-gray-100 rounded mb-4 opacity-10`} />
                <View className={`h-6 w-full bg-gray-100 rounded mb-4 opacity-10`} />

                <View className="flex flex-row justify-between   items-center mb-2">
                    <View className={`h-6 w-1/4 bg-gray-100 rounded opacity-10`} />
                    <View className={`h-24 w-1/4 bg-gray-100 rounded-full opacity-10 -translate-y-4`} />
                </View>

                <View className={`h-6 w-1/2 bg-gray-100 rounded opacity-10`} />
                <View className={`h-6 w-full bg-gray-100 rounded opacity-10`} />

                <View className={`flex flex-row items-center justify-between`}>
                    <View className={`h-20 w-1/4 bg-gray-100 rounded-full opacity-10`} />
                    <View className={`h-6 w-1/4 bg-gray-100 rounded opacity-10`} />

                </View>

            </View>

        </View>
    )
}

export default WorkoutSkeleton