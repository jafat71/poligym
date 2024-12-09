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

const WelcomeAnimatedLoading = () => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.8);
    const initialScale = useSharedValue(0);

    // Animación inicial y pulso
    useEffect(() => {
        // Animación de entrada
        initialScale.value = withTiming(1, {
            duration: 400,
            easing: Easing.bezier(0.34, 1.56, 0.64, 1), // Efecto de rebote suave
        });

        // Iniciar el pulso con un pequeño delay
        scale.value = withDelay(
            400, // Esperar a que termine la animación inicial
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
    
    return (
        <View className="flex flex-col items-center justify-center flex-1 bg-blueEPN-500 p-4">
            <View className="relative">
                <Animated.View 
                    className="absolute rounded-full bg-eOrange-500/30"
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
                        principal='#ff5722'
                        secondary='#ff5722'
                    />
                </Animated.View>
            </View>
        </View>
    );
};

export default WelcomeAnimatedLoading;