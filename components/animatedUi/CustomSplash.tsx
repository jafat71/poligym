import { View, Animated } from 'react-native'; 
import MainLogoGradientComponent from '../ui/common/logo/mainLogoGrandient';
import { useEffect, useRef } from 'react'; 

const CustomSplash = () => {
    const pulseAnimation = useRef(new Animated.Value(1)).current; 

    useEffect(() => {
        pulseAnimation.setValue(1);
        Animated.timing(pulseAnimation, {
            toValue: 1.4, 
            duration: 1600,
            useNativeDriver: false, 
        }).start(() => {
            Animated.timing(pulseAnimation, {
                toValue: 1, 
                duration: 1600,
                useNativeDriver: false, 
            }).start(); 
        });
    }, [pulseAnimation]);
    return (
        <View className={`bg-eBlue-500 flex-1 flex-col items-center justify-center z-10`}>
            <Animated.View style={{ transform: [{ scale: pulseAnimation }] }}>
                <MainLogoGradientComponent
                    height='100'
                    width='100'
                    principal='#fff' 
                    secondary='#000'
                />
            </Animated.View>
        </View>
    );
};

export default CustomSplash;