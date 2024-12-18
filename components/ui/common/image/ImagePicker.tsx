import { useTheme } from '@/context/ThemeContext'
import { useImagePicker } from '@/hooks/useImagePicker'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { Alert, Image, TouchableOpacity, View } from 'react-native'
import { useActionSheet } from '@expo/react-native-action-sheet';

interface Props {
    imgUrl: string;
    setImg: React.Dispatch<React.SetStateAction<string>>
}

const ImagePicker = ({imgUrl,setImg}:Props) => {
    const { image, pickImage, takePhoto, setImage, imageCloudUrl} = useImagePicker()
    const {isDark} = useTheme()
    const { showActionSheetWithOptions } = useActionSheet();

    useEffect(() => {
        if(imgUrl){
            setImage(imgUrl)
        }
    }, []);

    
    useEffect(() => {
        if (imageCloudUrl) {
            setImg(imageCloudUrl)
        }
    }, [imageCloudUrl]);

    const handleImagePicker = () => {
        showActionSheetWithOptions({
            options: ['Tomar Foto', 'Elegir de Galería', 'Cancelar'],
            cancelButtonIndex: 2,
        }, (index) => {
            if (index === 0) {
                takePhoto()
            } else if (index === 1) {
                pickImage()
            }
        })
    }

    return (
        <>
            <TouchableOpacity
                onPress={handleImagePicker}
                className='m-2'
            >
                {image || imgUrl
                    ? (
                        <View className={`w-32 h-32 rounded-full  flex items-center justify-center p-1 ${isDark ? "bg-white" : "bg-darkGray-500"}  `}>
                            <Image source={{ uri: image || imgUrl }} style={{ width: 120, height: 120, borderRadius: 60 }} resizeMode='cover' />
                        </View>
                    )
                    : (
                        <View className={`w-32 h-32 rounded-full  flex items-center justify-center p-1 ${isDark ? "bg-white" : "bg-darkGray-500"}  `}>
                            <Ionicons name="camera" size={42} color={isDark ? "#1c1c1c" : "#fff"} />
                        </View>
                    )
                }

            </TouchableOpacity>

        </>
    )
}

export default ImagePicker