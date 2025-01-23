import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { router } from 'expo-router';

import { deleteToken } from '@/lib/token/store';

import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';

import LightDarkButton from '@/components/ui/common/buttons/LightDarkButton';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/lib/api/auth';

const Config = () => {
    const { isDark } = useTheme()
    const { setAccessToken, accessToken } = useUser()

    const logoutMutation = useMutation({
        mutationFn: () => logout(accessToken!),
    });

    const handleSignOut = async () => {

        //TESTING: FUNCTIONALIDAD 
        // Alert.alert('Salir', '¿Estás seguro de querer salir de POLIGYM APP?', [
        //     { text: 'Cancelar', style: 'cancel' },
        //     { text: 'Salir', onPress: async () =>{ 
        //         router.replace('/welcome')
        //         await deleteToken('accessToken')
        //         await deleteToken('refreshToken')
        //         setAccessToken(null)
        //         logoutMutation.mutate()
        //     } 
        // }
        // ])

        router.replace('/welcome')
        await deleteToken('accessToken')
        await deleteToken('refreshToken')
        setAccessToken(null)
        logoutMutation.mutate()
    }

    const textStyle = `text-lg ml-2  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `
    const subtextStyle = `text-sm ml-2  font-raleway ${isDark ? "text-white" : "text-darkGray-500"} `
    const titleStyle = `text-xs ml-2  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `
    const itemStyle = 'justify-start w-full my-2'

    return (
        <SafeAreaView className={`flex flex-1 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"} py-6`}>
            <View className='pr-2'>

                <View className={`pb-5`}>

                    <Text className={titleStyle}>Cuenta</Text>
                    <TouchableOpacity
                        onPress={() => {
                            router.navigate('/(root)/(config)/updateinformation')
                        }}
                        className={itemStyle}
                    >
                        <Text className={textStyle}>Actualizar Información</Text>
                        <Text className={subtextStyle}>Actualiza tu información para obtener los mejores resultados de nuestras recomendaciones personalizadas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={itemStyle}
                        onPress={() => {
                            router.push('/(auth)/update')
                        }}
                    >
                        <Text className={textStyle}>Actualizar Contraseña</Text>
                        <Text className={subtextStyle}>Actualiza tu contraseña cada cierto tiempo para incrementar la seguridad de tu cuenta</Text>
                    </TouchableOpacity>


                    <View className={itemStyle}>
                        <View className='flex flex-row items-center justify-between'>
                            <Text className={textStyle}>Aspecto</Text>
                            <LightDarkButton
                            />
                        </View>
                    </View>

                    <Text className={`${titleStyle} mt-2`}>Información</Text>

                    <TouchableOpacity className={itemStyle}
                        onPress={() => router.push('/(info)/terms')}
                    >
                        <Text className={textStyle}>Términos y Condiciones</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className={itemStyle}
                        onPress={() => router.push('/(info)/faq')}
                    >
                        <Text className={textStyle}>Preguntas Frecuentes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className={itemStyle}
                        onPress={() => router.push('/(info)/about')}
                    >
                        <Text className={textStyle}>Acerca de</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={itemStyle}
                        onPress={handleSignOut}
                    >
                        <Text className={textStyle}>Salir</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </SafeAreaView>
    );
};

export default Config;
