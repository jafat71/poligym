import React from 'react';
import { Modal, View, Text, Pressable, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface ErrorModalProps {
  modalVisible: boolean;
  toggleModal: () => void;
  errors: string[];
}

const ErrorModal: React.FC<ErrorModalProps> = ({ modalVisible, toggleModal, errors }) => {
  const { isDark } = useTheme();

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="slide"
      onRequestClose={toggleModal}
    >
      <View className={`flex-1 justify-center items-center ${isDark ? 'bg-black bg-opacity-60' : 'bg-gray-300 bg-opacity-80'}`}>
        <View className="bg-white p-5 rounded-lg max-w-[80%]">
          <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Errores</Text>
          <ScrollView className="mt-3">
            {errors.map((error, index) => (
              <Text key={index} className={`text-base ${isDark ? 'text-white' : 'text-darkGray-500'}`}>
                - {error}
              </Text>
            ))}
          </ScrollView>
          <Pressable onPress={toggleModal} className="mt-4 bg-blue-500 p-2 rounded-lg">
            <Text className={`text-white text-center`}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;
