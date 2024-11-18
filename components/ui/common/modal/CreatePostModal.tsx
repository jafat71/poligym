import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (content: string, image?: string) => Promise<void>;
    defaultMessage: string;
    workoutName: string;
    duration: number;
}

const CreatePostModal = ({ 
    isVisible, 
    onClose, 
    onSubmit,
    defaultMessage,
    workoutName,
    duration
}: Props) => {
    const [content, setContent] = useState(defaultMessage);
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await onSubmit(content, image || undefined);
            onClose();
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            className="m-0"
            style={{ margin: 0 }}
        >
            <View className="flex-1 bg-white dark:bg-darkGray-900 mt-20 rounded-t-3xl p-4">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-bold dark:text-white">
                        Crear publicación
                    </Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color="#999" />
                    </TouchableOpacity>
                </View>

                <TextInput
                    className="bg-gray-100 dark:bg-darkGray-800 p-4 rounded-xl mb-4 text-black dark:text-white"
                    multiline
                    numberOfLines={4}
                    value={content}
                    onChangeText={setContent}
                    placeholder="Comparte tu logro..."
                    placeholderTextColor="#666"
                />

                {image ? (
                    <View className="relative mb-4">
                        <Image
                            source={{ uri: image }}
                            className="w-full h-48 rounded-xl"
                        />
                        <TouchableOpacity 
                            className="absolute top-2 right-2 bg-black/50 rounded-full p-2"
                            onPress={() => setImage(null)}
                        >
                            <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity 
                        onPress={pickImage}
                        className="flex-row items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl mb-4"
                    >
                        <Ionicons name="image-outline" size={24} color="#666" />
                        <Text className="ml-2 text-gray-600 dark:text-gray-300">
                            Añadir foto
                        </Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity 
                    onPress={handleSubmit}
                    disabled={isLoading}
                    className={`bg-eBlue-500 p-4 rounded-xl ${isLoading ? 'opacity-50' : ''}`}
                >
                    {isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white text-center font-bold">
                            Publicar
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default CreatePostModal;