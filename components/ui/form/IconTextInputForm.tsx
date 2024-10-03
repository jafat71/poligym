

import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';

interface Props {
    title: string;
    icon: ReactNode;
    inputPlaceholder: string;
    inputKeyboardType: KeyboardTypeOptions | undefined;
    inputValue: string;
    inputOnChangeText: ((text: string) => void) | undefined;
    inputSecure: boolean
}

const IconTextInputForm = (
    {
        title,
        icon,
        inputKeyboardType,
        inputOnChangeText,
        inputPlaceholder,
        inputValue,
        inputSecure,
    }: Props
) => {
    const { isDark } = useTheme()
    return (
        <View>
            <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>{title}</Text>
            <View className={`mt-2 border-[1px] border-${isDark ? "darkGray-400" : "darkGray-200"} rounded-lg text-white-100`}>

                <View className='flex flex-row items-center justify-center w-full'>
                    <View className={`border-r-[1px]  border-${isDark ? "darkGray-400" : "darkGray-200"}`}>
                        {icon}
                    </View>
                    <TextInput
                        className={`flex-1 p-2 rounded-lg shadow-lg pl-3 ${isDark ? "text-white" : "text-darkGray-500"}  ml-2 font-ralewayBold`}
                        placeholder={inputPlaceholder}
                        keyboardType={inputKeyboardType}
                        placeholderTextColor="#a6a6a6"
                        value={inputValue}
                        onChangeText={inputOnChangeText}
                        secureTextEntry={inputSecure}
                    />
                </View>

            </View>
        </View>
    );
};

export default IconTextInputForm;
