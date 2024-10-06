

import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import MainLogoCustomComponent from '../logo/mainLogo';
import LightDarkButton from '../buttons/LightDarkButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TopHeaderComponent = () => {
    const { isDark } = useTheme()

    return (
        <View className='w-full flex flex-row justify-between items-center mb-4'>
            <View className='w-full items-center'>
                <MainLogoCustomComponent width='40' height='40' principal={`${isDark ? "#fff" : "#1c1c1c"}`} />
                <Text className={`font-ralewayExtraBold text-2xl ${isDark ? "text-white" : "text-darkGray-500"}`} >POLIGYM</Text>
            </View>
            <LightDarkButton style="absolute " />
        </View>
    );
};

export default TopHeaderComponent;
