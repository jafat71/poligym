

import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import MainLogoCustomComponent from '../logo/mainLogo';

const TopHeaderComponent = () => {
    const { isDark } = useTheme()

    return (
        <View className='w-full flex items-center my-8 '>
            <MainLogoCustomComponent width='50' height='50' principal={`${isDark ? "#fff" : "#1c1c1c"}`}/>
            <Text className={`font-ralewayExtraBold text-3xl ${isDark ? "text-white" : "text-darkGray-500"}`} >POLIGYM</Text>
        </View>
    );
};

export default TopHeaderComponent;
