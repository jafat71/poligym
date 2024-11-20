import React from 'react';
import { Pressable, Text, View, StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';

import { FloatingModalProps } from '@/types/interfaces/ui';

import { useTheme } from '@/context/ThemeContext';

import { termsContent } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import MainLogoCustomComponent from '../logo/mainLogo';
import CTAButtonPrimary from '../buttons/CtaButtonPrimary';

const TermsModal = ({
    modalVisible,
    toggleModal,
}: FloatingModalProps) => {
    const { isDark } = useTheme();

    return (
        <Modal
            isVisible={modalVisible}
            onBackdropPress={toggleModal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={300}
            animationOutTiming={600}
            backdropTransitionInTiming={300}
            backdropTransitionOutTiming={0}
            style={{ margin: 0 }}
        >
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
            
            <View className={`w-full h-full
                ${isDark ? "bg-darkGray-500 text-white" : "bg-white text-darkGray-500"} 
                py-2 px-4 rounded-sm items-start
                `}
            >
                <ScrollView>
                    <View className={`flex items-start justify-center `}>

                        <View className='w-full items-center justify-center'>
                            <MainLogoCustomComponent 
                                principal="#a6a6a6"
                                height='50'
                                width='50'
                            />
                        </View>
                        <View className='flex flex-row items-center justify-between w-full'>
                            <Text className={`text-4xl font-ralewayBold text-start
                ${isDark ? "text-white" : "text-darkGray-500"}`}>
                                Términos y Condiciones
                            </Text>

                            <View className='mr-2 border-2 border-darkGray-200 rounded-full p-2'>
                                <Ionicons name="document-outline" size={36} color={`${isDark ? "white" : "#a6a6a6"}`} />
                            </View>
                        </View>

                        <Text className={`text-sm font-raleway text-center
                ${isDark ? "text-white" : "text-darkGray-500"} mb-4`}>
                            Última actualización: 06/10/2024
                        </Text>

                        <Text className={`text-sm font-raleway min-w-full
                ${isDark ? "text-white" : "text-darkGray-500"} mb-2 text-justify`}>
                            Bienvenido a la aplicación POLIGYM. Esta aplicación ha sido diseñada para facilitar a los estudiantes,
                            profesores y personal administrativo de la Escuela Politécnica Nacional el acceso a los servicios del gimnasio de la universidad.
                            Al utilizar esta aplicación, aceptas los términos y condiciones que se detallan a continuación.
                            Si no estás de acuerdo con alguno de estos términos, te recomendamos que no utilices la aplicación.
                        </Text>

                        {termsContent.map((term, index) => (
                            <View key={index}>
                                <Text className={`text-xl font-ralewayBold min-w-full
                    ${isDark ? "text-white" : "text-darkGray-500"} mt-2 mb-2`}>
                                    {term.title}
                                </Text>
                                <Text className={`text-sm font-raleway min-w-full
                    ${isDark ? "text-white" : "text-darkGray-500"} mb-2 text-justify`}>
                                    {term.description}
                                </Text>
                            </View>
                        ))}


                    </View>
                </ScrollView>
                <CTAButtonPrimary
                    onPress={toggleModal}
                    text='Entendido'
                />
            </View>
        </Modal>
    );
};

export default TermsModal;
