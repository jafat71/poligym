

import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import MainLogoCustomComponent from '../logo/mainLogo';
import LightDarkButton from '../buttons/LightDarkButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const TopHeaderComponent = () => {
    const { isDark } = useTheme()

    return (
        <View className='w-full flex flex-row justify-between items-center mb-4'>
            <View className='w-full items-center'>
                <MainLogoCustomComponent width='40' height='40' principal={`${isDark ? "#fff" : "#1c1c1c"}`} />
            </View>
            <View className='absolute '>
                <Pressable
                    onPress={() => { router.replace('/welcome') }}
                >
                    <Ionicons name="arrow-back" size={24} color={isDark ? "#fff" : "#1c1c1c"} />

                </Pressable>
            </View>

            <LightDarkButton style='absolute right-0'/>
        </View>
    );
};

export default TopHeaderComponent;
