

import { useTheme } from '@/context/ThemeContext';
import React, { ReactNode } from 'react';
import { Text, TextInput, View } from 'react-native';
import RadioButtonComponent from '../buttons/RadioButton';
import { NumericInputForm, RadioButtonComponentProps } from '@/types/interfaces/ui';

interface Props extends NumericInputForm, RadioButtonComponentProps{}

const IconTextInputRadioButtonForm = (
    {
        title,
        icon,
        inputKeyboardType,
        inputOnChangeText,
        inputPlaceholder,
        inputValue =  undefined,
        inputSecure = false,
        enabled = true,
        options = [],   
        rbComponentStyle="",
        rbIndividualRadioButtonStyle="",
        rbIndividualTextBtnStyle="",
        alert = false
    }: Props
) => {
    const { isDark } = useTheme()
    return (
        <View>
            <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>{title}</Text>
            <View className={`mt-2 border-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} rounded-lg text-white-100`}>

                <View className='flex flex-row items-center justify-around w-full'>
                    <View className={`border-r-[1px]  border-${isDark ? "darkGray-400" : "darkGray-500"} 
                        flex flex-col items-center justify-center
                    `}>
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
                    <RadioButtonComponent
                        options={options}
                        rbComponentStyle={rbComponentStyle}
                        rbIndividualTextBtnStyle={rbIndividualTextBtnStyle}
                        rbIndividualRadioButtonStyle={rbIndividualRadioButtonStyle}
                    />
                </View>

            </View>
        </View>
    );
};

export default IconTextInputRadioButtonForm;
