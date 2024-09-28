

import React from 'react';
import { Text, View } from 'react-native';
import MainLogoGradientComponent from './mainLogoGrandient';
import { useTheme } from '@/context/ThemeContext';

const WelcomeHeaderComponent = () => {
    const { isDark } = useTheme()

    return (
        <View className='w-full flex items-center mt-3'>
            <MainLogoGradientComponent width='100' height='100' principal="#9320ff"
                secondary="#9320ff" />
            <Text className={`font-ralewayExtraBold text-5xl ${isDark ? "text-white-100" : "text-darkGray-500"}`} >POLIGYM</Text>
        </View>
    );
};

export default WelcomeHeaderComponent;
