import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

import { useNavigationFlowContext } from '@/context/NavFlowContext';

import { SnapCarousel } from '@/components/ui/common/carousel/SnapCarousel';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';

const Form02 = () => {

    const opacity = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));
    useEffect(() => {
        opacity.value = withTiming(1, { duration: 500 }); 
    }, []);

    const { tmpUser, updateInitUserShell } = useNavigationFlowContext()

    const [selectedWeight, setSelectedWeight] = useState(tmpUser?.weight || 70);
    const weightFlatListRef = useRef(null);
    const weights = Array.from({ length: 70 }, (_, i) => i + 40);

    const [selectedHeight, setSelectedHeight] = useState(tmpUser?.height || 170);
    const heightFlatListRef = useRef(null);
    const heights = Array.from({ length: 60 }, (_, i) => i + 140);

    const initialIndexWeight = tmpUser?.weight ? tmpUser?.weight - 40 : 30
    const initialIndexHeight = tmpUser?.height ? tmpUser?.height - 140 : 30

    useEffect(() => {
        updateInitUserShell({
            weight: selectedWeight,
            height: selectedHeight
        })
    }, [selectedWeight, selectedHeight])

    const handleContinue = () => {
        router.push('/form03')
    }

    return (
        <Animated.View
            style={animatedStyle} className="flex-1 w-full flex flex-col items-center justify-between">

             <Text className="text-white text-4xl font-ralewayExtraBold">
                Cuéntanos de ti
            </Text>

            <View className={`flex flex-row w-full`}>
                
                <View className={`w-1/2 flex flex-col items-center justify-center`}>
                    <Ionicons name="scale" size={24} color="white" />
                    <Text className="text-white text-xl font-ralewaySemiBold mb-4">
                        Tu peso es:
                    </Text>
                    <SnapCarousel
                        dataOptions={weights}
                        flatListRef={weightFlatListRef}
                        selectedOption={selectedWeight}
                        setSelectedOption={setSelectedWeight}
                        initialIndex={initialIndexWeight}
                    />
                    <Text className="text-white text-2xl font-ralewaySemiBold my-4">{selectedWeight} KG</Text>

                </View>

                <View className={`w-1/2 flex flex-col items-center justify-center`}>
                    <Ionicons name="body" size={24} color="white" />
                    <Text className="text-white text-xl font-ralewaySemiBold mb-4">
                        Tu altura es:
                    </Text>
                    <SnapCarousel
                        dataOptions={heights}
                        flatListRef={heightFlatListRef}
                        selectedOption={selectedHeight}
                        setSelectedOption={setSelectedHeight}
                        initialIndex={initialIndexHeight}
                    />
                    <Text className="text-white text-2xl font-ralewaySemiBold my-4">{selectedHeight} CM</Text>
                </View>
            </View>

            <View className='w-full'>
                <CTAButtonPrimary
                    onPress={handleContinue}
                    text="Continuar"
                />

            </View>
        </Animated.View>
    );
};

export default Form02;
