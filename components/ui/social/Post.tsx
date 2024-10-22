import { useTheme } from '@/context/ThemeContext';
import { SocialPost } from '@/types/interfaces/entities/post';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';


export const Post = ({
    imagenPerfil,
    nombre,
    fecha,
    mensaje,
    likes,
    publico,
    oculto,
    id,
    ejercicio,
    peso,
    repeticiones,
}: SocialPost) => {
    const { isDark } = useTheme()
    const [postlikes, setPostLikes] = useState(likes)
    return (
        <View className={`my-3 p-2
            ${isDark ? "bg-darkGray-500" : "bg-white"}  rounded-sm`}>
            <View className={`flex flex-row items-center 
              justify-between pb-5`}>
                <View className='flex flex-row items-center'>
                    <View className={`rounded-full w-12 h-12
                            flex flex-col items-center justify-center 
                            border-[2px] border-eBlue-500
                            ${isDark ? "" : "bg-darkGray-200 "}`}>
                        {
                            !imagenPerfil ? (
                                <Image
                                    source={{ uri: imagenPerfil }}
                                    className='w-full h-full rounded-full'
                                />
                            ) : (
                                <Text className={` text-lg font-raleway text-eBlue-500 `}>
                                    {nombre.split(" ").map((n) => n[0]).join("")}
                                </Text>
                            )
                        }
                    </View>
                    <View className={`pl-3`}>
                        <Text className={`text-base font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{nombre}</Text>
                        <Text className={`text-base font-raleway text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>{fecha}</Text>
                    </View>
                </View>
                <View >
                    <Ionicons name="ellipsis-vertical" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                </View>
            </View>

            <View className='pb-2'>
                <Text className={`text-xl font-raleway text-start ${isDark ? "text-white" : "text-darkGray-500"} `} >
                    {mensaje}
                </Text>
            </View>

            <View className={`flex flex-row items-start justify-between h-18 my-2`}>
                <View className='flex flex-col items-start justify-center w-1/3'>
                    <Text className={`text-xs font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"}`}>Ejercicio</Text>
                    <Text className={`text-sm font-raleway text-start ${isDark ? "text-white" : "text-darkGray-500"} `} >
                        {ejercicio}
                    </Text>
                </View>

                <View className='flex flex-col items-start justify-center w-1/3'>
                    <Text className={`text-xs font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"}`}>PESO</Text>
                    <Text className={`text-sm font-raleway text-start ${isDark ? "text-white" : "text-darkGray-500"} `} >
                        {peso} KG
                    </Text>
                </View>

                <View className='flex flex-col items-start justify-center w-1/3'>
                    <Text className={`text-xs font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"}`}>Repeticiones</Text>
                    <Text className={`text-sm font-raleway text-start ${isDark ? "text-white" : "text-darkGray-500"} `} >
                        {repeticiones !== 0 ? repeticiones : "--"}
                    </Text>
                </View>

            </View>

            <View className={`flex flex-row items-center justify-center`}>

                    <Pressable
                        className='flex flex-row items-center '
                        onPress={() => {
                            setPostLikes(postlikes + 1)
                        }}>
                        <Text className={`text-xl font-ralewayExtraBold  ${isDark ? "text-white" : "text-darkGray-500"} `} >
                            {postlikes}
                        </Text>
                        <Ionicons name="heart-outline" size={24} color={`#0055f9`} />
                    </Pressable>

            </View>

        </View>
    );
}

export default Post;
