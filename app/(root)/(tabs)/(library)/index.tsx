import CustomTab from '@/components/ui/common/tab/CustomTab';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';


const Index = () => {
    const { isDark } = useTheme();
    return (
        <View className={`flex flex-1 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`} >
            <View className='flex flex-row justify-center items-center px-4'>
                <Text className={`text-4xl font-ralewayBold 
                    ${isDark ? "text-white" : "text-darkGray-500"}`}>
                    Descubre todo lo que POLIGYM APP tiene para ti
                </Text>
            </View>

            <View className='my-4'>
                <CustomTab
                    text='Planes de Entrenamiento'
                    icon='calendar-outline'
                    onPress={() => {
                        router.push('/(root)/(tabs)/(library)/plan')
                    }}
                />
                <CustomTab
                    text='Rutinas'
                    icon='body-outline'
                    onPress={() => {
                        router.push('/(root)/(tabs)/(library)/routine')
                    }}
                />
                <CustomTab
                    text='Ejercicios'
                    icon='barbell-outline'
                    onPress={() => {
                        router.push('/(root)/(tabs)/(library)/exercise')
                    }} />
                <CustomTab
                    text='Planes de Alimentación'
                    icon='nutrition-outline'
                    onPress={() => {
                        router.push('/(root)/(tabs)/(library)/foodplan')
                    }}
                />
            </View>
        </View>
    );
}

export default Index;
