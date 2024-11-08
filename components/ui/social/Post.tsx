import { useTheme } from '@/context/ThemeContext';
import { SocialPost } from '@/types/interfaces/entities/post';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolateColor } from 'react-native-reanimated';

export const Post = (post: SocialPost) => {
    const { isDark } = useTheme()
    const [postlikes, setPostLikes] = useState(post.likes)

    const scale = useSharedValue(1);
    const [isLiked, setIsLiked] = useState(false)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handleLike = () => {
        setIsLiked(!isLiked);
        setPostLikes(isLiked ? postlikes - 1 : postlikes + 1);
        scale.value = withSpring(1.2, {}, () => {
            scale.value = withSpring(1);
        });
    };

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
                            !post.imagenPerfil ? (
                                <Image
                                    source={{ uri: post.imagenPerfil }}
                                    className='w-full h-full rounded-full'
                                />
                            ) : (
                                <Text className={` text-lg font-raleway text-eBlue-500 `}>
                                    {post.nombre.split(" ").map((n) => n[0]).join("")}
                                </Text>
                            )
                        }
                    </View>
                    <View className={`pl-3`}>
                        <Text className={`text-base font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{post.nombre}</Text>
                        <Text className={`text-base font-raleway text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>{post.fecha}</Text>
                    </View>
                </View>
                <View >
                    <Ionicons name="ellipsis-vertical" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                </View>
            </View>

            {
                post.imagenComentario && (
                    <Image source={{ uri: post.imagenComentario }} className='w-full h-40 rounded-md' />
                )
            }

            <View className='pb-2'>
                <Text className={`text-xl font-raleway text-start ${isDark ? "text-white" : "text-darkGray-500"} `} >
                    {post.mensaje}
                </Text>
            </View>

            <View className={`flex flex-row items-start justify-between h-18 my-2`}>
                <View className='flex flex-col items-start justify-center w-1/3'>
                    <Text className={`text-xs font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"}`}>Ejercicio</Text>
                    <Text className={`text-sm font-raleway text-start ${isDark ? "text-white" : "text-darkGray-500"} `} >
                        {post.rutina}
                    </Text>
                </View>

                <View className='flex flex-col items-start justify-center w-1/3'>
                    <Text className={`text-xs font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"}`}>Dificultad</Text>
                    <Text className={`text-sm font-raleway text-start ${isDark ? "text-white" : "text-darkGray-500"} `} >
                        {post.dificultad}
                    </Text>
                </View>

                <View className='flex flex-col items-start justify-center w-1/3'>
                    <Text className={`text-xs font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"}`}>Duración</Text>
                    <Text className={`text-sm font-raleway text-start ${isDark ? "text-white" : "text-darkGray-500"} `} >
                        {post.duracion}
                    </Text>
                </View>

            </View>

            <View className={`flex flex-row items-center justify-center`}>

                <Pressable
                    className='flex flex-row items-center '
                    onPress={handleLike}>
                    <Text className={`text-xl font-ralewayExtraBold  ${isDark ? "text-white" : "text-darkGray-500"} `} >
                        {postlikes}
                    </Text>
                    <Animated.View style={animatedStyle}>
                        <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={`#0055f9`} />
                    </Animated.View>
                </Pressable>

            </View>

        </View>
    );
}

export default Post;
