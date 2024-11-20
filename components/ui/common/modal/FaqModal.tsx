import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@/context/ThemeContext';
import { ScrollView } from 'react-native-gesture-handler';
import { FAQs } from '@/constants';
import { FloatingModalProps } from '@/types/interfaces/ui';
import MainLogoCustomComponent from '../logo/mainLogo';
import Ionicons from '@expo/vector-icons/Ionicons';
import CTAButtonPrimary from '../buttons/CtaButtonPrimary';

const FaqModal = ({
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
            style={{margin: 0}}

        >
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
                                Preguntas Frecuentes
                            </Text>

                            <View className='mr-2 border-2 border-darkGray-200 rounded-full p-2'>
                                <Ionicons name="help-circle" size={36} color={`${isDark ? "white" : "#a6a6a6"}`} />
                            </View>
                        </View>

                        {FAQs.map((term, index) => (
                            <View key={index} className='w-full'>
                                <Text className={`text-xl font-ralewayBold 
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
                <CTAButtonPrimary
                    onPress={toggleModal}
                    text='Entendido'
                />
            </View>
        </Modal>
    );
};

export default FaqModal;
