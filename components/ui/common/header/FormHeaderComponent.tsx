import React, { useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import MainLogoCustomComponent from '../logo/mainLogo';
import { useTheme } from '@/context/ThemeContext';
import SkipButton from '../buttons/SkipButton';
import TermsModal from '../modal/TermsModal';
import { Ionicons } from '@expo/vector-icons';
import SimpleInfoComponent from '../info/SimpleInfoComponent';

const FormHeaderComponent = () => {
    const { isDark } = useTheme();
    const [termsVisible, setTermsVisible] = useState(false);
    const toggleTermseModal = () => {
        setTermsVisible(!termsVisible);
    };

    return (
        <>
            <View className='flex flex-col justify-between items-center'>
                <View className='w-full items-center'>
                    <MainLogoCustomComponent width='40' height='40' principal={`${isDark ? "#fff" : "#1c1c1c"}`} />
                </View>
                <View className='absolute w-full items-end my-4'>
                    <SkipButton />
                </View>
                <Text className={`w-full items-start text-4xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>
                    Cuéntanos de ti
                </Text>
            </View>

            <SimpleInfoComponent
                text="La información que nos proporciones nos permite personalizar tu experiencia en POLIGYM APP"
                pressable={
                    <Pressable
                        className='mt-2 '
                        onPress={toggleTermseModal}
                    >
                        <Text className={`text-eBlue-500 font-ralewaySemiBold`}>Más información sobre el uso de mis datos</Text>
                    </Pressable>
                }
            />
            <TermsModal
                modalVisible={termsVisible}
                toggleModal={() => toggleTermseModal()}
            />
        </>
    );
};

export default FormHeaderComponent;
