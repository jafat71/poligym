import { useTheme } from '@/context/ThemeContext'
import { useImagePicker } from '@/hooks/useImagePicker'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { useActionSheet } from '@expo/react-native-action-sheet';

interface Props {
    setImg: React.Dispatch<React.SetStateAction<string | null>>
}

const PostImagePicker = ({ setImg }: Props) => {
    const { image, pickImage, takePhoto, setImage, imageCloudUrl } = useImagePicker()
    const { isDark } = useTheme()
    const { showActionSheetWithOptions } = useActionSheet();

    useEffect(() => {
        if (imageCloudUrl) {
            setImg(imageCloudUrl)
        }
    }, [imageCloudUrl]);

    return (
        <>
                {image
                    ? (
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
                    <View className='flex-row items-center justify-center h-48 p-4 border-2 border-dashed border-gray-300 rounded-xl mb-4'>
                        <TouchableOpacity
                            onPress={takePhoto}
                            className={`flex-col items-center justify-center rounded-full 
                            ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"} 
                            p-4 w-1/2 h-3/4`}
                        >
                            <Ionicons name="image-outline" size={24} color={`${isDark ? "#f2f2f2" : "#1c1c1c"}`} />
                            <Text className={`ml-2 ${isDark ? "text-white" : "text-darkGray-500"}`}>
                                Tomar foto
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={pickImage}
                            className={`flex-col items-center justify-center rounded-full 
                                ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"} 
                                p-4 w-1/2 h-3/4`}                     
                            >
                            <Ionicons name="image-outline" size={24} color={`${isDark ? "#f2f2f2" : "#1c1c1c"}`} />
                            <Text className={`ml-2 ${isDark ? "text-white" : "text-darkGray-500"}`}>
                                Subir imagen 
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
        </>
    )
}

export default PostImagePicker