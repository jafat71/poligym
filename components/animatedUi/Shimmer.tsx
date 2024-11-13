import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';

import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '@/context/ThemeContext';

const Shimmer = () => {
    const { isDark } = useTheme();
    const shimmerWidth = Dimensions.get('window').width;
    const translateX = useSharedValue(-shimmerWidth);

    useEffect(() => {
        translateX.value = withRepeat(
            withTiming(shimmerWidth, {
                duration: 1500,
                easing: Easing.linear,
            }),
            -1, // Repite indefinidamente
            false
        );
    }, [shimmerWidth, translateX]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const gradientColors = isDark 
        ? ['transparent', 'rgba(255,255,255,0.3)', 'transparent']
        : ['transparent', 'rgba(255,255,255,0.5)', 'transparent'];

    return (
        <Animated.View
            style={[animatedStyle]}
            className="absolute top-0 left-0 right-0 bottom-0"
            pointerEvents="none"
        >
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{
                    width: '30%',
                    height: '100%',
                }}
            />
        </Animated.View>
    );
};

export default Shimmer;