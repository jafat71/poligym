import { useTheme } from '@/context/ThemeContext';
import { SocialPost } from '@/types/interfaces/entities/post';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import ThemeHomePill from '../common/pills/ThemeHomePill';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useUser } from '@/context/UserContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getPostById, updateLikesPostInDatabase } from '@/lib/postapi';
import { mapApiPostToPost } from '@/types/mappers';
import { queryClient } from '@/lib/queryClient/queryClient';

export const ComunityPost = (post: SocialPost) => {
    if (!post) return null
    const { isDark } = useTheme()
    const { loggedUserInfo } = useUser()
    const userName = loggedUserInfo?.name || ""
    const userImage = loggedUserInfo?.avatarUrl || ""   

    const [postlikes, setPostLikes] = useState(post.likes)

    const scale = useSharedValue(1);
    const [postState, setPostState] = useState<SocialPost>(post);
    const [isLiked, setIsLiked] = useState(false)

    const {data: actualPost} = useQuery<SocialPost>({
        queryKey: ['userPosts', post.id],
        queryFn: async () : Promise<SocialPost> => {
            const response = await getPostById(post.id)
            return mapApiPostToPost(response.data)[0]
        },
        enabled: !!post.id,
        initialData: post as SocialPost
    })

    useEffect(() => {
        if(actualPost){
            setPostState(post)
            setIsLiked(post.liked_by?.includes(loggedUserInfo?.id!))
            setPostLikes(post.likes)
        }
    }, [post])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const getPostDate = (date: string) => {
        const datePost = new Date(date)
        const day = datePost.getDate()
        const month = datePost.getMonth() + 1 //empieza en 0
        const year = datePost.getFullYear()
        return `${day}/${month}/${year}`
    }

    const getPostTime = (date: string) => {
        const datePost = new Date(date)
        const hours = datePost.getHours()
        const minutes = datePost.getMinutes()
        return `${hours}:${minutes}`
    }

    const likePostMutation = useMutation({
        mutationFn: async (postId: string) => {
            const response = await updateLikesPostInDatabase(Number(postId), loggedUserInfo?.id!)
            return response
        },
        onSuccess: async (response) => {
            console.log("likePostMutation onSuccess", response)
            setIsLiked(!isLiked);
            const newLikes = isLiked ? postlikes - 1 : postlikes + 1;
            setPostLikes(newLikes);
            scale.value = withSpring(1.2, {}, () => {
                scale.value = withSpring(1);
            });
            await queryClient.invalidateQueries({ queryKey: ['userPosts', post.id] })
            await queryClient.invalidateQueries({ queryKey: ['communityPosts', post.id] })

        },
        onError: (error) => {
            console.log("likePostMutation onError", error)
        }
    })

    const handleLike = async () => {
        likePostMutation.mutate(post.id.toString())
    };

    const postDate = getPostDate(postState.fecha)
    const postTime = getPostTime(postState.fecha)

    return (
        <View className={`my-3 ${isDark ? "bg-darkGray-500" : "bg-white"} rounded-lg`}>
            <View className={`flex flex-row items-center 
                justify-between p-2`}>
                <View className='flex flex-row items-center'>
                    <View className={`rounded-full w-12 h-12
                            flex flex-col items-center justify-center 
                            border-[2px] border-eBlue-500`}>
                        {
                            userImage ? (
                                <Image
                                    source={{ uri: userImage }}
                                    className='w-full h-full rounded-full'
                                />
                            ) : (
                                <Text className={` text-lg font-raleway text-eBlue-500`}>
                                    {userName?.split(" ").map((n) => n[0]).join("")}
                                </Text>
                            )
                        }
                    </View>
                    <View className={`pl-3`}>
                        <Text className={`text-base font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"}`}>{userName}</Text>
                        <Text className={`text-base font-raleway text-start  ${isDark ? "text-white" : "text-darkGray-400"}`}>{postDate} {postTime}</Text>
                    </View>
                </View>
            </View>

            {
                postState.imagen_comentario && (
                    <Image source={{ uri: postState.imagen_comentario }} className='w-full h-60 rounded-md mb-2' />
                )
            }

            <View className='p-2'>
                <Text className={`text-lg font-raleway text-start ${isDark ? "text-white" : "text-darkGray-500"}`} >
                    {postState.mensaje}
                </Text>
            </View>

            <View className={`flex flex-row items-start justify-between h-18 my-2`}>
                <View className={`flex flex-row flex-wrap`}>
                    <ThemeHomePill
                        icon={"fitness"}
                        text={postState.rutina!}
                    />
                    <ThemeHomePill
                        icon="time-outline"
                        text={`${postState.duracion ?? '0'} min.`}
                    />
                    <ThemeHomePill
                        icon="flame-outline"
                        text={`${postState.dificultad}`}
                    />
                </View>
            </View>

            <View className={`flex flex-row items-center justify-center`}>

            <Pressable
                    className='flex flex-row items-center pb-2'
                    onPress={handleLike}>
                    <Text className={`text-xl font-ralewayExtraBold ${isDark ? "text-white" : "text-darkGray-500"}`} >
                        {postlikes}
                    </Text>
                    <Animated.View style={animatedStyle}>
                        <Ionicons name={isLiked ? "heart" : "heart-outline"} size={34} color={`${isDark ? "white" : "#1c1c1c"}`} />
                    </Animated.View>
                </Pressable>

            </View>

        </View>
    );
}
export default ComunityPost;
