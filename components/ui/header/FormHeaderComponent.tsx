

import React from 'react';
import { Text, View } from 'react-native';
import MainLogoCustomComponent from '../logo/mainLogo';
import { useTheme } from '@/context/ThemeContext';

const FormHeaderComponent = () => {
    const { isDark } = useTheme()

    return (
        <View className='my-4 items-center'>
                <MainLogoCustomComponent
                    height='50'
                    width='50'
                    principal={`${isDark ? "#0059FF" : "#1c1c1c"}`}
                />
                <Text className={`text-4xl font-ralewayExtraBold ${isDark ? "text-white" : "text-darkGray-500"} text-center`}>Bienvenido</Text>
                <Text className={`text-sxl font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} text-center`}>Queremos saber más sobre ti...</Text>
            </View>
    );
};

export default FormHeaderComponent;
