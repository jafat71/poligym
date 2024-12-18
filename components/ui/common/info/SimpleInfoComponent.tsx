import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

interface Props {
    text: string;
    pressable?: JSX.Element;
    modalVisible?: boolean;
    toggleModal?: () => void;
}

export const SimpleInfoComponent = ({ text, pressable, modalVisible, toggleModal }: Props) => {
    const { isDark } = useTheme();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (modalVisible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [modalVisible]);

    if (!modalVisible) return null;

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                position: 'absolute',
                width: '100%',
                height: '100%',
            }}
            className={`
                flex flex-col items-center justify-center
                z-50  h-full w-full
            `}
        >
            <Animated.View
                style={{
                    transform: [{
                        scale: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.9, 1],
                        }),
                    }],
                }}
                className={`
                    flex flex-col justify-between 
                    ${isDark ? 'bg-darkGray-900' : 'bg-white'} 
                    rounded-lg p-4 shadow-lg
                    mx-4 border-2 border-eBlue-500
                `}
            >
                <View className="flex flex-row items-start justify-between">
                    <Ionicons
                        name="information-circle-outline"
                        size={24}
                        color={isDark ? '#fff' : '#1c1c1c'}
                    />
                    <Text
                        className={`
                            flex-1 ml-2 text-sm font-ralewaySemiBold text-start
                            ${isDark ? 'text-white' : 'text-darkGray-500'}
                        `}
                    >
                        {text}  
                    </Text>
                    <Pressable onPress={toggleModal}>
                        <Ionicons
                            name="close-outline"
                            size={24}
                            color={isDark ? '#fff' : '#1c1c1c'}
                        />
                    </Pressable>
                </View>
                {pressable}
            </Animated.View>

        </Animated.View>
    );
};

export default SimpleInfoComponent;