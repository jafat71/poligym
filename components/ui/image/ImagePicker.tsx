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
            className='m-2'
        >
            {image
                ? (
                    <View className={`w-24 h-24 rounded-full  flex items-center justify-center p-1 ${isDark ? "bg-white" : "bg-darkGray-500"}  `}>
                        <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 60 }} resizeMode='cover' />
                    </View>
                )
                : (
                    <View className={`w-24 h-24 rounded-full  flex items-center justify-center p-1 ${isDark ? "bg-white" : "bg-darkGray-500"}  `}>
                        <Ionicons name="camera" size={42} color={isDark ? "#1c1c1c" : "#fff"} />
                    </View>
                )
            }

        </TouchableOpacity>
    )
}

export default ImagePicker