import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const RadioButton = ({ label, value, selected, onSelect }: any) => {
    return (
        <TouchableOpacity
            className={`transition-all duration-200 rounded-md bg-eBlue-800 mx-3 w-14 p-1 flex items-center ${selected ? "bg-lightGreen text-darkGray-500 scale-110 -translate-y-1" : ""}`}
            onPress={() => onSelect(value)}>
                <Text className={`text-center text-xs font-ralewayBold text-white  ${selected ? "text-darkGray-500" : ""} `}>{label}</Text>
        </TouchableOpacity>
    );
};


interface Props {
    options: string[]
}

const RadioButtonSmallComponent = ({ options = [] }: Props) => {
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

export default RadioButtonSmallComponent;
