

import RadioButtonSmallComponent from '@/components/ui/buttons/RadioButtonSmall';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, Text, useColorScheme, View } from 'react-native';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';

const Config = () => {
    const { isDark } = useTheme()
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const iconStyle = `rounded-full w-10 h-10 
    flex items-center justify-center mt-2
    border-[1px] ${isDark ? "border-darkGray-400 bg-white" : "bg-darkGray-200 border-darkGray-500"}`
    const textStyle = `text-lg ml-2  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `
    const textRedStyle = `text-lg ml-2  font-ralewayBold text-red-500 `
    const itemStyle = 'flex flex-row items-center justify-start w-full my-2'
    return (
        <SafeAreaView className={`flex flex-1
            border-[1px] ${isDark ? "border-darkGray-400" : "border-darkGray-500"}  rounded-sm
            ${isDark ? "bg-darkGray-500" : "bg-white"} `}>

            <View className='p-4'>
                <View className={`py-1 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
                    <View className='flex flex-row items-center justify-between'>
                        <TouchableOpacity
                            onPress={() => {
                                router.push('/(drawer)/(profile)/profile')
                            }}
                        >
                            <Ionicons name="arrow-back" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                        </TouchableOpacity>
                        <Text className={`text-2xl mr-2 font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Configuración</Text>
                    </View>

                </View>

                <View className={`pb-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
                    <TouchableOpacity
                        onPress={() => {
                            router.navigate('/(profile)/updateinformation')
                        }}
                        className={itemStyle}
                    >
                        <View className={iconStyle}>
                            <Ionicons name="person-sharp" size={24} color={`#1c1c1c`} />
                        </View>
                        <Text className={textStyle}>Actualizar Información</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={itemStyle}
                        onPress={() => {
                            router.push('/(auth)/update')
                        }}
                    >
                        <View className={iconStyle}>
                            <Ionicons name="shield-checkmark-outline" size={24} color={`#1c1c1c`} />
                        </View>
                        <Text className={textStyle}>Actualizar Contraseña</Text>
                    </TouchableOpacity>

                    <View className={itemStyle}>
                        <View className={iconStyle}>
                            <Ionicons name="alarm" size={24} color={`#1c1c1c`} />
                        </View>
                        <Text className={textStyle}>Notificaciones</Text>
                        <Switch
                            className='flex-1'
                            style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                            onValueChange={() => setNotificationEnabled(prevState => !prevState)}
                            value={notificationEnabled}
                            thumbColor={isDark ? "#fff" : "#16243E"}
                            trackColor={{ false: isDark ? "#ddds" : "#ddd", true: isDark ? "#fff" : "#16243E" }}
                            ios_backgroundColor={isDark ? "#333" : "#ddd"}
                        />
                    </View>

                    <TouchableOpacity className={itemStyle}>
                        <View className={iconStyle}>
                            <Ionicons name="document-sharp" size={24} color={`#1c1c1c`} />
                        </View>
                        <Text className={textStyle}>Términos y Condiciones</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className={itemStyle}>
                        <View className={iconStyle}>
                            <Ionicons name="documents" size={24} color={`#1c1c1c`} />
                        </View>
                        <Text className={textStyle}>FAQs</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className={itemStyle}>
                        <View className={iconStyle}>
                            <Ionicons name="text" size={24} color={`#1c1c1c`} />

                        </View>
                        <Text className={textStyle}>Acerca de</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className={itemStyle}
                    
                    onPress={() => {
                        router.push('/(auth)/delete')
                    }}
                    >

                        <View className={`rounded-full w-10 h-10 
                        flex items-center justify-center mt-2
                        border-[1px] bg-[#e11a1a]
                        ${isDark ? "border-darkGray-400" : " border-darkGray-500"}`}>
                            <Ionicons name="flash-off-sharp" size={24} color={`#fff`} />
                        </View>
                        <Text className={textRedStyle}>Eliminar Cuenta</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        className={itemStyle}
                        onPress={() => {
                            router.replace('/(auth)/signin')
                        }}
                    >
                        <View className={`rounded-full w-10 h-10 
                        flex items-center justify-center mt-2
                        border-[1px] bg-[#e11a1a]
                        ${isDark ? "border-darkGray-400" : " border-darkGray-500"}`}>
                            <Ionicons name="exit-outline" size={24} color={`#fff`} />
                        </View>
                        <Text className={textRedStyle}>Salir</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </SafeAreaView>
    );
};

export default Config;
