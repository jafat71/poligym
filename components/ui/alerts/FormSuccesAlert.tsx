import { Ionicons } from '@expo/vector-icons';
import React, { Component, useEffect } from 'react'
import { Text, View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing } from 'react-native-reanimated';

interface FormSuccessAlertProps {
    message: string;
}

export const FormSuccessAlert = ({ message }: FormSuccessAlertProps) => {

    const messageOpacity = useSharedValue(0);
    const messageTranslateY = useSharedValue(50);

    useEffect(() => {
        if (message.length > 0) {
            messageOpacity.value = withTiming(1, { duration: 300, easing: Easing.ease });
            messageTranslateY.value = withSpring(0);
        } else {
            messageOpacity.value = withTiming(0, { duration: 300, easing: Easing.ease });
            messageTranslateY.value = withSpring(50);
        }
    }, [message]);

    const animatedSuccessStyle = useAnimatedStyle(() => {
        return {
            opacity: messageOpacity.value,
            transform: [{ translateY: messageTranslateY.value }],
        };
    });

    return (
        <Animated.View style={[animatedSuccessStyle]} className='w-full mt-4'>
            {message.length > 0 && (
                <View className='bg-lightGreen w-full rounded-lg'>
                    <View className='flex flex-row items-center justify-center border-b-[2px] border-darkGray-500'>
                        <Ionicons name='checkmark-done-circle' size={20} color='#1c1c1c' />
                        <Text className='text-darkGray-500 font-ralewayBold p-2  '>Atención</Text>
                    </View>
                    <View className='p-2'>
                        <Text className='text-darkGray-500 font-ralewayBold'>{message}</Text>
                    </View>
                </View>
            )}
        </Animated.View>
    )
}

export default FormSuccessAlert
