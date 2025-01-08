import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PostImagePicker from '../image/PostImagePicker';

interface Props {
    isVisible: boolean;
    onClose: () => void;
    post: Partial<SocialPost>;
}

const CreatePostModal = ({ isVisible, onClose, post }: Props) => {
    if(!isVisible) return null;
    if(!post) return null;
    const { isDark } = useTheme();
    const { loggedUserInfo, accessToken } = useUser();
    const { setUserPosts } = useNavigationFlowContext();
    const { workoutTotalDuration } = usePlayWorkoutContext();
    const [postTimeWorkout, setPostTimeWorkout] = useState<string>('00:00');
    const [content, setContent] = useState(``);
    const [isLoading, setIsLoading] = useState(false);
    const [postTime, setPostTime] = useState<string | null>(null);
    const [postCreatedNotification, setPostCreatedNotification] = useState(false);
    const [postImage, setPostImage] = useState<string | null>(null);    

    useEffect(() => {
        if (isVisible) {
            setPostTime(new Date().toISOString());
        }
    }, [isVisible]);

    useEffect(() => {
        setPostTimeWorkout(workoutTotalDuration);
        setContent(`¡He completado la rutina "${post.rutina}" en ${workoutTotalDuration} mins! 💪`);
    }, [workoutTotalDuration]);

    const handleCreatePost = async () => {
        const randomId = Math.floor(Math.random() * 1000) + 1;
        post.id = randomId;
        post.publico = true;
        post.imagen_comentario = postImage ?? '';
        post.likes = 0;
        post.mensaje = content;
        post.oculto = false;
        post.duracion = postTimeWorkout;
        post.user_id = loggedUserInfo?.id!;
        try {
            const response = await createPost(accessToken!, post as SocialPost);
            console.log('response', response);
            setUserPosts((prevPosts) => [...prevPosts, post as SocialPost]);
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
            }, 1000);
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
            style={{ margin: 0 }}
            avoidKeyboard
            propagateSwipe
            animationOutTiming={1000}
            animationOut={'bounceOutDown'}
            animationIn={'bounceInUp'}
            backdropOpacity={0.25}
            useNativeDriver={true}
            backdropTransitionOutTiming={0}
            hideModalContentWhileAnimating
        >
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                extraScrollHeight={170}
                enableOnAndroid={true}
                contentContainerStyle={{ flexGrow: 1, backgroundColor: '#0059ff' }}
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

                            <PostImagePicker setImg={setPostImage} />

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

                    <CTAButtonPrimary text="Publicar" onPress={handleSubmit} isLoading={isLoading} />
                </View>
            </KeyboardAwareScrollView>
        </Modal>
    );
};

export default CreatePostModal;
