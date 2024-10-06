

import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';

interface Props {
    style?: string
}

const LightDarkButton = ({style = ""}:Props) => {
    const { toggleTheme, isDark } = useTheme()
    return (
        <View className={`${style}`}>
            <Pressable
                onPress={() => { toggleTheme() }}
            >
                <Ionicons name={isDark ? "sunny-outline" : "moon-outline"} size={24} color={isDark ? "#fff" : "#1c1c1c"} />

            </Pressable>
        </View>
    );
};

export default LightDarkButton;
