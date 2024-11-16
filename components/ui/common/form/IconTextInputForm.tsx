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
            <Text className={`text-sm font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} mb-2`}>
                {title}
            </Text>

            <View className={`flex-row items-center p-1 border-2 mb-2 ${
            isDark ? "border-darkGray-400" : "border-gray-300" 
        } ${focused ? "border-eBlue-500" : ""} transition-all duration-800`}>
                <View className="flex flex-row items-center justify-center w-full">
                    <View>
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
