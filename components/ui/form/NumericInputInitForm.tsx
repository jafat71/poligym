

import { useTheme } from '@/context/ThemeContext';
import { NumericInputForm } from '@/types/interfaces/ui';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import IconButton from '../buttons/IconButton';
import { Ionicons } from '@expo/vector-icons';

const NumericInputInitForm = (
    {
        title,
        icon,
        inputKeyboardType,
        inputOnChangeText,
        inputPlaceholder,
        inputValue = undefined,
        inputSecure = false,
        enabled = true,
        maxLength = 3,
        alert = false,
        alertMessage = "",
        subFn,
        addFn
    }: NumericInputForm
) => {
    const { isDark } = useTheme()
    const [focused, setFocused] = useState(false);

    return (
        <View className='flex flex-col items-start w-full max-w-md mx-auto' >
            <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>{title}</Text>
            <View
                className={`mt-2 border-[2px]  rounded-lg 
                    ${focused ? (isDark ? "border-blue-500" : "border-blue-500") :
                    isDark ? "border-darkGray-400 opacity-70" : "border-darkGray-500 opacity-70"
                    }`}
            >
                <View className="flex flex-row items-center justify-center w-full">
                    <View
                        className={`border-r-[1px] ${focused ? (isDark ? "border-blue-500" : "border-blue-500") :
                            isDark ? "border-darkGray-400" : "border-darkGray-500"
                            }`}
                    >
                        {icon}
                    </View>
                    <TextInput
                        className={`flex-1 p-2 
                            text-lg 
                            ${isDark ? "text-white" : "text-darkGray-500"}  
                            ${alert ? "bg-redEPN-300 text-white" : ""}
                            ml-2 font-ralewayBold`}
                        placeholder={inputPlaceholder}
                        keyboardType={inputKeyboardType}
                        placeholderTextColor="#a6a6a6"
                        defaultValue=''
                        value={inputValue}
                        onChangeText={inputOnChangeText}
                        secureTextEntry={inputSecure}
                        editable={enabled}
                        maxLength={maxLength}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                    />

                </View>
            </View>

        </View>
    );
};

export default NumericInputInitForm;
