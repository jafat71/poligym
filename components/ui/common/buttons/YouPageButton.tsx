import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface YouPageButtonProps {
    onPress: () => void;
    title: string;
}

const YouPageButton = ({ onPress, title }: YouPageButtonProps) => {
    const { isDark } = useTheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            className='flex justify-center items-start w-full  p-4'>
            <Text className={`text-xl font-ralewayBold text-${isDark ? 'white' : 'darkGray-500'} ml-2`}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({})

export default YouPageButton;
