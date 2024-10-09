

import { useTheme } from '@/context/ThemeContext';
import {NumericInputNotBtnsForm } from '@/types/interfaces/ui';
import React, { ReactNode } from 'react';
import { Text, TextInput, View } from 'react-native';

const IconTextInputForm = (
    {
        title,
        icon,
        inputKeyboardType,
        inputOnChangeText,
        inputPlaceholder,
        inputValue =  undefined,
        inputSecure = false,
        enabled = true,
    }: NumericInputNotBtnsForm
) => {
    const { isDark } = useTheme()
    return (
        <View>
            <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>{title}</Text>
            <View className={`mt-2 border-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} rounded-lg text-white-100`}>

                <View className='flex flex-row items-center justify-center w-full'>
                    <View className={`border-r-[1px]  border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
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
                        editable={enabled}
                    />
                </View>

            </View>
        </View>
    );
};

export default IconTextInputForm;
