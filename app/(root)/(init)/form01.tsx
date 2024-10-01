
import RadioButtonComponent from '@/components/ui/buttons/RadioButton';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Form01 = () => {
    const { isDark } = useTheme()
    return (
        <>

            <View className='my-2 px-10'>
                <Text className={`text-2xl font-ralewayExtraBold text-white text-center`}>¿Cuántos años tienes?</Text>
                <TextInput
                    className={`text-center px-3 text-7xl mt-2  rounded-xl py-2  text-lightGreen ${isDark ? " bg-darkGray-800" : "bg-eBlue-400"}`}
                    placeholder='18'
                    placeholderTextColor={`${isDark ? "#acacac" : "#3385"}`}
                    keyboardType='number-pad'
                    maxLength={2}
                />

            </View>

            <View className='my-10'>
                <Text className={`text-2xl font-ralewayExtraBold text-white text-center`}>¿Cuál es tu género?</Text>
                <RadioButtonComponent
                    options={['Hombre', 'Mujer']}
                />
            </View>

        </>
    );
};

export default Form01;
