import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TrainingPlan } from '@/types/interfaces/entities/plan';

interface PlanModalProps {
    isModalVisible: boolean;
    setIsModalVisible: (value: boolean) => void;
    screenPlan: TrainingPlan;
}

const PlanModal = ({ isModalVisible, setIsModalVisible, screenPlan}: PlanModalProps) => {
    const isDark = useTheme()
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
    >
        <View className="flex-1 justify-center items-center bg-black/50">
            <View className={`
                m-5 p-6 rounded-2xl
                ${isDark ? 'bg-darkGray-500' : 'bg-white'}
                w-[90%] max-w-[400px]
            `}>
                {/* Header */}
                <View className="flex-row items-center justify-between mb-4">
                    <Text className={`
                        text-xl font-ralewayBold
                        ${isDark ? 'text-white' : 'text-darkGray-500'}
                    `}>
                        {screenPlan?.nombre || "Detalles del Plan"}
                    </Text>
                    <TouchableOpacity 
                        onPress={() => setIsModalVisible(false)}
                        className="p-2"
                    >
                        <Ionicons 
                            name="close-circle-outline" 
                            size={24} 
                            color={isDark ? '#fff' : '#374151'} 
                        />
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <View className="space-y-4">
                    <View className="flex-row items-center space-x-2">
                        <Ionicons 
                            name="time-outline" 
                            size={20} 
                            color={isDark ? '#fff' : '#374151'} 
                        />
                        <Text className={`
                            font-raleway
                            ${isDark ? 'text-white' : 'text-darkGray-500'}
                        `}>
                            Duración: {screenPlan?.duracion} semanas
                        </Text>
                    </View>

                    <View className="flex-row items-start space-x-2">
                        <Ionicons 
                            name="document-text-outline" 
                            size={20} 
                            color={isDark ? '#fff' : '#374151'} 
                        />
                        <Text className={`
                            flex-1 font-raleway
                            ${isDark ? 'text-white' : 'text-darkGray-500'}
                        `}>
                            {screenPlan?.descripcion}
                        </Text>
                    </View>

                    <View className="flex-row items-center space-x-2">
                        <Ionicons 
                            name="fitness-outline" 
                            size={20} 
                            color={isDark ? '#fff' : '#374151'} 
                        />
                        <Text className={`
                            font-raleway
                            ${isDark ? 'text-white' : 'text-darkGray-500'}
                        `}>
                            Nivel: {screenPlan?.dificultad}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity 
                    onPress={() => setIsModalVisible(false)}
                    className="bg-eBlue-500 rounded-xl p-4 mt-6"
                >
                    <Text className="text-white text-center font-ralewayBold">
                        Entendido
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
    );
}

export default PlanModal;
