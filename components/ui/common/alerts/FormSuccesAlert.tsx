import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

interface FormSuccessAlertProps {
    message: string;
    title: string;
}

export const FormSuccessAlert = ({ message, title }: FormSuccessAlertProps) => {
    const { isDark } = useTheme();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (message === '') {
            setVisible(false);
        } else {
            setVisible(true);
        }
    }, [message]);


    return (
        <Modal
        transparent
        animationType="fade"
        visible={visible}
            onRequestClose={() => setVisible(false)}
        >
 <View className="flex-1 bg-black/50 justify-center items-center">
                <View
                    className={`w-full rounded-lg p-4 ${isDark ? 'bg-blueEPN-500' : 'bg-blueEPN-900'}`}
                    >
                    <View className="flex-row justify-between items-center border-b pb-3 border-gray-300">
                        <View className="flex-row items-center">
                            <Ionicons name="warning-outline" size={24} color="#ff5722" />
                            <Text
                                className={`ml-2 text-lg font-ralewaySemiBold text-white`}
                            >
                                {title}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Ionicons
                                name="close"
                                size={24}
                                color="#ff5722"
                            />
                        </TouchableOpacity>
                    </View>
                    <View className='p-2'>
                        <Text className={`text-white font-ralewayBold`}>{message}</Text>
                    </View>
                    <TouchableOpacity
                        className="bg-eOrange-500 py-4 rounded-sm mt-2"
                        onPress={() => setVisible(false)}
                    >
                        <Text className="text-white text-bases text-center font-ralewayBold">Entendido</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default FormSuccessAlert
