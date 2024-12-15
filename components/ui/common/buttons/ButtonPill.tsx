import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    text: string;
    icon?: string;
    onPress?: () => void;
}

const ButtonPill = ({ 
    text, 
    icon = 'pricetag',
    onPress
}: Props) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`px-2 py-2 rounded-full mr-1 mb-1 flex flex-row items-center justify-center   
                bg-eBlue-600  border-2 border-lightGreen
            `}
        >
            <Ionicons
                name={icon as any}
                size={16}
                color={'#fff'}
            />

            <Text 
                className={`
                  text-white
                    font-ralewaySemiBold 
                    text-xs capitalize 
                `}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
}

export default ButtonPill;
