import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import IconButton from '../buttons/IconButton';
import { useUser } from '@/context/UserContext';
import { SocialPost } from '@/types/interfaces/entities/post';
import ThemeHomePill from '../pills/ThemeHomePill';
import CTAButtonPrimary from '../buttons/CtaButtonPrimary';
import { createPost } from '@/lib/api/actions';
import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { usePlayWorkoutContext } from '@/context/PlayWorkoutContext';
import CustomSnackbar from '../snackbar/CustomSnackbar';
import { DIFFICULTY } from '@/types/interfaces/entities/plan';

interface Props {
    isVisible: boolean;
    onClose: () => void;
    post: Partial<SocialPost>;
}

const CreatePostModal = ({
    isVisible,
    onClose,
    post,
}: Props) => {
    const { isDark } = useTheme()
    const { loggedUserInfo, accessToken } = useUser()
    const { setUserPosts } = useNavigationFlowContext()
    const { workoutTotalDuration } = usePlayWorkoutContext()
    const [postTimeWorkout, setPostTimeWorkout] = useState<string>("00:00");
    const [content, setContent] = useState(``);

    useEffect(() => {
        setPostTimeWorkout(workoutTotalDuration)
        setTimeout(() => {
            setContent(`¡He completado la rutina "${post.rutina}" en ${workoutTotalDuration} mins! 💪`)
        }, 1000)
    }, [workoutTotalDuration])

    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [postTime, setPostTime] = useState<string | null>(null);

    useEffect(() => {
        if (isVisible) {
            setPostTime(new Date().toISOString());
        }
    }, [isVisible]);

    const [postCreatedNotification, setPostCreatedNotification] = useState(false);
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

    const handleCreatePost = async () => {
        const randomId = Math.floor(Math.random() * 1000) + 1;
        post.id = randomId
        post.publico = true
        post.imagenComentario = image ?? ""
        post.likes = 0
        post.mensaje = content
        post.oculto = false
        post.duracion = postTimeWorkout
        post.nombre = loggedUserInfo?.name ?? ""
        console.log("post", post)
        try {
            await createPost(accessToken!, post as SocialPost);
            // Actualizar la caché de posts si es necesario
            //queryClient.invalidateQueries(['posts']);
            setUserPosts((prevPosts) => [...prevPosts, post as SocialPost])
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await handleCreatePost();
            setPostCreatedNotification(true);
            setTimeout(() => {
                setPostCreatedNotification(false);
                onClose();
            }, 1000)

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
            className="mt-2"
            style={{ margin: 0 }}
            avoidKeyboard
            propagateSwipe
            animationOutTiming={1000}
            animationOut={'bounceOutDown'}
            animationIn={'bounceInUp'}
            backdropOpacity={0.25} // Aumentar opacidad del fondo
            useNativeDriver={true}
            backdropTransitionOutTiming={0}
            hideModalContentWhileAnimating
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 mt-4"
            >
                <View className={`flex-1 bg-${isDark ? 'darkGray-900' : 'white'} mt-4 rounded-t-3xl p-4`}>
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
                        className="flex-1  rounded-sm"
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
                                            {loggedUserInfo?.name.split(" ").map((n) => n[0]).join("")}
                                        </Text>
                                    </View>
                                    <View className={`pl-3`}>
                                        <Text className={`text-base font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>{loggedUserInfo?.name}</Text>
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
                                    text={`${postTimeWorkout ?? '0'} min.`}
                                />
                                <ThemeHomePill
                                    icon="flame-outline"
                                    text={`${post.dificultad}`}
                                />
                            </View>
                        </View>
                    </ScrollView>

                    <CTAButtonPrimary
                        text='Publicar'
                        onPress={handleSubmit}
                        isLoading={isLoading}
                    />

                    <CustomSnackbar
                        visible={postCreatedNotification}
                        setVisible={setPostCreatedNotification}
                        message='Tu logro ha sido compartido en la comunidad'
                        color={isDark ? 'white' : 'black'}
                        textColor={isDark ? 'black' : 'white'}
                    />
                </View>

            </KeyboardAvoidingView>
        </Modal>
    );
};

export default CreatePostModal;