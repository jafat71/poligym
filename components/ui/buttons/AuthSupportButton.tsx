

import { useTheme } from '@/context/ThemeContext';
import { Href, router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    title: string;
    route: Href<string | object>,
}

const AuthSupportButton = ({ title, route }: Props) => {
    const { isDark } = useTheme()
    return (
        <View className='w-full items-end justify-end'>
            <TouchableOpacity
                className='mt-1'
                onPress={() => {
                    router.push(route)
                }}
            >
                <Text className={`font-raleway text-xl ${isDark ? "text-white" : "text-darkGray-100"} `}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AuthSupportButton;
