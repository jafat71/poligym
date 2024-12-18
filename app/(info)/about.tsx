import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const About = () => {
    return (
        <View className='p-4'>
            <View className='flex flex-col items-start justify-between w-full'>
                <Text className={`text-4xl font-ralewayBold text-start text-darkGray-500`}>
                    Acerca de
                </Text>
    
                <View className='w-full items-center mb-2'>

                    <Text className={`text-4xl font-ralewaySemiBold text-center text-darkGray-500 mt-2`}>
                        V0.0.0
                    </Text>

                    <Text className={`text-lg font-ralewaySemiBold text-center text-darkGray-500 mt-2`}>
                        (C) POLIGYM Derechos Reservados
                    </Text>

                    <Text className={`text-sm font-raleway text-center text-darkGray-900 mb-4`}>
                        Ultimo Release: 17/12/2024
                    </Text>

                    <Text className={`text-sm font-raleway text-center text-darkGray-900 mb-4`}>
                        Gimnasio - Escuela Politécnica Nacional
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default About;
