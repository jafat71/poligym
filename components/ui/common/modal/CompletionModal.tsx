import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

interface CompletionModalProps {
    visible: boolean;
    onClose: () => void;
    onShare: () => void;
    onRate: (rating: number) => void;
}

const CompletionModal = ({ visible, onClose, onShare, onRate }: CompletionModalProps) => {
    if(!visible) return null;
    if(!onClose) return null;
    if(!onShare) return null;
    if(!onRate) return null;
    const { isDark } = useTheme();
    const [rating, setRating] = useState(0);
    const handleRate = (rate: number) => {
        setRating(rate);
        onRate(rate);
    };
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className='flex-1 justify-center items-center bg-black/50'>
                <View className='bg-eBlue-500 rounded-lg p-4 w-11/12'>

                    <Text className='text-2xl font-ralewayBold text-center text-white my-2'>
                        ¡Rutina Completada!
                    </Text>

                    <Text className='text-sm text-center font-ralewayLight text-white my-1'>
                        Califica la rutina:
                    </Text>

                    <View className='flex-row items-center justify-center gap-2'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star} onPress={() => handleRate(star)}>
                                <Ionicons
                                    name={star <= rating ? "star" : "star-outline"}
                                    size={32}
                                    color="#77ffaa"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className='flex flex-col'>

                        <Text className='text-sm text-center font-ralewayLight text-white my-1'>
                            ¿Te gustaría compartir tu logro?
                        </Text>

                        <View className='flex-row items-center justify-around my-2'>
                            <TouchableOpacity className='px-3 py-2 
                                bg-eBlue-800 rounded-full
                                flex flex-row items-center' onPress={onShare}>
                                <Ionicons name="share-social-outline" size={24} color="#fff" />
                                <Text className='text-sm text-white'>Compartir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='px-3 py-2 
                                bg-eBlue-800 rounded-full
                                flex flex-row items-center'  onPress={onClose}>
                                <Ionicons name="close-outline" size={24} color="#fff" />
                                <Text className='text-sm text-white'>Cerrar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </View>
        </Modal>
    );
};


export default CompletionModal;