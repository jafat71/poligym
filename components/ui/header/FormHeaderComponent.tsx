

import React from 'react';
import { Text, View } from 'react-native';
import MainLogoCustomComponent from '../logo/mainLogo';
import { useTheme } from '@/context/ThemeContext';

const FormHeaderComponent = () => {
    const { isDark } = useTheme()

    return (
        <View className='my-2 items-center'>
                <MainLogoCustomComponent
                    height='50'
                    width='50'
                    principal={`${isDark ? "#0059FF" : "#fff"}`}
                />
                <Text className={`text-4xl font-ralewayExtraBold text-white text-center`}>Bienvenido</Text>
                <Text className={`text-sxl font-ralewayBold text-white text-center`}>Queremos saber más sobre ti...</Text>
            </View>
    );
};

export default FormHeaderComponent;
