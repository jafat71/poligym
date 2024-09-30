

import CTAButtonPrimary from '@/components/ui/buttons/CtaButtonPrimary';
import FormHeaderComponent from '@/components/ui/header/FormHeaderComponent';
import RadioButtonComponent from '@/components/ui/buttons/RadioButton';
import SkipButton from '@/components/ui/buttons/SkipButton';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Form01 = () => {
    const { isDark } = useTheme()
    return (

        <SafeAreaView className={`p-2 pt-6 flex flex-1 flex-col justify-center items-center ${isDark ? "bg-darkGray-500" : "bg-white"}`}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >

                <FormHeaderComponent />

                <View className='flex-1 justify-center'>
                    <View className='my-10'>
                        <Text className={`text-2xl font-ralewayExtraBold ${isDark ? "text-white" : "text-darkGray-500"} text-center`}>¿Cuántos años tienes?</Text>
                        <TextInput
                            className={`text-center px-3 text-7xl mt-2  rounded-xl py-2 ${isDark ? "text-lightGreen bg-darkGray-800" : "bg-darkGray-300 text-eBlue-500"}`}
                            placeholder='18'
                            placeholderTextColor={`${isDark ? "#fff" : "#1c1c1c"}`}
                            keyboardType='numeric'
                            maxLength={2}
                        />

                    </View>

                    <View className='my-10'>
                        <Text className={`text-2xl font-ralewayExtraBold ${isDark ? "text-white" : "text-darkGray-500"} text-center`}>¿Cuál es tu género?</Text>
                        <RadioButtonComponent
                            options={["Hombre", "Mujer"]}
                        />

                    </View>
                </View>

                <View className="h-40 justify-center items-center text-center bottom-0">

                    <CTAButtonPrimary
                        route="/(init)/form02"
                        text="Continuar"
                    />

                    <SkipButton />

                </View>

            </ScrollView>

        </SafeAreaView>
    );
};

export default Form01;
