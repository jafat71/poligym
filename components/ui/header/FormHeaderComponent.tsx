

import React from 'react';
import { Text, View } from 'react-native';
import MainLogoCustomComponent from '../logo/mainLogo';
import { useTheme } from '@/context/ThemeContext';
import { usePathname } from 'expo-router';
import LightDarkButton from '../buttons/LightDarkButton';
const steps = ['/form01', '/form02', '/form03', '/form04', '/form05', '/form06'];

const FormHeaderComponent = () => {
    const { isDark } = useTheme()
    const pathname = usePathname();
    const titleStyle = `text-4xl font-ralewayExtraBold ${isDark ? "text-white" : "text-darkGray-500"} text-center`
    const subtitleStyle = `text-xl font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} text-center`
    const currentIndex = steps.findIndex(step => step === pathname);

    const getHeader = () => {
        switch (pathname) {
            case '/form05':
                return (
                    <>
                        <Text className={titleStyle}>Estamos cerca de terminar</Text>
                    </>

                )
            case '/form06':
                return (
                    <>
                        <Text className={titleStyle}>Completar perfil</Text>
                    </>
                )
            default:
                return (
                    <>
                        <Text className={titleStyle}>Bienvenido</Text>
                        <Text className={subtitleStyle}>Queremos saber más sobre ti...</Text>
                    </>
                )
        }
    }

    return (
        <View className='w-full flex flex-col justify-center items-center mb-4'>
            <LightDarkButton style="w-full items-end px-4" />

            <MainLogoCustomComponent
                height='40'
                width='40'
                principal={`${isDark ? "#fff" : "#1c1c1c"}`}
            />

            {getHeader()}

            <View className='flex flex-row items-center justify-center gap-2 pt-2'>
            {steps.map((step, index) => (
                    <View
                        key={index}
                        className={`h-1 w-10 ${isDark ? (index <= currentIndex ? "bg-eBlue-300" : "bg-darkGray-500") : (index <= currentIndex ? "bg-eBlue-800" : "bg-darkGray-300")}`}
                    />
                ))}
            </View>
        </View>
    );
};

export default FormHeaderComponent;
