import { useTheme } from '@/context/ThemeContext';
import { NumericInputNotBtnsForm } from '@/types/interfaces/ui';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
const IconTextInputForm = ({
    inputKeyboardType,
    inputOnChangeText,
    inputPlaceholder,
    inputValue = undefined,
    inputSecure = false,
    enabled = true,
}: NumericInputNotBtnsForm) => {
    const { isDark } = useTheme();
    const [focused, setFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(inputSecure);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    return (
        <>

        <View className={`flex-row justify-center w-full items-center my-1  border-2
            ${isDark ? "border-darkGray-500 " : "border-darkGray-300"}
            ${focused ? "border-eBlue-500" : ""}
        `}>
                <TextInput
                    className={`p-3 flex-1 w-full font-ralewaySemiBold 
                        ${isDark ? "text-white" : "text-darkGray-500"}
                    `}
                    placeholder={inputPlaceholder}
                    placeholderTextColor={isDark ? "#b1b1b1" : "#a6a6a6"}
                    value={inputValue}
                    onChangeText={inputOnChangeText}
                    secureTextEntry={isPasswordVisible}
                    editable={enabled}
                    keyboardType={inputKeyboardType}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                {
                    inputSecure && (
                        <TouchableOpacity 
                        className='px-1'
                        onPress={togglePasswordVisibility}>
                            <Ionicons name={`${isPasswordVisible ? "eye-off" : "eye"}`} size={24} color="#a6a6a6" />
                        </TouchableOpacity>
                    )
                }
            </View>
        </>
    );
};

export default IconTextInputForm;
