import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

import { Ionicons } from '@expo/vector-icons';

import { useNavigationFlowContext } from '@/context/NavFlowContext';

import { GENDER, GOAL } from '@/types/interfaces/entities/user';

import RadioButtonVerticalIconComponent from '@/components/ui/common/buttons/RadioButtonVerticalIcon';
import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import { router } from 'expo-router';

const Form03 = () => {

    const opacity = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));
    useEffect(() => {
        opacity.value = withTiming(1, { duration: 500 }); 
    }, []);
    const { tmpUser, updateInitUserShell } = useNavigationFlowContext()

    const [selectedGenre, setSelectedGenre] = useState<GENDER>(tmpUser?.gender || GENDER.MALE);
    const [selectedGoal, setSelectedGoal] = useState<GOAL>(tmpUser?.goal || GOAL.WEIGHT_LOSS);
    
    const handleContinue = () => {
        updateInitUserShell({
            ...tmpUser,
            gender: selectedGenre,
            goal: selectedGoal,
        })
        router.push('/form04')
    }

    return (
        <Animated.View
            style={animatedStyle}
            className="flex-1 w-full flex flex-col items-center justify-between">

            <Text className="text-white text-4xl font-ralewayExtraBold">
                Cuéntanos de ti
            </Text>
            <View className={`mt-2`}>
                <View>
                    <Text className="text-white text-center text-xl font-ralewaySemiBold mb-4">
                        Tu género es:
                    </Text>
                    <RadioButtonVerticalIconComponent
                        options={Object.values(GENDER)}
                        icons={[
                            <Ionicons name="male"
                                size={35}
                                color={"#fff"} />,
                            <Ionicons name="female"
                                size={35}
                                color={"#fff"} />,
                            <Ionicons name="male-female"
                                size={35}
                                color={"#fff"} />,
                        ]}
                        selectedValue={selectedGenre}
                        setSelectedValue={setSelectedGenre}
                        rbComponentStyle='w-full flex flex-row'
                        rbIndividualRadioButtonStyle='items-center justify-center w-1/3'
                        rbIndividualTextBtnStyle='text-lg pb-2 font-ralewayExtraBold'
                    />
                </View>

                    <View className='flex flex-col'>
                        <Text className="text-white text-center text-xl font-ralewaySemiBold mb-4">
                            Tu objetivo es:
                        </Text>
                        <RadioButtonVerticalIconComponent
                            options={Object.values(GOAL)}
                            icons={[
                                <Ionicons name="nutrition-outline"
                                    size={35}
                                    color={"#fff"} />,
                                <Ionicons name="barbell-outline"
                                    size={35}
                                    color={"#fff"} />,
                                <Ionicons name="fitness-sharp"
                                    size={35}
                                    color={"#fff"} />,
                                <Ionicons name="trophy-outline"
                                    size={35}
                                    color={"#fff"} />,
                            ]}
                            selectedValue={selectedGoal}
                            setSelectedValue={setSelectedGoal}
                            rbComponentStyle='w-full flex flex-col'
                            rbIndividualRadioButtonStyle='items-center justify-center'
                            rbIndividualTextBtnStyle='text-lg pb-2 font-ralewayExtraBold text-center'
                        />
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

export default Form03;
