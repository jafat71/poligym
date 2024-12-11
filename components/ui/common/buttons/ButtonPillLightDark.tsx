import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    text: string;
    icon?: string;
    onPress?: () => void;
    disabled?: boolean;
}

const ButtonPill = ({ 
    text, 
    icon = 'pricetag',
    onPress,
    disabled
}: Props) => {
    const { isDark } = useTheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`px-3 py-2 rounded-sm mr-1 mb-1 flex flex-row items-center justify-center   
                bg-darkGray-900 border-2 border-lightGreen
            `}
            disabled={disabled}
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
                    text-xs capitalize ml-1
                `}
                numberOfLines={1}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
}

export default ButtonPill;
