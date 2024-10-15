import { useTheme } from '@/context/ThemeContext';
import { NumericInputNotBtnsForm } from '@/types/interfaces/ui';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const IconTextInputForm = ({
    title,
    icon,
    inputKeyboardType,
    inputOnChangeText,
    inputPlaceholder,
    inputValue = undefined,
    inputSecure = false,
    enabled = true,
}: NumericInputNotBtnsForm) => {
    const { isDark } = useTheme();
    const [focused, setFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPasswordInput = inputKeyboardType === 'visible-password' || inputSecure;

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    return (
        <View>
            <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"}`}>
                {title}
            </Text>
            <View
                className={`mt-2 border-[2px] rounded-lg ${focused ? (isDark ? "border-blue-500" : "border-blue-500") :
                    isDark ? "border-darkGray-400 opacity-70" : "border-darkGray-500"
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
                        className={`flex-1 p-2 rounded-lg shadow-lg pl-3 ${isDark ? "text-white" : "text-darkGray-500"}
                        ml-2 font-ralewayBold`}
                        placeholder={inputPlaceholder}
                        keyboardType={inputKeyboardType}
                        placeholderTextColor="#a6a6a6"
                        value={inputValue}
                        onChangeText={inputOnChangeText}
                        secureTextEntry={isPasswordVisible ? false : inputSecure}
                        editable={enabled}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                    />
                    {isPasswordInput && (
                        <TouchableOpacity onPress={togglePasswordVisibility} className='p-2'>
                            <Ionicons name={`${isPasswordVisible ? "eye-off" : "eye"}`} size={24} color="#a6a6a6" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

export default IconTextInputForm;
