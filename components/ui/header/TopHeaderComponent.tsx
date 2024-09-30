

import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import MainLogoCustomComponent from '../logo/mainLogo';

const TopHeaderComponent = () => {
    const { isDark } = useTheme()

    return (
        <View className='w-full flex items-center mt-3'>
            <MainLogoCustomComponent width='100' height='100' principal={`${isDark ? "#0059FF" : "#1c1c1c"}`}/>
            <Text className={`font-ralewayExtraBold text-5xl ${isDark ? "text-white" : "text-darkGray-500"}`} >POLIGYM</Text>
        </View>
    );
};

export default TopHeaderComponent;
