

import React from 'react';
import { KeyboardTypeOptions, Text, View } from 'react-native';
import RadioButtonComponent from '../../buttons/RadioButton';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme } from '@/context/ThemeContext';

interface Props {
    question: string;
    options: string[];
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number;
}
const InputRadioButtonQuestion = ({ question, options, placeholder ="", maxLength = 2, keyboardType = 'ascii-capable' }: Props) => {
    const { isDark } = useTheme()
    return (
        <View className='my-2 px-10'>
            <Text className={`text-2xl font-ralewayExtraBold text-white text-center`}>{question}</Text>
            <RadioButtonComponent
                options={options}
            />
            <TextInput
                className={`text-center px-3 text-7xl mt-2  rounded-xl py-2  text-lightGreen ${isDark ? " bg-darkGray-800" : "bg-eBlue-400"}`}
                placeholder={placeholder}
                placeholderTextColor={`${isDark ? "#acacac" : "#3385"}`}
                keyboardType={keyboardType}
                maxLength={maxLength}
            />

        </View>
    );
};

export default InputRadioButtonQuestion;
