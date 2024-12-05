import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

import { router } from 'expo-router';

import { useMutation } from '@tanstack/react-query';

import { useUser } from '@/context/UserContext';
import { useNavigationFlowContext } from '@/context/NavFlowContext';

import { FITNESS_LEVEL, GENDER, GOAL, User, USER_TYPE } from '@/types/interfaces/entities/user';

import { updateUser } from '@/lib/api/userActions';
import { getEnumKeyByValue } from '@/lib/utils/getEnumKeyByValue';
import { uploadImage } from '@/lib/utils/uploadImage';

import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import ImagePicker from '@/components/ui/common/image/ImagePicker';

const Form06 = () => {
    const opacity = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));
    useEffect(() => {
        opacity.value = withTiming(1, { duration: 500 }); 
    }, []);

    const { tmpUser, updateInitUserShell } = useNavigationFlowContext()
    const [profileImage, setprofileImage] = useState(tmpUser?.avatarUrl || '');
    const [profileImageFile, setprofileImageFile] = useState<File | null>(null);

    const { accessToken, loggedUserInfo} = useUser()

    const updateUserMutation = useMutation({
        mutationFn: async () => {
            //RECUPERA EL VALOR DE LOS ENUMS
            const updateUserObj: Partial<User> = {
                ...tmpUser,
                fitnessLevel: getEnumKeyByValue(FITNESS_LEVEL, tmpUser?.fitnessLevel!) as FITNESS_LEVEL,
                goal: getEnumKeyByValue(GOAL, tmpUser?.goal!) as GOAL,
                gender: getEnumKeyByValue(GENDER, tmpUser?.gender!) as GENDER,
                userType: getEnumKeyByValue(USER_TYPE, tmpUser?.userType!) as USER_TYPE,
            };
            await updateUser(
            accessToken!,
            loggedUserInfo?.id!,
            updateUserObj
            )},
        onSuccess: () => {
            router.push('/(home)/home')
        },
        onError: (error: any) => {
            console.log(error)
        }
    })

    useEffect(() => {
        updateInitUserShell({
            ...tmpUser,
            avatarUrl: profileImage
        })
    }, [profileImage]);

    useEffect(() => {
        if (tmpUser) {
            setprofileImage(tmpUser.avatarUrl || '')
        }
    }, []);

  
    const handleContinue = async () => {
        let avatarUrl = ''; 
    
        if (profileImageFile) {
            try {
                avatarUrl = await uploadImage({ file: profileImageFile, uploadPreset: 'profile_image' });
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    
        updateInitUserShell({
            ...tmpUser,
            avatarUrl,
        });
    
        // Ejecutar la mutación
        updateUserMutation.mutate();
    };
    

    return (
        <Animated.View
        style={animatedStyle}
        className="flex-1 w-full flex flex-col items-center justify-between">
            <Text className="text-white text-4xl font-ralewayExtraBold">
                Estamos casi listos
            </Text>
            <Text className="text-white text-center text-xl font-ralewaySemiBold mb-4">
                Subir Foto de Perfil
            </Text>
            <ImagePicker
                imgUrl={profileImage}
                setImgURL={setprofileImage}
                setImgFile={setprofileImageFile}
            />
            <View className='w-full'>
                <CTAButtonPrimary
                    onPress={handleContinue}
                    text="Continuar"
                    isLoading={updateUserMutation.isPending}
                />
            </View>
        </Animated.View>
    );
};

export default Form06;
