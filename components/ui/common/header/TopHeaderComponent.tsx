

import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import MainLogoCustomComponent from '../logo/mainLogo';
import { Ionicons } from '@expo/vector-icons';
import { router} from 'expo-router';
import { useRouter, useSegments } from 'expo-router';

const TopHeaderComponent = () => {
    const { isDark } = useTheme()
    const segments = useSegments(); 

    return (
        <View className='w-full flex flex-row justify-between items-center mb-4'>
            <View className='w-full items-center'>
                <MainLogoCustomComponent width='40' height='40' principal={`${isDark ? "#fff" : "#1c1c1c"}`} />
            </View>
            <View className='absolute '>
                <Pressable
                    onPress={() => { 
                        const currentRoute = segments[segments.length - 1];
                        if (currentRoute === 'delete' || currentRoute === 'update') {
                            router.back(); 
                        } else {
                            router.replace('/welcome'); 
                        }
                    }}
                >
                    <Ionicons name="arrow-back" size={24} color={isDark ? "#fff" : "#1c1c1c"} />

                </Pressable>
            </View>

        </View>
    );
};

export default TopHeaderComponent;
