import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from "@/lib/utils/uploadImage";

export const useImagePicker = () => {
    const [image, setImage] = useState<string | null>(null);
    const [imageCloudUrl, setImageCloudUrl] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`
            try {
                setImage(result.assets[0].uri);
                const cloudUrl = await uploadImage({base64Img, uploadPreset: "profile_images"})
                setImageCloudUrl(cloudUrl)
            } catch (error) {
                console.log('error uploading image to server', error)
            }
        }
    };

    return {
        image,
        pickImage,
        setImage,
        imageCloudUrl
    }
}