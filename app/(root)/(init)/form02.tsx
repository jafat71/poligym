import NumericInputInitForm from '@/components/ui/form/NumericInputInitForm';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import transformToValidZInput from '@/utils/transformToValidZInput';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const Form02 = () => {
    const { isDark } = useTheme()
    const { tmpUser, set1InitUser } = useUser()
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

            <View className={`py-5 border-y-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>

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

            <View className={`py-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
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

            <View className={`${isDark ? "bg-blue-300" : "bg-blueEPN-500"} rounded-sm items-center py-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
                <Text className={`text-sm text-center  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `}>Por favor, considera medidas sin decimales</Text>
            </View>
        </>
    );
};

export default Form02;
