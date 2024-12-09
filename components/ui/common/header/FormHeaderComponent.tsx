import React, { useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import MainLogoCustomComponent from '../logo/mainLogo';

import SkipButton from '../buttons/SkipButton';
import SimpleInfoComponent from '../info/SimpleInfoComponent';
import TermsModal from '../modal/TermsModal';

const FormHeaderComponent = () => {
    const [infoVisible, setInfoVisible] = useState(false);
    const [termsVisible, setTermsVisible] = useState(false);

    const toggleInfoModal = () => {
        setInfoVisible(!infoVisible);
    };

    const toggleTermsModal = () => {
        setTermsVisible(!termsVisible);
    };

    return (
        <>
            <View className='flex flex-row justify-between items-center'>
                <TouchableOpacity 
                    onPress={() => toggleInfoModal()}
                    className='absolute w-full items-start my-4 px-4'
                >
                    <Ionicons name="help-circle-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <View className='w-full items-center'>
                    <MainLogoCustomComponent width='40' height='40' principal={`#ff5722`} />
                </View>
                <View className='absolute w-full items-end my-4 px-4'>
                    <SkipButton />
                </View>

            </View>

            <SimpleInfoComponent
                text="La información que nos proporciones nos permite personalizar tu experiencia en POLIGYM APP"
                pressable={
                    <Pressable
                        className='mt-2 '
                        onPress={toggleTermsModal}
                    >
                        <Text className={`text-eOrange-500 font-ralewaySemiBold`}>Más información sobre el uso de mis datos</Text>
                    </Pressable>
                }
                modalVisible={infoVisible}
                toggleModal={toggleInfoModal}
            />

            <TermsModal
                modalVisible={termsVisible}
                toggleModal={toggleTermsModal}
            />
        </>
    );
};

export default FormHeaderComponent;
