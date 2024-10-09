import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Experience, Objetive } from '@/types/interfaces/entities/user';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const objetiveMapper: Record<Objetive, number> = {
    'BAJAR_DE_PESO': 0,
    'GANAR_MUSCULO': 1,
    'MANTENERSE_EN_FORMA': 2
}
const objetiveOptions = ['Bajar de Peso', 'Ganar Músculo', 'Mantenerse en forma']

const experienceMapper: Record<Experience, number> = {
    'PRINCIPIANTE': 0,
    'INTERMEDIO': 1,
    'AVANZADO': 2
}
const experienceOptions = ['Principiante', 'Intermedio', 'Avanazado']


const Form03 = () => {
    const { isDark } = useTheme()
    const { tmpUser, set1InitUser } = useUser()
    const [selectedObjetive, setSelectedObjetive] = useState<number>(0);
    const [selectedExperience, setSelectedExperience] = useState<number>(0);


    useEffect(() => {
        let objetiveIndex = 0
        if (tmpUser?.userObjetive) {
            objetiveIndex = objetiveMapper[tmpUser.userObjetive]
        }
        setSelectedObjetive(objetiveIndex)
    }, []);

    useEffect(() => {
        let experienceIndex = 0
        if (tmpUser?.userPhisicStatus) {
            experienceIndex = experienceMapper[tmpUser.userPhisicStatus]
        }
        setSelectedExperience(experienceIndex)
    }, []);

    useEffect(() => {
        if (selectedObjetive === null) return
        let tmpUserObjetive: Objetive = 'BAJAR_DE_PESO'
        switch (selectedObjetive) {
            case 0:
                tmpUserObjetive = 'BAJAR_DE_PESO'
                break;
            case 1:
                tmpUserObjetive = 'GANAR_MUSCULO'
                break;
            case 2:
                tmpUserObjetive = 'MANTENERSE_EN_FORMA'
                break;
            default:
                break;
        }
        set1InitUser({
            ...tmpUser,
            userObjetive: tmpUserObjetive
        })
    }, [selectedObjetive]);

    useEffect(() => {
        if (selectedExperience === null) return
        let tmpUserExp: Experience = 'PRINCIPIANTE'
        switch (selectedExperience) {
            case 0:
                tmpUserExp = 'PRINCIPIANTE'
                break;
            case 1:
                tmpUserExp = 'INTERMEDIO'
                break;
            case 2:
                tmpUserExp = 'AVANZADO'
                break;
            default:
                break;
        }
        set1InitUser({
            ...tmpUser,
            userPhisicStatus: tmpUserExp
        })
    }, [selectedExperience]);
    
    return (
        <>
            <View className={`py-5 border-y-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} flex flex-col items-center`}>
                <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Cuál es tu objetivo?</Text>
                <RadioButtonIconComponent
                    options={objetiveOptions}
                    icons={[
                        <Ionicons name="nutrition-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                        <Ionicons name="barbell-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                        <Ionicons name="fitness-sharp"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />
                    ]}
                    selectedValue={selectedObjetive}
                    setSelectedValue={setSelectedObjetive}
                    rbComponentStyle='w-full mt-2'
                    rbIndividualRadioButtonStyle='h-10 flex flex-col items-center justify-center mb-2'
                    rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `}
                />

            </View>
            <View className={`pt-5 flex flex-col items-center`}>
                <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Cuál es tu experiencia?</Text>
                <RadioButtonIconComponent
                    options={experienceOptions}
                    icons={[
                        <Ionicons name="star-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                        <Ionicons name="star-half-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                        <Ionicons name="star"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />
                    ]}
                    selectedValue={selectedExperience}
                    setSelectedValue={setSelectedExperience}
                    rbComponentStyle='w-full mt-2'
                    rbIndividualRadioButtonStyle='h-10 flex flex-col items-center justify-center mb-2'
                    rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `} 
                />

            </View>
        </>
    );
};

export default Form03;
