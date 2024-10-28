import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { Component, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing } from 'react-native-reanimated';

interface FormSuccessAlertProps {
    message: string;
    title: string;
}

export const FormSuccessAlert = ({ message, title }: FormSuccessAlertProps) => {
    const { isDark } = useTheme();
    const [visible, setVisible] = useState(true);
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

    useEffect(() => {
        if (message === '') {
            setVisible(false);
        } else {
            setVisible(true);
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
            {message.length > 0 && visible && (
                <View className={`bg-${isDark ? 'white' : 'darkGray-500'} w-full rounded-2xl p-2`}>
                    <View className={`flex flex-row items-center justify-between border-b-[2px] border-${isDark ? 'black' : 'white'}`}>
                        <View className='flex flex-row items-center'>
                            <Ionicons name='checkmark-circle-outline' size={20} color='green' />
                            <Text className={`text-${isDark ? 'black' : 'white'} font-ralewayExtraBold p-2`}>{title}</Text>
                        </View>
                        <Ionicons
                            name='close'
                            size={20}
                            color='black'
                            onPress={() => setVisible(false)}
                            className='absolute p-2'
                        />
                    </View>

                    <View className='p-2'>
                        <Text className={`text-${isDark ? 'black' : 'white'} font-ralewayBold`}>{message}</Text>
                    </View>
                </View>
            )}
        </Animated.View>
    )
}

export default FormSuccessAlert
