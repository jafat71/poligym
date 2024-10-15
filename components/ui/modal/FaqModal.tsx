import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@/context/ThemeContext';
import { ScrollView } from 'react-native-gesture-handler';
import { FAQs } from '@/constants';
import { FloatingModalProps } from '@/types/interfaces/ui';

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
                p-2 rounded-sm items-start 
                `}
            >
                <ScrollView>
                    <View className={`flex items-start justify-center `}>
                        <Text className={`text-2xl font-ralewayBold text-center
                ${isDark ? "text-white" : "text-darkGray-500"}`}>
                            FAQ
                        </Text>

                        {FAQs.map((term, index) => (
                            <View key={index} className='w-full'>
                                <Text className={`text-2xl font-ralewayBold 
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
                    className={`mt-4 rounded-sm w-full p-2 bg-eBlue-500 my-2`}
                    onPress={toggleModal}
                >
                    <Text className={`text-base font-ralewayBold text-center text-white`}>
                        Entendido
                    </Text>
                </Pressable>
            </View>
        </Modal>
    );
};

export default FaqModal;
