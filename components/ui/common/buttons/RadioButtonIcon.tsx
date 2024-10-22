import { useTheme } from '@/context/ThemeContext';
import { RadioButtonComponentProps } from '@/types/interfaces/ui';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const RadioButton = ({ label, value, selected, onSelect, btnStyle, textStyle, icon }: any) => {
    const { isDark } = useTheme();
    const selectionColor = `border-4 border-eBlue-500 border-eBlue-500 ${isDark ? "bg-eBlue-800 " : "bg-eBlue-100"}`
    return (
        <TouchableOpacity
            className={`transition-all duration-200 
                rounded-sm border-[1px]
                ${btnStyle} 
                ${isDark ? " border-darkGray-400" : "border-darkGray-500"} 
                ${selected ? `${selectionColor} ` : " opacity-70 "}`}
            onPress={() => onSelect(value)}>
            <View className='absolute w-full items-start'>
                {icon}
            </View>
            <Text className={`${isDark ? " text-white " : "text-eBlue-500"} ${textStyle} font-ralewayBold`}>{label}</Text>
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