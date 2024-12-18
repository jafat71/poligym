import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useNavigationFlowContext } from '@/context/NavFlowContext';

import { FITNESS_LEVEL, HAS_INJURY } from '@/types/interfaces/entities/user';

import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import RadioButtonVerticalIconComponent from '@/components/ui/common/buttons/RadioButtonVerticalIcon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

const Form04 = () => {
    const globalOpacity = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: globalOpacity.value,
    }));

    useEffect(() => {
        globalOpacity.value = withTiming(1, { duration: 500 });
    }, []);

    const { tmpUser, updateInitUserShell } = useNavigationFlowContext();

    const [selectedFitnessLevel, setSelectedFitnessLevel] = useState<FITNESS_LEVEL>(tmpUser?.fitnessLevel || FITNESS_LEVEL.BEGINNER);
    const [selectedMedicalProblem, setSelectedMedicalProblem] = useState<HAS_INJURY>(tmpUser?.injury !== "" ? HAS_INJURY.YES : HAS_INJURY.NO);
    const [medicalDetail, setMedicalDetail] = useState<string>(tmpUser?.injury || '');
    const [enableEdit, setEnableEdit] = useState(false);

    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (selectedMedicalProblem === null) return;

        switch (selectedMedicalProblem) {
            case HAS_INJURY.NO:
                setEnableEdit(false);
                setMedicalDetail('');
                break;
            case HAS_INJURY.YES:
                setEnableEdit(true);
                break;
            default:
                break;
        }
    }, [selectedMedicalProblem]);

    const handleContinue = () => {
        if (selectedMedicalProblem === HAS_INJURY.NO) {
            setMedicalDetail('')
        }

        updateInitUserShell({
            ...tmpUser,
            injury: medicalDetail,
            fitnessLevel: selectedFitnessLevel
        });
        router.push('/form05');
    };

    // Apply animations when enableEdit changes
    useEffect(() => {
        translateY.value = withTiming(enableEdit ? -10 : 0, { duration: 300 });
        opacity.value = withTiming(enableEdit ? 1 : 0, { duration: 300 });
    }, [enableEdit]);

    const animatedTranslateY = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }]
    }));

    const animatedInputStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{
            translateY: withTiming(opacity.value ? 0 : 50, { duration: 300 })
        }]
    }));

    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            alwaysBounceVertical
            contentContainerStyle={{ flexGrow: 1 }}
        >
                <Text className="text-white text-4xl font-ralewayExtraBold text-center">
                    Cuéntanos de ti
                </Text>
                <Animated.View
                    style={animatedStyle}
                    className="flex-1 w-full flex flex-col items-center ">
                    <View>
                        <Animated.View
                            style={animatedTranslateY}
                            className="mt-2">
                            <View className="mt-2">
                                <Text className="text-white text-center text-xl font-ralewaySemiBold mb-4">
                                    ¿Tienes algúna lesión?
                                </Text>
                                <View>
                                    <RadioButtonVerticalIconComponent
                                        options={Object.values(HAS_INJURY)}
                                        icons={[
                                            <Ionicons name="body-outline" size={35} color={`#fff`} />,
                                            <Ionicons name="bandage-outline" size={35} color={`#fff`} />,
                                        ]}
                                        rbComponentStyle="w-full flex flex-row"
                                        rbIndividualRadioButtonStyle="items-center justify-center w-1/2"
                                        rbIndividualTextBtnStyle="text-lg pb-2 font-ralewayExtraBold"
                                        selectedValue={selectedMedicalProblem}
                                        setSelectedValue={setSelectedMedicalProblem}
                                    />
                                </View>
                            </View>
                        </Animated.View>

                        {enableEdit && (
                            <Animated.View
                                style={animatedInputStyle}
                                className="px-4">
                                <View className="w-full flex flex-row items-center justify-start mb-2">
                                    <Ionicons name="pencil-outline" size={24} color={"#fff"} />
                                    <Text className="text-white text-center text-xl font-ralewaySemiBold">
                                        Detalle de la lesión
                                    </Text>
                                </View>
                                <TextInput
                                    className="h-44 text-white w-full font-ralewaySemiBold break-words 
                                            bg-eBlue-600
                                            border-2 border-white rounded-md p-2"
                                    value={medicalDetail}
                                    multiline={true}
                                    onChangeText={setMedicalDetail}
                                    numberOfLines={6}
                                    placeholder="Tengo un problema de..."
                                    placeholderTextColor="#c3c3c3"
                                />
                            </Animated.View>
                        )}
                    </View>

                    <View className="flex flex-col">
                        <Text className="text-white text-center text-xl font-ralewaySemiBold mb-4">
                            Tu experiencia es:
                        </Text>
                        <RadioButtonVerticalIconComponent
                            options={Object.values(FITNESS_LEVEL)}
                            icons={[
                                <Ionicons name="star-outline" size={35} color={"#fff"} />,
                                <Ionicons name="star-half-outline" size={35} color={"#fff"} />,
                                <Ionicons name="star" size={35} color={"#fff"} />,
                            ]}
                            selectedValue={selectedFitnessLevel}
                            setSelectedValue={setSelectedFitnessLevel}
                            rbComponentStyle="w-full flex flex-row"
                            rbIndividualRadioButtonStyle="items-center justify-center w-1/3"
                            rbIndividualTextBtnStyle="text-lg pb-2 font-ralewayExtraBold"
                        />
                    </View>
                </Animated.View>
                <View className="absolute bottom-0 left-0 right-0 bg-eBlue-600">
                    <CTAButtonPrimary
                        onPress={handleContinue}
                        text="Continuar"
                    />
                </View>
        </KeyboardAwareScrollView>
    );
};

export default Form04;
