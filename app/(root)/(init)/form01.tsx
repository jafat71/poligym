

import CTAButtonPrimary from '@/components/ui/CtaButtonPrimary';
import CTAButtonSecondary from '@/components/ui/CtaButtonSecondary';
import MainLogoGradientComponent from '@/components/ui/mainLogoGrandient';
import RadioButtonComponent from '@/components/ui/RadioButton';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';

const Form01 = () => {
    const { isDark } = useTheme()
    return (
        <SafeAreaView className={`p-2 flex flex-1 flex-col justify-around ${isDark ? "bg-darkGray-500" : "bg-white"}`}>


            <View className='w-full items-center'>
                <MainLogoGradientComponent
                    height='50'
                    width='50'
                    principal={`${isDark ? "#0059FF" : "#1c1c1c"}`}
                    secondary={`${isDark ? "#0059FF" : "#1c1c1c"}`}
                />
            </View>

            <View>
                <Text className={`text-4xl font-ralewayExtraBold ${isDark ? "text-white" : "text-darkGray-500"} text-center`}>Bienvenido</Text>
                <Text className='text-sxl font-ralewayBold text-darkGray-500 text-center'>Queremos saber más sobre ti...</Text>
            </View>

            <View>
                <Text className={`text-2xl font-ralewayExtraBold ${isDark ? "text-white" : "text-darkGray-500"} text-center`}>¿Cuántos años tienes?</Text>
                <TextInput
                    className={`text-center px-3 text-8xl mt-2  rounded-xl py-2 ${isDark ? "text-lightGreen bg-darkGray-800" : "bg-darkGray-300 text-eBlue-500"}`}
                    placeholder='18'
                    placeholderTextColor={`${isDark ? "#fff" : "#1c1c1c"}`}
                    keyboardType='numeric'
                    maxLength={2}
                />

            </View>

            <View>
                <Text className={`text-2xl font-ralewayExtraBold ${isDark ? "text-white" : "text-darkGray-500"} text-center`}>¿Cuál es tu género?</Text>
                <RadioButtonComponent/>

            </View>


            <View className="flex-1 justify-around items-center text-center">

                <CTAButtonPrimary
                    route="/(auth)/signin"
                    text="Empezar ya!"
                />

            </View>
        </SafeAreaView>
    );
};

export default Form01;
