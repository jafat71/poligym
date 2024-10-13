import { useTheme } from '@/context/ThemeContext';
import { RadioButtonComponentProps } from '@/types/interfaces/ui';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const RadioButton = ({ label, value, selected, onSelect, btnStyle, textStyle, icon }: any) => {
    const { isDark } = useTheme();
    const selectionColor = 'bg-eBlue-500 border-2 border-eBlue-500' 
    return (
<TouchableOpacity
            className={`transition-all duration-200 
                rounded-md  
                ${btnStyle} 
                ${isDark ? "bg-white text-darkGray-500" : "bg-white "} 
                ${selected ? `${selectionColor} ` : "bg-eBlue-100"}`}
            onPress={() => onSelect(value)}>
            <View className='absolute w-full items-start'>
                {
                    icon
                }
            </View>
            <Text className={`text-center
                 ${selected ? "text-white" : ""}
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
