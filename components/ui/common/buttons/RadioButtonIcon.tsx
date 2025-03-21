import { useTheme } from '@/context/ThemeContext';
import { RadioButtonComponentProps } from '@/types/interfaces/ui';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const RadioButton = ({ label, value, selected, onSelect, btnStyle, textStyle, icon }: any) => {
    const { isDark } = useTheme();
    const selectionColor = `border-2 border-eBlue-500 ${isDark ? "bg-eBlue-800 " : "bg-eBlue-100"}`
    return (
        <TouchableOpacity
            className={`transition-all duration-800 
                p-1 rounded-sm border-2 border-transparent mb-2
                ${btnStyle} 
                ${selected ? `${selectionColor} ` : ""}`}
            onPress={() => onSelect(value)}>
                {icon}
            <Text className={`${isDark ? " text-white " : "text-eBlue-500"} ${textStyle}`}>{label}</Text>
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
                        value={opt}
                        selected={selectedValue === opt}
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
