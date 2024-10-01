import { Href } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing } from 'react-native-reanimated';

interface Props {
    text: string;
    distance: number; 
    duration: number; 
}

export const FloatingMessage = ({ text, distance, duration}: Props) => {
    const translateX = useSharedValue(-(distance * 8)); 

    useEffect(() => {
        translateX.value = withTiming(distance, { 
                duration: duration, 
                easing: Easing.inOut(Easing.ease),  
            })
    }, [translateX, distance, duration]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    return (
        <View className="justify-around items-center text-center">
            <Animated.Text
                style={[
                    animatedStyle,
                    {
                        width: 300,
                        borderRadius: 50,
                        fontSize: 20,
                        fontFamily: 'Raleway-Bold',
                        backgroundColor: '#77FFAA',
                        color: '#1c1c1c',
                        padding: 12
                    },
                ]}
            >
                {text}
            </Animated.Text>
        </View>
    );
}
