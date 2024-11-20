import React, { useCallback, useEffect, useState } from 'react';
import { Modal, KeyboardAvoidingView, Platform, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/context/ThemeContext';
import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { medicalProblemsOptions, medicProblemMapper } from '@/constants';
import { MedicalProblem } from '@/types/interfaces/entities/user';
import RadioButtonIconComponent from '@/components/ui/common/buttons/RadioButtonIcon';
import IconButton from '@/components/ui/common/buttons/IconButton';

const Form03 = () => {
    const { isDark } = useTheme();
    const { tmpUser, updateInitUserShell } = useNavigationFlowContext();
    const [focused, setFocused] = useState(false);
    
    const [selectedMedicalProblem, setSelectedMedicalProblem] = useState<number>(0);
    const [medicalDetail, setMedicalDetail] = useState('');
    const [enableEdit, setEnableEdit] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputDetail, setInputDetail] = useState('');

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

    const validateDetailInputChange = useCallback(
        (newMedicalDetailInput: string) => {
            setMedicalDetail(newMedicalDetailInput);
            updateInitUserShell({
                ...tmpUser,
                userMedicalProblemDetail: newMedicalDetailInput,
            });
        },
        [],
    );

    useEffect(() => {
        let medicalProblemIndex = 0;
        if (tmpUser?.userHasMedicalProblems) {
            medicalProblemIndex = medicProblemMapper[tmpUser.userHasMedicalProblems];
        }
        setSelectedMedicalProblem(medicalProblemIndex);
        setMedicalDetail(tmpUser?.userMedicalProblemDetail || '');
    }, []);

    const handleOptionSelect = (option: string) => {
        if (option === 'NINGUNA') {
            validateDetailInputChange('');
            setSelectedMedicalProblem(0);
            setInputDetail(''); 
        } else {
            setSelectedMedicalProblem(option === 'LESION' ? 1 : 2);
        }
        setModalVisible(true); 
    };

    const handleSubmitDetails = () => {
        validateDetailInputChange(inputDetail); 
        setModalVisible(false); 
    };

    useEffect(() => {
        if (selectedMedicalProblem === 1 || selectedMedicalProblem === 2) {
            setModalVisible(true);
        }
    }, [selectedMedicalProblem]);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
            <View className={`mt-2 pb-5`}>
                <View>
                    <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"}`}>¿Tienes algún problema médico?</Text>
                    <View>
                        <RadioButtonIconComponent
                            options={medicalProblemsOptions}
                            icons={[
                                <Ionicons name="body-outline" size={35} color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                <Ionicons name="bandage-outline" size={35} color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                <Ionicons name="warning-outline" size={35} color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                            ]}
                            rbComponentStyle='w-full mt-1'
                            rbIndividualRadioButtonStyle='flex flex-col items-center justify-center'
                            rbIndividualTextBtnStyle={`text-lg p-2 font-ralewayExtraBold`}
                            selectedValue={selectedMedicalProblem}
                            setSelectedValue={setSelectedMedicalProblem} // Abre el modal al seleccionar
                        />

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <View className={`w-full max-w-md p-4
                                    border-2
                                    ${isDark ? "border-darkGray-400 bg-darkGray-900" : "border-gray-300 bg-darkGray-100"} rounded-lg`}>
                                    <View className='flex flex-row items-center justify-between my-2'>
                                        <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"}`}>Detalles de tu {selectedMedicalProblem === 1 ? 'lesión' : 'alergia'}</Text>
                                        <IconButton
                                            onPress={() => setModalVisible(false)}
                                            icon={<Ionicons name="close-outline" size={24} color={isDark ? "#fff" : "#1c1c1c"} />}
                                        />
                                    </View>
                                    <TextInput
                                        className={`
                h-40 border-[2px] border-b-[2px] ${focused ? "border-eBlue-500" : isDark ? "border-white" : "border-darkGray-500"}
                rounded-lg p-4 
                ${isDark ? "text-white" : "text-darkGray-500"} font-ralewayBold`}
                                        placeholder="Tengo una fractura en..."
                                        placeholderTextColor="#a6a6a6"
                                        keyboardType='ascii-capable'
                                        maxLength={200}
                                        multiline
                                        numberOfLines={5}
                                        value={inputDetail}
                                        onChangeText={setInputDetail}
                                        editable={enableEdit}
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                    />
                                    <View className='flex flex-row items-center justify-end py-2'>
                                        <IconButton
                                            onPress={handleSubmitDetails}
                                            icon={<Ionicons name="save-outline" size={24} color={isDark ? "#fff" : "#1c1c1c"} />}
                                        />
                                    </View>
                                </View>
                            </View>
                        </Modal>

                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Form03;