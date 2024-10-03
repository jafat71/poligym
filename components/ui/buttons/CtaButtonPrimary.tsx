
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { GestureResponderEvent, Text, TouchableHighlight, TouchableOpacity } from 'react-native';

interface Props {
    onPress: ((event: GestureResponderEvent) => void) | undefined,
    text: string,
}

const CTAButtonPrimary = ({ onPress, text}: Props) => {
    const {isDark} = useTheme()
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <Text className={`w-full rounded-xl text-lg text-center py-3 
                ${isDark ? " bg-white text-darkGray-500": "bg-darkGray-500 text-white"} 
                font-ralewayExtraBold`}>{text}</Text>
        </TouchableOpacity>
    );
};


export default CTAButtonPrimary;
