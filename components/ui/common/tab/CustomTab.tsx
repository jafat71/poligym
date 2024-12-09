import React from 'react';
import { Image, Pressable, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface CustomTabProps {
    text: string;
    icon: string;
    onPress: () => void;
}

const CustomTab = ({ text, icon, onPress}: CustomTabProps) => {
    const { isDark } = useTheme();
    return (
        <Pressable
            onPress={onPress}
            className={`flex-1 overflow-hidden items-center justify-center rounded-lg p-1 scale-105`}>
            <LinearGradient
                colors={[
                    'rgba(15,23,42,1)',
                    'rgba(15,23,42,0.95)',
                    'rgba(15,23,42,1)'
                ]}
                className="absolute w-full h-full"
            />
            <View className='h-full flex flex-col items-center justify-center'>
                <Ionicons name={icon as any} size={96} color={'white'} />
                <Text className={`font-ralewayBold text-white text-xl text-center`}
                >
                    {text}
                </Text>
            </View>
        </Pressable>
    );
}

export default CustomTab;
