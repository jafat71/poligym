import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { MedicalProblem } from '@/types/interfaces/entities/user';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const medicProblemMapper: Record<MedicalProblem, number> = {
    'NINGUNA': 0,
    'LESION': 1,
    'ALERGIA': 2
}
const genresOptions = ['Ninguno', 'Lesión', 'Alergía']

const Form04 = () => {
    const { isDark } = useTheme()
    const { tmpUser, set1InitUser } = useUser()
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
        <View className={`py-5 border-y-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>

            <View className={`pb-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} w-full items-center`}>
                <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Tienes algún problema médico?</Text>
            </View>

            <View className='mt-1'>
                <RadioButtonIconComponent
                    options={genresOptions}
                    icons={[
                        <Ionicons name="body-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                        <Ionicons name="bandage-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                        <Ionicons name="warning-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />
                    ]}
                    rbComponentStyle='w-full '
                    rbIndividualRadioButtonStyle='h-12 flex flex-col items-center justify-center mb-2 '
                    rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `}
                    selectedValue={selectedMedicalProblem}
                    setSelectedValue={setSelectedMedicalProblem}
                />
                <View className={`py-5 border-t-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} w-full items-center`}>
                    <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>Cuéntanos un poco más...</Text>
                </View>
                <View className={`mt-2 border-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} rounded-lg text-white-100`}>
                    <TextInput
                        id="detail-area"
                        className={`flex-1 p-2 rounded-lg shadow-lg 
                                        pl-3 ${isDark ? "text-white" : "text-darkGray-500"}  
                                        ${enableEdit == false && `${isDark ? "bg-gray-800" : "bg-gray-300"}`}
                                        ml-2 font-ralewayBold`}
                        placeholder={`${enableEdit == false ? "" : "Tengo una fractura en..."}`}
                        placeholderTextColor="#a6a6a6"
                        keyboardType='ascii-capable'
                        maxLength={200}
                        multiline
                        numberOfLines={5}
                        value={medicalDetail}
                        onChangeText={validateDetailInpuChange}
                        editable={enableEdit}
                    />
                </View>

            </View>

        </View>
    );
};

export default Form04;
