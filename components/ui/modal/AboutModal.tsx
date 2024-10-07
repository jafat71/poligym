import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import MainLogoCustomComponent from '../logo/mainLogo';
import { useTheme } from '@/context/ThemeContext';
import { ScrollView } from 'react-native-gesture-handler';
import { FAQs } from '@/constants';
import { FloatingModalProps } from '@/types/interfaces/ui';

const AboutModal = ({
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

                <View>
                    <Text className={`text-lg font-ralewaySemiBold text-center
                ${isDark ? "text-white" : "text-darkGray-500"} mt-2`}>
                        V0.0.0
                    </Text>
                    <Text className={`text-lg font-ralewaySemiBold text-center
                ${isDark ? "text-white" : "text-darkGray-500"} mt-2`}>
                        (C) POLIGYM Derechos Reservados
                    </Text>
                </View>
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

export default AboutModal;
