import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import NumericInputInitForm from '@/components/ui/form/NumericInputInitForm';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Experience, Objetive } from '@/types/interfaces/entities/user';
import transformToValidZInput from '@/utils/transformToValidZInput';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
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
const experienceOptions = ['Principiante', 'Intermedio', 'Avanzado']


const Form02 = () => {
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
    


    const [heightInput, setHeightINput] = useState('');

    useEffect(() => {
        let userHeight = tmpUser?.userHeight
        setHeightINput(String(userHeight) || '')
    }, []);

    const validateHeightChange = useCallback(
        (newHeightInput: string) => {
            const validHeight = transformToValidZInput(newHeightInput)
            setHeightINput(validHeight.toString());
            set1InitUser({
                ...tmpUser,
                userHeight: validHeight
            })
        },
        [heightInput],
    )


    const AddHeight = () => {
        let newHeight = +heightInput
        newHeight += 1
        validateHeightChange(newHeight + "")
        setHeightINput("" + newHeight)
    }

    const SubHeight = () => {
        let newHeight = +heightInput
        newHeight -= 1
        validateHeightChange(newHeight + "")
        setHeightINput("" + Math.max(0, newHeight))
    }


    return (
        <>
            <View className={`py-2`}>
                <NumericInputInitForm
                    title='¿Cuál es tu altura? (CM)'
                    icon={<Ionicons name="resize-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                    inputKeyboardType='number-pad'
                    inputPlaceholder='170'
                    inputSecure={false}
                    inputValue={heightInput}
                    inputOnChangeText={validateHeightChange}
                    subFn={SubHeight}
                    addFn={AddHeight} />

            </View>

            <View className={`py-2`}>
                <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Cuál es tu objetivo?</Text>
                <RadioButtonIconComponent
                    options={objetiveOptions}
                    icons={[
                        <Ionicons name="nutrition-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#fff"}`} />,
                            <Ionicons name="barbell-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#fff"}`} />,
                            <Ionicons name="fitness-sharp"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#fff"}`} />,
                        ]}
                    selectedValue={selectedObjetive}
                    setSelectedValue={setSelectedObjetive}
                    rbComponentStyle='w-full mt-2'
                    rbIndividualRadioButtonStyle='h-10 flex flex-col items-center justify-center mb-2'
                    rbIndividualTextBtnStyle={`text-base  font-ralewayBold `}
                />

            </View>
            <View className={`py-2`}>
                <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Cuál es tu experiencia?</Text>
                <RadioButtonIconComponent
                    options={experienceOptions}
                    icons={[
                        <Ionicons name="star-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#fff"}`} />,
                            <Ionicons name="star-half-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#fff"}`} />,
                            <Ionicons name="star"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#fff"}`} />,
                        ]}
                    selectedValue={selectedExperience}
                    setSelectedValue={setSelectedExperience}
                    rbComponentStyle='w-full mt-2'
                    rbIndividualRadioButtonStyle='h-10 flex flex-col items-center justify-center mb-2'
                    rbIndividualTextBtnStyle={`text-base  font-ralewayBold  `} 
                />

            </View>

        </>
    );
};

export default Form02;
