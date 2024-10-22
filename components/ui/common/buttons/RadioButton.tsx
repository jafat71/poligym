import { useTheme } from '@/context/ThemeContext';
import { RadioButtonComponentProps } from '@/types/interfaces/ui';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const RadioButton = ({ label, value, selected, onSelect,btnStyle, textStyle }: any) => {
    const { isDark } = useTheme();
    const selectionColor = isDark ? 'bg-eBlue-200' : 'bg-eBlue-800'

    return (
        <TouchableOpacity
            className={`transition-all duration-200 
                rounded-md 
                ${btnStyle}
                ${isDark ? "bg-white text-darkGray-500": "bg-darkGray-500 text-white"} 
                ${selected ? `${selectionColor} ` : ""}`}
            onPress={() => onSelect(value)}>
                <Text className={`text-center
                    ${textStyle} font-ralewayBold`}>{label}</Text>
        </TouchableOpacity>
    );
};

const RadioButtonComponent = ({ 
    options = [],
    rbComponentStyle,
    rbIndividualRadioButtonStyle,
    rbIndividualTextBtnStyle,
    selectedValue,
    setSelectedValue,}: RadioButtonComponentProps) => {
    return (
        <View className={`${rbComponentStyle}`}>
            {
                options.map((opt, i) => (
                    <RadioButton
                        label={opt}
                        value={i}
                        selected={selectedValue === i}
                        onSelect={setSelectedValue}
                        key={i}
                        btnStyle={rbIndividualRadioButtonStyle}
                        textStyle={rbIndividualTextBtnStyle}
                    />
                ))
            }

        </View>
    );
};

export default RadioButtonComponent;
