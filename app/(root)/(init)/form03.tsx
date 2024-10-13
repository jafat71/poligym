import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Experience, MedicalProblem, Objetive } from '@/types/interfaces/entities/user';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const medicProblemMapper: Record<MedicalProblem, number> = {
    'NINGUNA': 0,
    'LESION': 1,
    'ALERGIA': 2
}
const genresOptions = ['Ninguno', 'Lesión', 'Alergía']

const Form03 = () => {
    const { isDark } = useTheme()
    const { tmpUser, set1InitUser } = useUser()
    const [focused, setFocused] = useState(false);

    const [selectedMedicalProblem, setSelectedMedicalProblem] = useState<number>(0);
    const [medicalDetail, setMedicalDetail] = useState('');
    const [enableEdit, setenableEdit] = useState(false);

    useEffect(() => {
        if (selectedMedicalProblem === null) return
        let tmpUserMedicalProblem: MedicalProblem = 'NINGUNA'
        switch (selectedMedicalProblem) {
            case 0:
                tmpUserMedicalProblem = 'NINGUNA'
                setenableEdit(false)
                break;
            case 1:
                tmpUserMedicalProblem = 'LESION'
                setenableEdit(true)
                setMedicalDetail('')
                validateDetailInpuChange('')
                break;
            case 2:
                tmpUserMedicalProblem = 'ALERGIA'
                setenableEdit(true)
                setMedicalDetail('')
                break;
            default:
                break;
        }
        set1InitUser({
            ...tmpUser,
            userHasMedicalProblems: tmpUserMedicalProblem,
        })
    }, [selectedMedicalProblem]);

    const validateDetailInpuChange = useCallback(
        (newMedicalDetialInput: string) => {
            setMedicalDetail(newMedicalDetialInput);
            set1InitUser({
                ...tmpUser,
                userMedicalProblemDetail: newMedicalDetialInput
            })
        },
        [medicalDetail],
    )
    useEffect(() => {
        let madicalProblemIndex = 0
        if (tmpUser?.userHasMedicalProblems) {
            madicalProblemIndex = medicProblemMapper[tmpUser.userHasMedicalProblems]
        }
        setSelectedMedicalProblem(madicalProblemIndex)

        let userMedicalProblemDetail = tmpUser?.userMedicalProblemDetail!!
        setMedicalDetail(userMedicalProblemDetail)
    }, []);

    return (
        <>
            <View className={`py-2`}>

                <View className={`pb-5 `}>
                    <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Tienes algún problema médico?</Text>
                </View>

                <View className='mt-1'>
                    <RadioButtonIconComponent
                        options={genresOptions}
                        icons={[
                            <Ionicons name="body-outline"
                                size={35}
                                color={`${isDark ? "#1c1c1c" : "#fff"}`} />,
                            <Ionicons name="bandage-outline"
                                size={35}
                                color={`${isDark ? "#1c1c1c" : "#fff"}`} />,
                            <Ionicons name="warning-outline"
                                size={35}
                                color={`${isDark ? "#1c1c1c" : "#fff"}`} />,
                        ]}
                        rbComponentStyle='w-full '
                        rbIndividualRadioButtonStyle='h-10 flex flex-col items-center justify-center mb-2 '
                        rbIndividualTextBtnStyle={`text-base  font-ralewayBold `}
                        selectedValue={selectedMedicalProblem}
                        setSelectedValue={setSelectedMedicalProblem}
                    />

                    {
                        enableEdit && (
                            <>
                                <View className={` w-full items-start`}>
                                    <Text className={`text-lg mb-2  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>Cuéntanos un poco más...</Text>
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
                                    value={medicalDetail}
                                    onChangeText={validateDetailInpuChange}
                                    editable={enableEdit}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                />
                            </>
                        )
                    }


                </View>

            </View>
        </>
    );
};

export default Form03;
