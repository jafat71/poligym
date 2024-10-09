

import { useTheme } from '@/context/ThemeContext';
import { NumericInputForm } from '@/types/interfaces/ui';
import React from 'react';
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
    return (
        <View className='flex flex-col items-center w-full max-w-md mx-auto' >
            <Text className={`text-xl  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>{title}</Text>
            <View className={`w-full mt-2 border-[1px] 
                border-${isDark ? "darkGray-400" : "darkGray-500"} rounded-lg 
                text-white-100`}>

                <View className='flex flex-row items-center '>
                    <View className={`border-r-[1px]  border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
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
                    />

                </View>
            </View>

            <View className='flex flex-row items-center justify-between my-2'>
                <IconButton
                    icon={<Ionicons name="remove" size={35} color={`${isDark ? "#1c1c1c" : "#fff"}`} />}
                    onPress={subFn}
                />
                <View className='flex-1 items-center'>
                {
                    alert &&
                    <Text className={`mt-1 font-ralewaySemiBold text-xs
                    ${isDark ? "text-white" : "text-darkGray-500"}
                `}>
                        {
                            alertMessage
                        }
                    </Text>
                }
                </View>
                
                <IconButton
                    icon={<Ionicons name="add" size={35} color={`${isDark ? "#1c1c1c" : "#fff"}`} />}
                    onPress={addFn}
                />
            </View>
        </View>
    );
};

export default NumericInputInitForm;
