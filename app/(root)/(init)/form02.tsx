import RadioButtonComponent from '@/components/ui/buttons/RadioButton';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Form02 = () => {
    const { isDark } = useTheme()

    return (
        <>
            <View className='my-2 px-10'>
                <Text className={`text-2xl font-ralewayExtraBold text-white text-center`}>¿Cuál es tu peso?</Text>
                <RadioButtonComponent
                    options={["Kgs", "Lbs"]}
                />
                <TextInput
                    className={`text-center px-3 text-7xl mt-2  rounded-xl py-2  text-lightGreen ${isDark ? " bg-darkGray-800" : "bg-eBlue-400"}`}
                    placeholder={'60'}
                    placeholderTextColor={`${isDark ? "#acacac" : "#3385"}`}
                    keyboardType='number-pad'
                    maxLength={3}
                />

            </View>

            <View className='my-2 px-10'>
                <Text className={`text-2xl font-ralewayExtraBold text-white text-center`}>¿Cuál es tu altura?</Text>
                <RadioButtonComponent
                    options={["Cms", "Pies"]}
                />
                <TextInput
                    className={`text-center px-3 text-7xl mt-2  rounded-xl py-2  text-lightGreen ${isDark ? " bg-darkGray-800" : "bg-eBlue-400"}`}
                    placeholder={'170'}
                    placeholderTextColor={`${isDark ? "#acacac" : "#3385"}`}
                    keyboardType='number-pad'
                    maxLength={3}
                    
                />

            </View>


        </>
    );
};

export default Form02;
