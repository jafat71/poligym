import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null); // URL local para previsualización
    const [file, setFile] = useState<File | null>(null); // Objeto File para enviar al backend

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const { uri } = result.assets[0];

            // Actualiza la URL local para previsualización
            setImagePreview(uri);

            // Crear un objeto File desde la URI
            const fileName = uri.split('/').pop() || 'image.jpg';
            const fileType = `image/${fileName.split('.').pop()}`;

            // Utilizar fetch para obtener el archivo binario
            const response = await fetch(uri);
            const blob = await response.blob();

            const newFile = new File([blob], fileName, { type: fileType });
            setFile(newFile);
        }
    };

    return {
        imagePreview, // URL local para mostrar en la interfaz
        file,         // Objeto File para enviar al backend
        pickImage,
        setImagePreview,
        setFile,
    };
};
