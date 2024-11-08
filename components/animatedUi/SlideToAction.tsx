import React, { useEffect } from 'react';
import { Animated, View, Text } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const SlideToAction = ({ onComplete }) => {
    const slideAnimation = new Animated.Value(0);
    const fadeAnimation = new Animated.Value(1);

    const animateHint = () => {
        Animated.sequence([
            Animated.timing(fadeAnimation, {
                toValue: 0.5,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnimation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start(() => animateHint());
    };

    useEffect(() => {
        animateHint();
    }, []);

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: slideAnimation } }],
        { useNativeDriver: true }
    );

    const onHandlerStateChange = (event) => {
        if (event.nativeEvent.state === 5) {
            const { translationX } = event.nativeEvent;
            if (translationX > 100) {
                onComplete();
            } else {
                Animated.spring(slideAnimation, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            }
        }
    };

    return (
        <View className="bg-white/20 backdrop-blur-md rounded-2xl h-14 overflow-hidden">
            <PanGestureHandler
                onGestureEvent={onGestureEvent}
                onHandlerStateChange={onHandlerStateChange}
            >
                <Animated.View
                    className="absolute left-0 top-0 bottom-0 w-14 rounded-2xl"
                    style={{
                        transform: [{
                            translateX: slideAnimation.interpolate({
                                inputRange: [0, 250],
                                outputRange: [0, 250],
                                extrapolate: 'clamp',
                            })
                        }],
                    }}
                >
                    <View className="bg-white h-full rounded-2xl items-center justify-center">
                        <Ionicons name="arrow-forward" size={24} color="#0055f9" />
                    </View>
                </Animated.View>
            </PanGestureHandler>
            <Animated.View 
                className="flex-1 items-center justify-center"
                style={{ opacity: fadeAnimation }}
            >
                <Text className="text-white font-ralewayBold">
                    Desliza para continuar
                </Text>
            </Animated.View>
        </View>
    );
};

export default SlideToAction;