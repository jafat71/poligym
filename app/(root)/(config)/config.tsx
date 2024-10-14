
import AboutModal from '@/components/ui/modal/AboutModal';
import FaqModal from '@/components/ui/modal/FaqModal';
import TermsModal from '@/components/ui/modal/TermsModal';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';

const Config = () => {
    const { isDark } = useTheme()
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

    const textStyle = `text-lg ml-2  font-raleway ${isDark ? "text-white" : "text-darkGray-500"} `
    const itemStyle = 'justify-start w-full my-2'

    return (
        <SafeAreaView className={`flex flex-1 ${isDark ? "bg-darkGray-500" : "bg-white"} p-2 py-6`}>

            <View className='px-2'>
                <View className={`py-1 `}>
                    <View className='flex flex-row items-center '>
                        <TouchableOpacity
                            onPress={() => {
                                router.back()
                            }}
                        >
                            <Ionicons name="arrow-back" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                        </TouchableOpacity>
                        <Text className={`text-2xl ml-4 font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Configuración</Text>
                    </View>

                </View>

                <View className={`pb-5 }`}>
                    <TouchableOpacity
                        onPress={() => {
                            router.navigate('/(root)/(config)/updateinformation')
                        }}
                        className={itemStyle}
                    >
                        <Text className={textStyle}>Actualizar Información</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={itemStyle}
                        onPress={() => {
                            router.push('/(auth)/update')
                        }}
                    >
                        <Text className={textStyle}>Actualizar Contraseña</Text>
                    </TouchableOpacity>

                    <View className={itemStyle}>
                        <Text className={textStyle}>Notificaciones</Text>
                    </View>

                    <TouchableOpacity className={itemStyle}
                        onPress={toggleTermsModal}
                    >
                        <Text className={textStyle}>Términos y Condiciones</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className={itemStyle}
                        onPress={toggleFaqModal}
                    >
                        <Text className={textStyle}>FAQs</Text>
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
                        onPress={() => {
                            router.replace('/(auth)/signin')
                        }}
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
