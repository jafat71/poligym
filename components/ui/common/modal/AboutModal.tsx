import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import MainLogoCustomComponent from '../logo/mainLogo';
import { useTheme } from '@/context/ThemeContext';
import { FloatingModalProps } from '@/types/interfaces/ui';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import CTAButtonPrimary from '../buttons/CtaButtonPrimary';

const AboutModal = ({
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
            <View className={`w-full h-full
                ${isDark ? "bg-darkGray-500 text-white" : "bg-white text-darkGray-500"} 
                py-2 px-4 rounded-sm items-start 
                `}
            >
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
                        Acerca de
                    </Text>

                    <View className='mr-2 border-2 border-darkGray-200 rounded-full p-2'>
                        <Ionicons name="information-sharp" size={36} color={`${isDark ? "white" : "#a6a6a6"}`} />
                    </View>
                </View>

                <View className='w-full items-center mb-2'>

                    <Text className={`text-4xl font-ralewaySemiBold text-center
                ${isDark ? "text-white" : "text-darkGray-500"} mt-2`}>
                        V0.0.0
                    </Text>

                    <Text className={`text-lg font-ralewaySemiBold text-center
                ${isDark ? "text-white" : "text-darkGray-500"} mt-2`}>
                        (C) POLIGYM Derechos Reservados
                    </Text>
                </View>

                <View className='flex-1 w-full items-end justify-end'>
                    <CTAButtonPrimary
                        onPress={toggleModal}
                        text='Entendido'
                />
                </View>
            </View>
        </Modal>
    );
};

export default AboutModal;
