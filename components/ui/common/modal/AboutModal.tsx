import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import MainLogoCustomComponent from '../logo/mainLogo';
import { useTheme } from '@/context/ThemeContext';
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
                p-2 rounded-sm items-start 
                `}
            >
                <Text className={`text-2xl font-ralewayBold text-center
                ${isDark ? "text-white" : "text-darkGray-500"}`}>
                    Acerca de
                </Text>
                <View className='w-full items-center mb-2'>
                    <MainLogoCustomComponent
                        height='40'
                        width='40'
                        principal={`${isDark ? "#fff" : "#1c1c1c"}`}
                    />
                    <Text className={`text-2xl font-ralewaySemiBold text-center
                ${isDark ? "text-white" : "text-darkGray-500"} mt-2`}>
                        V0.0.0
                    </Text>

                    <Text className={`text-lg font-ralewaySemiBold text-center
                ${isDark ? "text-white" : "text-darkGray-500"} mt-2`}>
                        (C) POLIGYM Derechos Reservados
                    </Text>
                </View>

                <View className='flex-1 w-full items-end justify-end'>
                    <Pressable
                        className={`mt-4 rounded-sm w-full p-2 bg-eBlue-500 my-2`}

                        onPress={toggleModal}
                    >
                        <Text className={`text-base font-ralewayBold text-center text-white`}>
                            Entendido
                        </Text>
                    </Pressable>
                </View>
            </View>

            <View>

            </View>
        </Modal>
    );
};

export default AboutModal;
