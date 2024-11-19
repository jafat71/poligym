import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import IconButton from '../buttons/IconButton';
import { useUser } from '@/context/UserContext';
import { DIFFICULTIES } from '@/constants';
import { SocialPost } from '@/types/interfaces/entities/post';
import ThemeHomePill from '../pills/ThemeHomePill';
import CTAButtonPrimary from '../buttons/CtaButtonPrimary';

interface Props {
    isVisible: boolean;
    onClose: () => void;
    defaultMessage: string;
    post: Partial<SocialPost>;
}

const CreatePostModal = ({
    isVisible,
    onClose,
    defaultMessage,
    post,
}: Props) => {
    const { isDark } = useTheme()
    const { loggedUserInfo } = useUser()
    const [content, setContent] = useState(defaultMessage);
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [postTime, setPostTime] = useState<string | null>(null);

    useEffect(() => {
        if (isVisible) {
            setPostTime(new Date().toISOString());
        }
    }, [isVisible]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleCreatePost = async (content: string, image?: string) => {
        await new Promise(resolve => setTimeout(resolve, 3000))
        // try {
        //     await createPost({
        //         content,
        //         image,
        //         workoutId: workoutId,
        //         duration: workoutDuration,
        //         accessToken: accessToken!
        //     });
        //     // Actualizar la caché de posts si es necesario
        //     queryClient.invalidateQueries(['posts']);
        // } catch (error) {
        //     console.error('Error creating post:', error);
        //     Alert.alert('Error', 'No se pudo crear la publicación');
        // }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await handleCreatePost(content, image || undefined);
            onClose();
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            className="m-0"
            style={{ margin: 0 }}
            avoidKeyboard
            propagateSwipe
            animationOut={'fadeOut'}
            animationIn={'fadeIn'}
            animationInTiming={300}
            animationOutTiming={300}
            backdropOpacity={0.75}
            backdropTransitionOutTiming={600}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 mt-20"
            >
                <View className={`flex-1 bg-${isDark ? 'darkGray-900' : 'white'} mt-20 rounded-t-3xl p-4`}>
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className={`text-3xl font-ralewayBold ${isDark ? 'text-white' : 'text-black'}`}>
                            Compartir en la comunidad
                        </Text>
                        <IconButton
                            icon={<Ionicons name="close" size={24} color="#999" />}
                            onPress={onClose}
                        />
                    </View>

                    <ScrollView
                        className="flex-1 border-2 border-darkGray-200 rounded-sm"
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                    >
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
                                            // !loggedUserInfo?.userProfileImgUrl  ? (
                                            //     <Image
                                            //         source={{ uri: loggedUserInfo?.userProfileImgUrl ?? ""}}
                                            //         className='w-full h-full rounded-full'
                                            //     />
                                            // ) : (
                                            //     <Text className={` text-lg font-raleway text-eBlue-500 `}>
                                            //         {loggedUserInfo.userName.split(" ").map((n) => n[0]).join("")}
                                            //     </Text>
                                            // )
                                        }
                                        <Text className={` text-lg font-raleway text-eBlue-500 `}>
                                            {loggedUserInfo?.userName.split(" ").map((n) => n[0]).join("")}
                                        </Text>
                                    </View>
                                    <View className={`pl-3`}>
                                        <Text className={`text-base font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{loggedUserInfo?.userName}</Text>
                                        <Text className={`text-base font-raleway text-start  ${isDark ? "text-white" : "text-darkGray-400"} `}>{postTime}</Text>
                                    </View>
                                </View>
                            </View>

                            {image ? (
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
                                <TouchableOpacity
                                    onPress={pickImage}
                                    className="flex-row items-center justify-center h-48 p-4 border-2 border-dashed border-gray-300 rounded-xl mb-4"
                                >
                                    <Ionicons name="image-outline" size={24} color={`${isDark ? "#f2f2f2" : "#1c1c1c"}`} />
                                    <Text className={`ml-2 ${isDark ? "text-white" : "text-darkGray-500"}`}>
                                        Añadir foto
                                    </Text>
                                </TouchableOpacity>
                            )}

                            <View className='pb-2 my-2'>
                                <TextInput
                                    className={`text-xl font-ralewaySemiBold text-start ${isDark ? "text-white bg-darkGray-900" : "text-darkGray-500 bg-darkGray-100"}  p-2 `}
                                    multiline
                                    numberOfLines={4}
                                    value={content}
                                    onChangeText={setContent}
                                    placeholder="Comparte tu logro..."
                                    placeholderTextColor="#666"
                                />
                            </View>

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
                                    text={`${DIFFICULTIES.find(diff => diff.value === post.dificultad)?.label || ''}`}
                                />
                            </View>
                        </View>
                    </ScrollView>

                    <CTAButtonPrimary
                        text='Publicar'
                        onPress={handleSubmit}
                        isLoading={isLoading}
                    />
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default CreatePostModal;