import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const RadioButton = ({ label, value, selected, onSelect }: any) => {
    const { isDark } = useTheme();
    return (
        <TouchableOpacity
            className={`transition-all duration-200 rounded-md bg-eBlue-800 mx-2 w-full mb-2 p-2 px-10 flex items-center ${selected ? "bg-lightGreen text-darkGray-500 scale-105 -translate-y-1" : ""}`}
            onPress={() => onSelect(value)}>
                <Text className={`text-center text-xl font-ralewayBold text-white  ${selected ? "text-darkGray-500" : ""} `}>{label}</Text>
        </TouchableOpacity>
    );
};


interface Props {
    options: string[]
}

const RadioButtonLargeComponent = ({ options = [] }: Props) => {
    const [selectedValue, setSelectedValue] = useState(null);
    return (
        <View className='flex flex-col items-center justify-center mt-4 px-4 '>
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

export default RadioButtonLargeComponent;
