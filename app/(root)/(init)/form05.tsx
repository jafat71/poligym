import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useNavigationFlowContext } from '@/context/NavFlowContext';

import { USER_TYPE } from '@/types/interfaces/entities/user';

import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import RadioButtonVerticalIconComponent from '@/components/ui/common/buttons/RadioButtonVerticalIcon';

const Form05 = () => {
    const opacity = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));
    useEffect(() => {
        opacity.value = withTiming(1, { duration: 500 }); 
    }, []);
    const { tmpUser, updateInitUserShell } = useNavigationFlowContext()

    const [selectedUserType, setSelectedUserType] = useState<USER_TYPE>(tmpUser?.userType || USER_TYPE.STUDENT);

    const handleContinue = () => {
        updateInitUserShell({
            ...tmpUser,
            userType: selectedUserType
        })
        router.push('/form06')
    }

    return (
        
        <Animated.View
            style={animatedStyle}
            className="flex-1 w-full flex flex-col items-center justify-center">
        <View className="flex-1 w-full flex flex-col items-center justify-between">
            <Text className="text-white text-4xl font-ralewayExtraBold">
                Cuéntanos de ti
            </Text>
            <View className={`mt-2 flex-1 flex-col w-full`}>
                <View className={`py-2`}>
                    <Text className="text-white text-center text-xl font-ralewaySemiBold mb-4">
                        ¿Cuál es tu rol en la POLI?
                    </Text>

                    <RadioButtonVerticalIconComponent
                        options={Object.values(USER_TYPE)}
                        icons={[
                            <Ionicons name="person-outline"
                                size={35}
                                color={"#fff"} />,
                            <Ionicons name="school-outline"
                                size={35}
                                color={"#fff"} />,
                            <Ionicons name="briefcase-outline"
                                size={35}
                                color={"#fff"} />,
                        ]}
                        selectedValue={selectedUserType}
                        setSelectedValue={setSelectedUserType}
                        rbComponentStyle='w-full flex flex-col'
                        rbIndividualRadioButtonStyle='items-center justify-center w-full'
                        rbIndividualTextBtnStyle='text-lg pb-2 font-ralewayExtraBold'
                    />

                </View>
            </View>

            <View className='w-full'>
                <CTAButtonPrimary
                    onPress={handleContinue}
                    text="Continuar"
                    />
                </View>
            </View>
        </Animated.View>
    );
};

export default Form05;
