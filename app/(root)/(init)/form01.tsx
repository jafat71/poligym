
import NumericInputInitForm from '@/components/ui/common/form/NumericInputInitForm';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { transformToValidZInput } from '@/lib/utils/transform';
const Form01 = () => {
    const { isDark } = useTheme()
    const { tmpUser, updateInitUserShell } = useUser()

    const [ageINput, setAgeINput] = useState('');
    const [weightInput, setWeightINput] = useState('');
    const [heightInput, setHeightINput] = useState('');

    useEffect(() => {
        let userweight = tmpUser?.userWeight
        setWeightINput(String(userweight) || '')

        let userAge = tmpUser?.userAge
        setAgeINput(String(userAge) || '')

        let userHeight = tmpUser?.userHeight
        setHeightINput(String(userHeight) || '')
    }, []);

    const validateAgeInpuChange = useCallback(
        (newAgeInput: string) => {
            const validAge = transformToValidZInput(newAgeInput)
            setAgeINput(validAge.toString());
            updateInitUserShell({
                ...tmpUser,
                userAge: validAge ? validAge : 18
            })
        },
        [ageINput],
    )

    const validateWeightChange = useCallback(
        (newWeightInput: string) => {
            const validWeight = transformToValidZInput(newWeightInput)
            setWeightINput(validWeight.toString());
            updateInitUserShell({
                ...tmpUser,
                userWeight: validWeight
            })
        },
        [weightInput],
    )

    const validateHeightChange = useCallback(
        (newHeightInput: string) => {
            const validHeight = transformToValidZInput(newHeightInput)
            setHeightINput(validHeight.toString());
            updateInitUserShell({
                ...tmpUser,
                userHeight: validHeight
            })
        },
        [heightInput],
    )

    return (
        <>

            <View className={`mt-2 pb-5 `}>
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
                    />
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
                    />

                </View>

                <View className={`py-2`}>
                    <NumericInputInitForm
                        title='¿Cuál es tu altura? (CM)'
                        icon={<Ionicons name="resize-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                        inputKeyboardType='number-pad'
                        inputPlaceholder='170'
                        inputSecure={false}
                        inputValue={heightInput}
                        inputOnChangeText={validateHeightChange}
                    />
                </View>
            </View>

            <Text className={`text-sm font-ralewaySemiBold text-start  ${isDark ? "text-white" : "text-darkGray-400"} my-2 `}>
                POLIGYM APP utiliza kilogramos (kg) para el peso y centímetros (cm) para la altura. Por favor, introduce solo números enteros en estos campos. Esto nos ayuda a procesar tus datos de manera más rápida y eficiente, asegurando que la experiencia sea lo más fluida posible.
            </Text>
        </>
    );
};

export default Form01;
