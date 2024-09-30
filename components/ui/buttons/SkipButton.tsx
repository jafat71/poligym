

import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const SkipButton = () => {
    const {isDark} = useTheme();
    return (
        <TouchableOpacity
        className='mt-4'
            onPress={ ()=> {
                router.replace('/(root)/(tabs)/home')
            }}
        >
            <Text className={`${isDark ? "text-white" : "text-darkGray-500"}`}>OMITIR</Text>
        </TouchableOpacity>
    );
};

export default SkipButton;
