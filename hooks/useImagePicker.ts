import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from "@/lib/utils/uploadImage";

export const useImagePicker = () => {
    const [image, setImage] = useState<string | null>(null);
    const [imageCloudUrl, setImageCloudUrl] = useState<string | null>(null);

    const handleImageResult = async (result: ImagePicker.ImagePickerResult) => {
        if (!result.canceled) {
            const base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;
            try {
                setImage(result.assets[0].uri);
                const cloudUrl = await uploadImage({ base64Img, uploadPreset: "profile_images" });
                setImageCloudUrl(cloudUrl);
            } catch (error) {
                console.error('Error uploading image to server:', error);
            }
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Debes dar permisos para acceder a la galería");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        await handleImageResult(result);

    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert("Debes dar permisos para acceder a la cámara");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        await handleImageResult(result);
    };

    return {
        image,
        imageCloudUrl,
        pickImage,
        takePhoto,
        setImage,
    }
}