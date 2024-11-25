import { RadioButtonComponentProps } from '@/types/interfaces/ui';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RadioButton = ({ label, value, selected, onSelect, btnStyle, textStyle, icon }: any) => {
    const selectionColor = `bg-eBlue-800`
    return (
        <TouchableOpacity
            className={`
                transition-all duration-800 
                p-1 rounded-sm  mb-2
                ${btnStyle}
                ${selected ? `${selectionColor} ` : ""}`}
            onPress={() => onSelect(value)}>
                {icon}
            <Text className={` text-white  ${textStyle}`}>{label}</Text>
        </TouchableOpacity>
    );
};

interface RadioButtonIconComponentProps extends RadioButtonComponentProps {
    icons: React.ReactNode[]
}

const RadioButtonVerticalIconComponent = ({
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

export default RadioButtonVerticalIconComponent;
