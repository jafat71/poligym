import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';

import { NumericInputForm } from '@/types/interfaces/ui';

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
    }: NumericInputForm
) => {
    const { isDark } = useTheme()
    const [focused, setFocused] = useState(false);

    return (
        <View className='flex flex-col items-start w-full max-w-md mx-auto' >
            <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>{title}</Text>
            <View className={`flex-row items-center p-1 border-2 mb-2 
                ${isDark ? "border-darkGray-400" : "border-gray-300" } 
                ${focused ? "border-eBlue-500" : ""} transition-all duration-800`}>
                <View className="flex flex-row items-center justify-center w-full">
                    <View>
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
