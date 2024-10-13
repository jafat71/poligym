
import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import NumericInputInitForm from '@/components/ui/form/NumericInputInitForm';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Genre } from '../../../types/interfaces/entities/user';
import transformToValidZInput from '@/utils/transformToValidZInput';
import { genreMapper, genresOptions } from '@/constants';

const Form01 = () => {
    const { isDark } = useTheme()
    const { tmpUser, set1InitUser } = useUser()
    const [selectedGenre, setSelectedGenre] = useState<number>(0);
    const [ageINput, setAgeINput] = useState('');

    useEffect(() => {
        let genreIndex = 0
        if (tmpUser?.userGenre) {
            genreIndex = genreMapper[tmpUser.userGenre]
        }
        setSelectedGenre(genreIndex)

        let userAge = tmpUser?.userAge
        setAgeINput(String(userAge) || '')
    }, []);

    const validateAgeInpuChange = useCallback(
        (newAgeInput: string) => {
            const validAge = transformToValidZInput(newAgeInput)
            setAgeINput(validAge.toString());
            set1InitUser({
                ...tmpUser,
                userAge: validAge ? validAge : 18
            })
        },
        [ageINput],
    )

    useEffect(() => {
        if (selectedGenre === null) return
        let tmpUserGenre: Genre = 'MASCULINO'
        switch (selectedGenre) {
            case 0:
                tmpUserGenre = 'MASCULINO'
                break;
            case 1:
                tmpUserGenre = 'FEMENINO'
                break;
            case 2:
                tmpUserGenre = 'OTRO'
                break;
            default:
                break;
        }
        set1InitUser({
            ...tmpUser,
            userGenre: tmpUserGenre
        })
    }, [selectedGenre]);

    const AddAge = () => {
        let newAge = +ageINput
        newAge += 1
        validateAgeInpuChange(newAge + "")
        setAgeINput("" + newAge)
    }

    const SubAge = () => {
        let newAge = +ageINput
        newAge -= 1
        validateAgeInpuChange(newAge + "")
        setAgeINput("" + Math.max(0, newAge))
    }

    const [weightInput, setWeightINput] = useState('');

    useEffect(() => {
        let userweight = tmpUser?.userWeight
        setWeightINput(String(userweight) || '')
    }, []);

    const validateWeightChange = useCallback(
        (newWeightInput: string) => {
            const validWeight = transformToValidZInput(newWeightInput)
            setWeightINput(validWeight.toString());
            set1InitUser({
                ...tmpUser,
                userWeight: validWeight
            })
        },
        [weightInput],
    )

    const AddWeight = () => {
        let newWeight = +weightInput
        newWeight += 1
        validateWeightChange(newWeight + "")
        setWeightINput("" + newWeight)
    }

    const SubWeight = () => {
        let newWeight = +weightInput
        newWeight -= 1
        validateWeightChange(newWeight + "")
        setWeightINput("" + Math.max(0, newWeight))
    }

    return (
        <>
            <View className={`py-2`} >
                <NumericInputInitForm
                    title='¿Cuántos años tienes?'
                    icon={<Ionicons name="balloon-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                    inputKeyboardType='number-pad'
                    inputPlaceholder='0'
                    inputSecure={false}
                    inputValue={ageINput}
                    inputOnChangeText={validateAgeInpuChange}
                    maxLength={2}
                    addFn={AddAge}
                    subFn={SubAge}
                />
            </View>

            <View >
                <View className={`flex flex-col items-start`}>
                    <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Cuál es tu género?</Text>
                    <RadioButtonIconComponent
                        options={genresOptions}
                        icons={[
                            <Ionicons name="male"
                                size={35}
                                color={`${isDark ? "#1c1c1c" : "#fff"}`} />,
                            <Ionicons name="female"
                                size={35}
                                color={`${isDark ? "#1c1c1c" : "#fff"}`} />,
                            <Ionicons name="male-female"
                                size={35}
                                color={`${isDark ? "#1c1c1c" : "#fff"}`} />
                        ]}
                        selectedValue={selectedGenre}
                        setSelectedValue={setSelectedGenre}
                        rbComponentStyle='w-full mt-2'
                        rbIndividualRadioButtonStyle='h-10 p-1 flex flex-col items-center justify-center mb-2'
                        rbIndividualTextBtnStyle={`text-base  font-ralewayBold  `}
                    />

                </View>
            </View>

            <View className={`py-2`} >

                <NumericInputInitForm
                    title='¿Cuál es tu peso? (KG)'
                    icon={<Ionicons name="scale" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                    inputKeyboardType='number-pad'
                    inputPlaceholder='18'
                    inputSecure={false}
                    inputValue={weightInput}
                    maxLength={3}
                    inputOnChangeText={validateWeightChange}
                    subFn={SubWeight}
                    addFn={AddWeight} />

            </View>
        </>
    );
};

export default Form01;
