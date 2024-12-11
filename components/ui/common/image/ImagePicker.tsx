import { useTheme } from '@/context/ThemeContext'
import { useImagePicker } from '@/hooks/useImagePicker'
import { uploadImage } from '@/lib/utils/uploadImage'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

interface Props {
    imgUrl: string;
    setImg: React.Dispatch<React.SetStateAction<string>>
}

const ImagePicker = ({imgUrl,setImg}:Props) => {
    const { image, pickImage, setImage, imageCloudUrl} = useImagePicker()
    const {isDark} = useTheme()

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

    return (
        <TouchableOpacity
            onPress={pickImage}
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
    )
}

export default ImagePicker