import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { Component, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing } from 'react-native-reanimated';

interface FormErrorAlertProps {
    errors: string[];
}

export const FormErrorAlert = ({ errors }: FormErrorAlertProps) => {
    const [visible, setVisible] = useState(true);
    const {isDark} = useTheme()
    const errorOpacity = useSharedValue(0);
    const errorTranslateY = useSharedValue(50);

    useEffect(() => {
        if (errors.length > 0) {
            errorOpacity.value = withTiming(1, { duration: 300, easing: Easing.ease });
            errorTranslateY.value = withSpring(0);
        } else {
            errorOpacity.value = withTiming(0, { duration: 300, easing: Easing.ease });
            errorTranslateY.value = withSpring(50);
        }
    }, [errors]);

    useEffect(() => {
        if (errors.length === 0) {
            setVisible(false);
        } else {
            setVisible(true);
        }
    }, [errors]);

    const animatedErrorStyle = useAnimatedStyle(() => {
        return {
            opacity: errorOpacity.value,
            transform: [{ translateY: errorTranslateY.value }],
        };
    });


    return (
        <Animated.View style={[animatedErrorStyle]} className='w-full mt-4'>
            {errors.length > 0 && visible && (
                <View className={`bg-${isDark ? 'white' : 'darkGray-500'} w-full rounded-2xl p-2`}>
                    <View className={`flex flex-row items-center justify-between border-b-[2px] border-${isDark ? 'black' : 'white'}`}>
                        <View className='flex flex-row items-center'>
                            <Ionicons name='warning-outline' size={20} color='red' />
                            <Text className={`text-${isDark ? 'black' : 'white'} font-ralewayExtraBold p-2`}>Atención</Text>
                        </View>
                        <Ionicons
                            name='close'
                            size={20}
                            color={isDark ? 'black' : 'white'}
                            onPress={() => setVisible(false)}
                            className='p-2'
                        />
                    </View>
                    <View className='p-2'>
                        {errors.map((err, index) => (
                            <Text className={`text-${isDark ? 'black' : 'white'} font-ralewayBold`} key={index}>{err}</Text>
                        ))}
                    </View>
                </View>
            )}
        </Animated.View>
    )
}

export default FormErrorAlert
