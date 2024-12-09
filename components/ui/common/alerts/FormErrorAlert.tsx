import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

interface FormErrorAlertProps {
    errors: string[];
}

export const FormErrorAlert = ({ errors}: FormErrorAlertProps) => {
    const [visible, setVisible] = useState(true);
    const {isDark} = useTheme()

    useEffect(() => {
        if (errors.length === 0) {
            setVisible(false);
        } else {
            setVisible(true);
        }
    }, [errors]);


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
                                Atención
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Ionicons
                                name="close"
                                size={24}
                                color={"#ff5722"}
                            />
                        </TouchableOpacity>
                    </View>
                    <View className="my-4">
                        {errors.map((err, index) => (
                            <Text
                                key={index}
                                className={`text-sm font-ralewaySemiBold my-1 text-white`}
                            >
                                {err}
                            </Text>
                        ))}
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
    );
};

export default FormErrorAlert;
