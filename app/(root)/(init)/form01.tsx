import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useNavigationFlowContext } from "@/context/NavFlowContext";

import CTAButtonPrimary from "@/components/ui/common/buttons/CtaButtonPrimary";
import { SnapCarousel } from "@/components/ui/common/carousel/SnapCarousel";

const Form01 = () => {

    const opacity = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));
    useEffect(() => {
        opacity.value = withTiming(1, { duration: 500 }); 
    }, []);
    const { tmpUser, updateInitUserShell } = useNavigationFlowContext()

    const [userName, setUserName] = useState(tmpUser?.name || "");
    const [selectedAge, setSelectedAge] = useState(tmpUser?.age || 18);

    const agesFlatListRef = useRef(null);
    const ages = Array.from({ length: 83 }, (_, i) => i + 18);

    const initialIndex = tmpUser?.age ? tmpUser?.age - 18 : 0

    const handleContinue = () => {
        if (userName.trim() === '') {
            setUserName(tmpUser?.name || '')
        }
        updateInitUserShell({
            name: userName,
            age: selectedAge,
        });
        router.push('/form02')
    }

    return (

        <Animated.View
            style={animatedStyle}
            className="flex-1 w-full flex flex-col items-center justify-center">
            <Text className="text-white text-4xl font-ralewayExtraBold">
                Cuéntanos de ti
            </Text>
            <Text className="text-white text-xl font-ralewaySemiBold">
                Tu nombre es:
            </Text>
            <TextInput
                className="text-2xl bg-blueEPN-900 font-ralewayExtraBold text-darkGray-100 my-4 w-full text-center rounded-md p-2"
                value={userName}
                onChangeText={setUserName}
                placeholder="Tu nombre"
                placeholderTextColor="#c3c3c3"
            />

            <Ionicons name="balloon" size={24} color="#ff5722" />
            <Text className="text-white text-xl font-ralewaySemiBold mb-4">
                y tienes:
            </Text>

            <SnapCarousel
                dataOptions={ages}
                flatListRef={agesFlatListRef}
                selectedOption={selectedAge}
                setSelectedOption={setSelectedAge}
                initialIndex={initialIndex}
            />
            <Text className="text-white text-2xl font-ralewaySemiBold my-4">{selectedAge} años</Text>

            <View className='w-full'>
                <CTAButtonPrimary
                    onPress={handleContinue}
                    text="Continuar"
                />

            </View>
        </Animated.View>
    );
};

export default Form01;
