import { View } from 'react-native';
import Animated, { 
    useAnimatedStyle, 
    withTiming, 
    withRepeat, 
    useSharedValue, 
    withSequence,
    withDelay,
    Easing
} from 'react-native-reanimated';
import { useEffect } from 'react';
import MainLogoGradientComponent from '../ui/common/logo/mainLogoGrandient';
import { useTheme } from '@/context/ThemeContext';

const WorkoutLoadingScreen = () => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.8);
    const initialScale = useSharedValue(0);

    useEffect(() => {
        initialScale.value = withTiming(1, {
            duration: 400,
            easing: Easing.bezier(0.34, 1.56, 0.64, 1), // Efecto de rebote suave
        });

        scale.value = withDelay(
            400, 
            withRepeat(
                withSequence(
                    withTiming(1.5, {
                        duration: 1500,
                        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    }),
                    withTiming(1, {
                        duration: 1500,
                        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    }),
                ),
                -1,
                false
            )
        );

        opacity.value = withDelay(
            400,
            withRepeat(
                withSequence(
                    withTiming(0, {
                        duration: 1500,
                        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    }),
                    withTiming(0.8, {
                        duration: 1500,
                        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    }),
                ),
                -1,
                false
            )
        );
    }, []);

    const pulseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const logoStyle = useAnimatedStyle(() => ({
        transform: [{ scale: initialScale.value }],
    }));

    const { isDark } = useTheme();
    
    return (
        <View className={`flex flex-col items-center justify-center flex-1 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"} p-4`}>
            <View className="relative">
                <Animated.View 
                    className={`absolute rounded-full ${isDark ? "bg-white/50" : "bg-darkGray-900/50"}`}
                    style={[
                        {
                            width: 120,
                            height: 120,
                            top: -10,
                            left: -10,
                        },
                        pulseStyle
                    ]} 
                />
                <Animated.View style={logoStyle}>
                    <MainLogoGradientComponent
                        height='100'
                        width='100'
                        principal={isDark ? '#fff' : '#1c1c1c'}
                        secondary={isDark ? '#fff' : '#1c1c1c'}
                    />
                </Animated.View>
            </View>
        </View>
    );
};

export default WorkoutLoadingScreen;