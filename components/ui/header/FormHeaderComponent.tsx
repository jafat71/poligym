

import React from 'react';
import { Text, View } from 'react-native';
import MainLogoCustomComponent from '../logo/mainLogo';
import { useTheme } from '@/context/ThemeContext';
import { usePathname } from 'expo-router';

const FormHeaderComponent = () => {
    const { isDark } = useTheme()
    const pathname = usePathname();

    const getHeader = () => {
        switch (pathname) {
            case '/form06':
                return (
                    <>
                        <Text className={`text-4xl font-ralewayExtraBold text-white text-center`}>Estamos cerca de terminar</Text>
                    </>

                )
            case '/form07':
                return (
                    <>
                        <Text className={`text-4xl font-ralewayExtraBold text-white text-center`}>Completar perfil</Text>
                    </>
                )
            default:
                return (
                    <>
                        <Text className={`text-4xl font-ralewayExtraBold text-white text-center`}>Bienvenido</Text>
                        <Text className={`text-xl font-ralewayBold text-white text-center`}>Queremos saber más sobre ti...</Text>
                    </>
                )
        }
    }

    return (
        <View className='my-2 items-center'>
            <MainLogoCustomComponent
                height='50'
                width='50'
                principal={`${isDark ? "#0059FF" : "#fff"}`}
            />
            {getHeader()}

        </View>
    );
};

export default FormHeaderComponent;
