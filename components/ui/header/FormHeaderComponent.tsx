

import React from 'react';
import { Text, View } from 'react-native';
import MainLogoCustomComponent from '../logo/mainLogo';
import { useTheme } from '@/context/ThemeContext';
import { usePathname } from 'expo-router';
import SkipButton from '../buttons/SkipButton';
const steps = ['/form01', '/form02', '/form03', '/form04', '/form05'];

const FormHeaderComponent = () => {
    const { isDark } = useTheme()
    const pathname = usePathname();
    const titleStyle = `text-3xl font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} text-start`
    const currentIndex = steps.findIndex(step => step === pathname);
    return (
        <View className='w-full px-2'>
            <View className='flex flex-col justify-between items-center mb-4'>
                <View className='w-full items-center'>
                    <MainLogoCustomComponent width='40' height='40' principal={`${isDark ? "#fff" : "#1c1c1c"}`} />
                </View>
                <View className='w-full items-end mb-4'>
                    <SkipButton />
                </View>
                <Text className={titleStyle}>Queremos saber de ti</Text>

            </View>


            <View className='flex flex-row items-center justify-between gap-2 pt-2 mb-2'>
                {steps.map((step, index) => (
                    <View
                        key={index}
                        className={`h-2 w-11 ${(index <= currentIndex ? "bg-eBlue-500" : `${isDark ? "bg-white" : "bg-darkGray-500"}`)}`}
                    />
                ))}
            </View>
        </View>
    );
};

export default FormHeaderComponent;
