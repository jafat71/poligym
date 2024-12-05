import { useTheme } from '@/context/ThemeContext'
import { useImagePicker } from '@/hooks/useImagePicker'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

interface Props {
    imgUrl: string;
    setImgURL: React.Dispatch<React.SetStateAction<string>>
    setImgFile: React.Dispatch<React.SetStateAction<File | null>>
}

const ImagePicker = ({imgUrl,setImgURL,setImgFile}:Props) => {
    const { imagePreview, pickImage, file} = useImagePicker()
    const {isDark} = useTheme()

    useEffect(() => {
        setImgURL(imagePreview!)
        setImgFile(file!)
    }, [file]);

    return (
        <TouchableOpacity
            onPress={pickImage}
            className='m-2'
        >
            {imagePreview || imgUrl
                ? (
                    <View className={`w-32 h-32 rounded-full  flex items-center justify-center p-1 ${isDark ? "bg-white" : "bg-darkGray-500"}  `}>
                        <Image source={{ uri: imagePreview || imgUrl }} style={{ width: 120, height: 120, borderRadius: 60 }} resizeMode='cover' />
                    </View>
                )
                : (
                    <View className={`w-32 h-32 rounded-full  flex items-center justify-center p-1 ${isDark ? "bg-white" : "bg-darkGray-500"}  `}>
                        <Ionicons name="camera" size={42} color={isDark ? "#1c1c1c" : "#fff"} />
                    </View>
                )
            }

        </TouchableOpacity>
    )
}

export default ImagePicker