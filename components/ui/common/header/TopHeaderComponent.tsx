import React from 'react';
import { Pressable, View } from 'react-native';

import { router} from 'expo-router';
import { useSegments } from 'expo-router';

import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import MainLogoCustomComponent from '../logo/mainLogo';

const TopHeaderComponent = () => {
    const { isDark } = useTheme()
    const segments = useSegments(); 

    return (
        <View className='w-full flex flex-row justify-between items-center mb-4'>
            <View className='w-full items-center'>
                <MainLogoCustomComponent width='40' height='40' principal={`${isDark ? "#fff" : "#1c1c1c"}`} />
            </View>
            <View className='absolute px-2'>
                <Pressable
                    onPress={() => { 
                        const currentRoute = segments[segments.length - 1];
                        if (currentRoute === 'update') {
                            router.back(); 
                        } else {
                            router.replace('/welcome');
                        }
                    }}
                >
                    <Ionicons name="close-sharp" size={24} color={isDark ? "#fff" : "#1c1c1c"} />

                </Pressable>
            </View>

        </View>
    );
};

export default TopHeaderComponent;
