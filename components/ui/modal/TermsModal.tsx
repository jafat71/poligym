import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import MainLogoCustomComponent from '../logo/mainLogo';
import { useTheme } from '@/context/ThemeContext';
import { ScrollView } from 'react-native-gesture-handler';
import { termsContent } from '@/constants';
import { FloatingModalProps } from '@/types/interfaces/ui';

const TermsModal = ({
    modalVisible,
    toggleModal,
}: FloatingModalProps) => {
    const { isDark } = useTheme();
    return (
        <Modal
            isVisible={modalVisible}
            onBackdropPress={toggleModal}
            animationIn="fadeIn" 
            animationOut="fadeOut" 
            animationInTiming={300} 
            animationOutTiming={600} 
            backdropTransitionInTiming={300} 
            backdropTransitionOutTiming={0}
            className='items-center'
        >
            <View className={`w-full
                ${isDark ? "bg-darkGray-500 text-white" : "bg-white text-darkGray-500"} 
                p-4 rounded-sm items-center my-28
                `}
            >
               <View className='mb-2'>
               <MainLogoCustomComponent
                    height='40'
                    width='40'
                    principal={`${isDark ? "#fff" : "#1c1c1c"}`}
                />
                </View> 
                
                <ScrollView>
                    <View className={`flex items-center justify-center rounded-sm p-4 border-[1px] 
                    ${isDark ? "border-white" : "border-darkGray-500"}`}>
                        <Text className={`text-xl font-ralewayBold text-center
                ${isDark ? "text-white" : "text-darkGray-500"}`}>
                            Términos y Condiciones
                        </Text>

                        <Text className={`text-lg font-ralewaySemiBold text-center
                ${isDark ? "text-white" : "text-darkGray-500"} mt-2`}>
                            POLIGYM
                        </Text>
                        <Text className={`text-sm font-ralewayLight text-center
                ${isDark ? "text-white" : "text-darkGray-500"} mb-4`}>
                            Última actualización: 06/10/2024
                        </Text>

                        <Text className={`text-sm font-ralewayLight 
                ${isDark ? "text-white" : "text-darkGray-500"} mb-2 text-justify`}>
                            Bienvenido a la aplicación POLIGYM. Esta aplicación ha sido diseñada para facilitar a los estudiantes, 
                            profesores y personal administrativo de la Escuela Politécnica Nacional el acceso a los servicios del gimnasio de la universidad. 
                            Al utilizar esta aplicación, aceptas los términos y condiciones que se detallan a continuación. 
                            Si no estás de acuerdo con alguno de estos términos, te recomendamos que no utilices la aplicación.
                        </Text>

                        {termsContent.map((term, index) => (
                            <View key={index}>
                                <Text className={`text-base font-ralewayBold 
                    ${isDark ? "text-white" : "text-darkGray-500"} mt-4 mb-2`}>
                                    {term.title}
                                </Text>
                                <Text className={`text-sm font-ralewayLight 
                    ${isDark ? "text-white" : "text-darkGray-500"} mb-2 text-justify`}>
                                    {term.description}
                                </Text>
                            </View>
                        ))}


                    </View>
                </ScrollView>
                <Pressable
                    className={`mt-4 rounded-sm w-full p-2 border-[1px]
                    ${isDark ? "border-white" : " border-darkGray-500"}`}
                    onPress={toggleModal}
                >
                    <Text className={`text-base font-ralewayBold text-center 
                    ${isDark ? "text-white" : "text-darkGray-500"}`}>
                        Entendido
                    </Text>
                </Pressable>
            </View>
        </Modal>
    );
};

export default TermsModal;
