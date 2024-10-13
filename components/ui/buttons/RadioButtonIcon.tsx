import { useTheme } from '@/context/ThemeContext';
import { RadioButtonComponentProps } from '@/types/interfaces/ui';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const RadioButton = ({ label, value, selected, onSelect, btnStyle, textStyle, icon }: any) => {
    const { isDark } = useTheme();
    const selectionColor = 'bg-eBlue-500 border-[1px] border-eBlue-500 opacity-75'
    return (
        <TouchableOpacity
            className={`transition-all duration-200 
                rounded-sm border-[1px]
                ${btnStyle} 
                ${isDark ? " border-white " : "border-darkGray-500"} 
                ${selected ? `${selectionColor} ` : ""}`}
            onPress={() => onSelect(value)}>
            <View className='absolute w-full items-start'>
                {
                    icon
                }
            </View>
            <Text className={`text-center
                 ${isDark ? " text-white " : "text-darkGray-500"} 
                    ${textStyle} font-ralewayBold`}>{label}</Text>
        </TouchableOpacity>
    );
};

interface RadioButtonIconComponentProps extends RadioButtonComponentProps {
    icons: React.ReactNode[]
}

const RadioButtonIconComponent = ({
    options = [],
    rbComponentStyle,
    rbIndividualRadioButtonStyle,
    rbIndividualTextBtnStyle,
    icons = [],
    selectedValue,
    setSelectedValue,
}: RadioButtonIconComponentProps) => {
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
                        icon={icons[i]}
                    />
                ))
            }

        </View>
    );
};

export default RadioButtonIconComponent;
