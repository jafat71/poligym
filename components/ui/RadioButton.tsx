import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const RadioButton = ({ label, value, selected, onSelect }: any) => {
    const { isDark } = useTheme();
    return (
        <TouchableOpacity
            className={` bg-eBlue-500 mx-2 w-24 p-2 ${selected ? "bg-lightGreen text-darkGray-500 scale-110 -translate-y-1" : ""}`}
            onPress={() => onSelect(value)}>
                <Text className={`text-center text-xl font-ralewayBold text-white  ${selected ? "text-darkGray-500" : ""} `}>{label}</Text>
        </TouchableOpacity>
    );
};


interface Props {
    options: string[]
}

const RadioButtonComponent = ({ options = ["Hombre", "Mujer", "Trans"] }: Props) => {
    const [selectedValue, setSelectedValue] = useState(null);
    return (
        <View className='flex flex-row items-center justify-center mt-4'>
            {
                options.map((opt, i) => (
                    <RadioButton
                        label={opt}
                        value={i}
                        selected={selectedValue === i}
                        onSelect={setSelectedValue}
                        key={i}
                    />
                ))
            }

        </View>
    );
};

export default RadioButtonComponent;
