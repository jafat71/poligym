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
        <>
            <Pressable
                onPress={onPress}
                className={`items-center justify-center overflow-hidden rounded-lg mb-2 w-full h-24`}>
                <LinearGradient
                    colors={[
                        'rgba(0,85,249,0.95)',
                        'rgba(0,85,249,0.8)',
                        'rgba(0,85,249,0.95)'
                    ]}
                    className="absolute w-full h-full"
                />
                <View className='absolute right-0  z-1 translate-x-4 '>
                    <Ionicons name={icon as any} size={94} color="#0085F9" />  
                </View>
                <View className='h-full flex flex-col items-center justify-center'>
                    <Ionicons name={icon as any} size={46} color={'white'} />
                    <Text className={`font-ralewayBold text-white text-sm text-center`}>
                        {text}
                    </Text>
                </View>
            </Pressable>
        
        </>
    );
}

export default CustomTab;
