import { useTheme } from '@/context/ThemeContext';
import { SocialPost } from '@/types/interfaces/entities/post';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Image, Pressable, Switch, Text, View } from 'react-native';
import ThemeHomePill from '../common/pills/ThemeHomePill';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolateColor } from 'react-native-reanimated';
import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { useUser } from '@/context/UserContext';

export const SelfPost = (post: SocialPost) => {
    if (!post) return null
    const { isDark } = useTheme()
    const { loggedUserInfo } = useUser()
    const userName = loggedUserInfo?.name || ""
    const userImage = loggedUserInfo?.avatarUrl || ""   
    //{"fecha": 2025-01-08T09:21:34.754Z transforma a 2025-01-08 09:21:34

    const {setUserPosts} = useNavigationFlowContext()
    const [postlikes, setPostLikes] = useState(post.likes)
    const [isPublic, setIsPublic] = useState(post.publico)

    console.log("post on SelfPost", post)

    const scale = useSharedValue(1);
    const [isLiked, setIsLiked] = useState(false)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const getPostDate = (date: string) => {
        const datePost = new Date(date)
        const day = datePost.getDate()
        const month = datePost.getMonth()
        const year = datePost.getFullYear()
        return `${day}/${month}/${year}`
    }

    const getPostTime = (date: string) => {
        const datePost = new Date(date)
        const hours = datePost.getHours()
        const minutes = datePost.getMinutes()
        return `${hours}:${minutes}`
    }

    const handleLike = () => {
        setIsLiked(!isLiked);
        setPostLikes(isLiked ? postlikes - 1 : postlikes + 1);
        scale.value = withSpring(1.2, {}, () => {
            scale.value = withSpring(1);
        });
    };

    const toggleSwitch = () =>  {
        Alert.alert("Cambiar visibilidad", "¿Estás seguro de querer cambiar la visibilidad de este post?", [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Confirmar",
                onPress: () => {
                    setIsPublic(!isPublic) //modifica complente de Switch
                    setUserPosts(prev => prev.map(prevPost => prevPost.id === post.id ? {...prevPost, publico: !prevPost.publico, oculto: !prevPost.oculto} : prevPost))
                }
            }
        ])
    }

    const postDate = getPostDate(post.fecha)
    const postTime = getPostTime(post.fecha)

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
                            userImage ? (
                                <Image
                                    source={{ uri: userImage }}
                                    className='w-full h-full rounded-full'
                                />
                            ) : (
                                <Text className={` text-lg font-raleway text-eBlue-500 `}>
                                    {userName?.split(" ").map((n) => n[0]).join("")}
                                </Text>
                            )
                        }
                    </View>
                    <View className={`pl-3`}>
                        <Text className={`text-base font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{userName}</Text>
                        <Text className={`text-base font-raleway text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>{postDate} {postTime}</Text>
                    </View>
                </View>
                <View className='flex flex-row items-center justify-center' >
                    <Switch
                        onValueChange={toggleSwitch}
                        value={isPublic}
                        thumbColor="#0059ff"
                        trackColor={{ false: isDark ? "#ddds" : "#ddd", true: isDark ? "#66a3ff" : "#16243E" }}
                        ios_backgroundColor={isDark ? "#333" : "#ddd"}
                    />
                </View>
            </View>

            {
                post.imagen_comentario && (
                    <Image source={{ uri: post.imagen_comentario }} className='w-full h-40 rounded-md' />
                )
            }

            <View className='pb-2'>
                <Text className={`text-xl font-ralewaySemiBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `} >
                    {post.mensaje}
                </Text>
            </View>

            <View className={`flex flex-row items-start justify-between h-18 my-2`}>
                <View className={`flex flex-row flex-wrap`}>
                    <ThemeHomePill
                        icon={"fitness"}
                        text={post.rutina!}
                    />
                    <ThemeHomePill
                        icon="time-outline"
                        text={`${post.duracion ?? '0'} min.`}
                    />
                    <ThemeHomePill
                        icon="flame-outline"
                        text={`${post.dificultad}`}
                    />
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
export default SelfPost;
