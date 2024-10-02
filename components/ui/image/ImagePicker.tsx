import { useTheme } from '@/context/ThemeContext'
import { useImagePicker } from '@/hooks/useImagePicker'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

const ImagePicker = () => {
    const { pickImage, image } = useImagePicker()
    const {isDark} = useTheme()
    return (
        <TouchableOpacity
            onPress={pickImage}
        >
            {image
                ? (
                    <View className={`w-24 h-24 rounded-full mt-2  flex items-center justify-center p-1 ${isDark ? "bg-eBlue-500" : "bg-eBlue-900"}  `}>
                        <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 60 }} resizeMode='cover' />
                    </View>
                )
                : (
                    <View className={`w-24 h-24 rounded-full  flex items-center justify-center p-1 ${isDark ? "bg-eBlue-500" : "bg-eBlue-900"}  `}>
                        <Ionicons name="camera" size={42} color={`#fff`} />
                    </View>
                )
            }

        </TouchableOpacity>
    )
}

export default ImagePicker