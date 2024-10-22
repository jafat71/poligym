
import LightDarkButton from '@/components/ui/common/buttons/LightDarkButton';
import AboutModal from '@/components/ui/common/modal/AboutModal';
import FaqModal from '@/components/ui/common/modal/FaqModal';
import TermsModal from '@/components/ui/common/modal/TermsModal';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { deleteToken } from '@/lib/token/store';
import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Config = () => {
    const { isDark } = useTheme()
    const { setAccessToken } = useUser()
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const [termsVisible, setTermsVisible] = useState(false);
    const [faqVisible, setFAQVisible] = useState(false);
    const [aboutVisible, setAboutVisible] = useState(false);

    const toggleTermsModal = () => {
        setTermsVisible(!termsVisible);
    };

    const toggleFaqModal = () => {
        setFAQVisible(!faqVisible);
    };

    const toggleAboutModal = () => {
        setAboutVisible(!aboutVisible);
    };

    const handleSignOut = async () => {
        await deleteToken('accessToken')
        await deleteToken('refreshToken')
        setAccessToken(null)
        router.replace('/(auth)/signin')
    }

    const textStyle = `text-lg ml-2  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `
    const subtextStyle = `text-sm ml-2  font-raleway ${isDark ? "text-white" : "text-darkGray-500"} `
    const titleStyle = `text-xs ml-2  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `
    const itemStyle = 'justify-start w-full my-2'

    return (
        <SafeAreaView className={`flex flex-1 ${isDark ? "bg-darkGray-500" : "bg-white"} py-6`}>
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

                    <Text className={`${titleStyle} mt-2`}>Preferencias</Text>

                    <View className={itemStyle}>
                        <View className='flex flex-row items-center justify-between'>
                            <Text className={textStyle}>Notificaciones</Text>
                            <Checkbox
                                className='w-6 h-6'
                                value={notificationEnabled}
                                onValueChange={() => setNotificationEnabled(!notificationEnabled)}
                                color={notificationEnabled ? '#0055f9' : isDark ? "#fff" : "#1c1c1c"}
                            />
                        </View>
                        <Text className={subtextStyle}>
                            Habilitar las notificaciones te permite recibir información clave y personalizada, como:
                            recordatorios de tus sesiones de entrenamiento,
                            consejos de bienestar y salud, entre otras.
                        </Text>

                    </View>

                    <View className={itemStyle}>
                        <View className='flex flex-row items-center justify-between'>
                            <Text className={textStyle}>Aspecto</Text>
                            <LightDarkButton
                            />
                        </View>
                    </View>

                    <Text className={`${titleStyle} mt-2`}>Información</Text>

                    <TouchableOpacity className={itemStyle}
                        onPress={toggleTermsModal}
                    >
                        <Text className={textStyle}>Términos y Condiciones</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className={itemStyle}
                        onPress={toggleFaqModal}
                    >
                        <Text className={textStyle}>Preguntas Frecuentes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className={itemStyle}
                        onPress={() => toggleAboutModal()}
                    >
                        <Text className={textStyle}>Acerca de</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className={itemStyle}

                        onPress={() => {
                            router.push('/(auth)/delete')
                        }}
                    >

                        <Text className={textStyle}>Eliminar Cuenta</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        className={itemStyle}
                        onPress={handleSignOut}
                    >
                        <Text className={textStyle}>Salir</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <TermsModal
                modalVisible={termsVisible}
                toggleModal={() => toggleTermsModal()}
            />

            <FaqModal
                modalVisible={faqVisible}
                toggleModal={() => toggleFaqModal()}
            />

            <AboutModal
                modalVisible={aboutVisible}
                toggleModal={() => toggleAboutModal()}
            />

        </SafeAreaView>
    );
};

export default Config;
