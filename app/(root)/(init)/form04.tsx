import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/context/ThemeContext';
import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { medicalProblemsOptions, medicProblemMapper } from '@/constants';
import { MedicalProblem } from '@/types/interfaces/entities/user';
import { router } from 'expo-router';
import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import RadioButtonVerticalIconComponent from '@/components/ui/common/buttons/RadioButtonVerticalIcon';
import { Animated } from 'react-native';

const Form04 = () => {
    const { isDark } = useTheme();
    const { tmpUser, updateInitUserShell } = useNavigationFlowContext();

    const [selectedMedicalProblem, setSelectedMedicalProblem] = useState<number>(0);
    const [medicalDetail, setMedicalDetail] = useState<string>(tmpUser?.userMedicalProblemDetail ? tmpUser.userMedicalProblemDetail : '');
    const [enableEdit, setEnableEdit] = useState(false);

    const translateY = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (selectedMedicalProblem === null) return;
        let tmpUserMedicalProblem: MedicalProblem = 'NINGUNA';
        switch (selectedMedicalProblem) {
            case 0:
                tmpUserMedicalProblem = 'NINGUNA';
                setEnableEdit(false);
                break;
            case 1:
                tmpUserMedicalProblem = 'LESION';
                setEnableEdit(true);
                break;
            case 2:
                tmpUserMedicalProblem = 'ALERGIA';
                setEnableEdit(true);
                break;
            default:
                break;
        }
        updateInitUserShell({
            ...tmpUser,
            userHasMedicalProblems: tmpUserMedicalProblem,
        });
    }, [selectedMedicalProblem]);

    useEffect(() => {
        let medicalProblemIndex = 0;
        if (tmpUser?.userHasMedicalProblems) {
            medicalProblemIndex = medicProblemMapper[tmpUser.userHasMedicalProblems];
        }
        setSelectedMedicalProblem(medicalProblemIndex);
    }, []);

    useEffect(() => {
        if (selectedMedicalProblem === 1 || selectedMedicalProblem === 2) {
            setEnableEdit(true);
        } else {
            setEnableEdit(false);
        }
    }, [selectedMedicalProblem]);

    const handleContinue = () => {
        if (selectedMedicalProblem === 0) {
            setMedicalDetail('')
        }

        updateInitUserShell({
            ...tmpUser,
            userMedicalProblemDetail: medicalDetail
        })
        router.push('/form05')
    }

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: enableEdit ? -100 : 0, // Ajusta este valor según necesites
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: enableEdit ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    }, [enableEdit]);

    return (
        <View className="flex-1 w-full flex flex-col items-center justify-between">
            <Text className="text-white text-4xl font-ralewayExtraBold">
                Cuéntanos de ti
            </Text>
            <View className="">
                <Animated.View
                    className={`mt-2`}
                    style={{
                        transform: [{ translateY }]
                    }}
                >
                    <View className={`mt-2 `}>
                        <Text className="text-white text-center text-xl font-ralewaySemiBold mb-4">
                            ¿Tienes algún problema médico?
                        </Text>
                        <View>
                            <RadioButtonVerticalIconComponent
                                options={medicalProblemsOptions}
                                icons={[
                                    <Ionicons name="body-outline" size={35} color={`#fff`} />,
                                    <Ionicons name="bandage-outline" size={35} color={`#fff`} />,
                                    <Ionicons name="warning-outline" size={35} color={`#fff`} />,
                                ]}
                                rbComponentStyle='w-full flex flex-row'
                                rbIndividualRadioButtonStyle='items-center justify-center w-1/3'
                                rbIndividualTextBtnStyle='text-lg pb-2 font-ralewayExtraBold'
                                selectedValue={selectedMedicalProblem}
                                setSelectedValue={setSelectedMedicalProblem} // Abre el modal al seleccionar
                            />
                        </View>
                    </View>
                </Animated.View>

                {
                    enableEdit && (
                        <Animated.View
                            className='px-4 w-full '
                            style={{
                                opacity,
                                transform: [{
                                    translateY: opacity.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [50, 0]
                                    }),
                                }]
                            }}
                        >
                            <View className='px-4 w-full -translate-y-24'>
                                <View className='w-full flex flex-row items-center justify-start mb-2'>
                                    <Ionicons name="pencil-outline" size={24} color={"#fff"} />
                                    <Text className='text-white text-center text-xl font-ralewaySemiBold'>
                                        Detalle del problema médico
                                    </Text>
                                </View>
                                <TextInput
                                    className="h-44 text-white
                                    font-ralewaySemiBold w-auto break-words
                                    border-2 border-white    rounded-md p-2"
                                    value={medicalDetail}
                                    multiline={true}
                                    onChangeText={setMedicalDetail}
                                    numberOfLines={6}
                                    placeholder='Tengo un problema de...'
                                    placeholderTextColor="#c3c3c3"
                                />

                            </View>
                        </Animated.View>

                    )
                }
            </View>

            <View className='w-full'>
                <CTAButtonPrimary
                    onPress={handleContinue}
                    text="Continuar"
                />
            </View>
        </View>
    );
};

export default Form04;