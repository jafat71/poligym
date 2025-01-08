import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ExerciseInWorkoutSkeleton = () => {
    return (
        <View className={`
            flex flex-row items-center justify-start
            transition-all duration-300 px-2 h-24
            bg-eBlue-500 rounded-lg my-2
        `}>
            <View
                className={`p-4 justify-center 
                    bg-darkGray-200 h-full opacity-10`}
            >
            </View>

            <View className={`
                flex-1 rounded-sm overflow-hidden
            `}>
                <View
                    className={`
                        px-4 py-0 flex-row items-center justify-between 
                    `}
                >

                    <View className="flex-1 flex flex-col gap-y-2 p-2">
                        <View className={`h-3 bg-gray-300 rounded opacity-10`} />
                        <View className={`h-3 bg-gray-300 rounded opacity-10`} />
                        <View className={`h-3 bg-gray-300 rounded opacity-10`} />
                        <View className={`h-3 bg-gray-300 rounded opacity-10`} />
                    </View>

                    <View
                        className="w-24 h-24 rounded-sm bg-darkGray-300 opacity-10"
                    />
                </View>
            </View>
        </View>
    );
}

export default ExerciseInWorkoutSkeleton;
