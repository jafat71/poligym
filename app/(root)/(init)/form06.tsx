import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import ImagePicker from '@/components/ui/common/image/ImagePicker';
import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Switch, Text, View } from 'react-native';

const Form06 = () => {
    const { isDark } = useTheme()
    const { tmpUser, updateInitUserShell } = useNavigationFlowContext()
    const [profileImage, setprofileImage] = useState('');

    useEffect(() => {
        updateInitUserShell({
            ...tmpUser,
            userProfileImgUrl: profileImage
        })
    }, [profileImage]);

    useEffect(() => {
        //TODO: modificar logica de recuperación de imagen con el ImagePicker
        if (tmpUser) {
            setprofileImage(tmpUser.userProfileImgUrl)
        }
    }, []);

    const [notificationEnabled, setNotificationEnabled] = useState(false);

    useEffect(() => {
        setNotificationEnabled(
            tmpUser?.userNotificationsEnabled!!
        )
    }, []);

    useEffect(() => {
        updateInitUserShell({
            ...tmpUser,
            userNotificationsEnabled: notificationEnabled
        })
    }, [notificationEnabled])

    const handleContinue = () => {
        router.push('/(home)/home')
    }

    return (
        <View className="flex-1 w-full flex flex-col items-center justify-between">
            <Text className="text-white text-4xl font-ralewayExtraBold">
                Estamos casi listos
            </Text>
            <Text className="text-white text-center text-xl font-ralewaySemiBold mb-4">
                Subir Foto de Perfil
            </Text>
            <ImagePicker
                imgUrl={profileImage}
                setImg={setprofileImage}
            />

            <Text className="text-white text-center text-xl font-ralewaySemiBold mb-4">
                Activar notificaciones
            </Text>
            <View className='items-center'>
                <Switch
                    style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
                    onValueChange={() => setNotificationEnabled(prevState => !prevState)}
                    value={notificationEnabled}
                    thumbColor="#fff"
                    trackColor={{ false: "#000099", true: "#16243E" }}
                    ios_backgroundColor={isDark ? "#333" : "#ddd"}
                />
            </View>

            <View className='w-full'>
                <CTAButtonPrimary
                    onPress={handleContinue}
                    text="Continuar"
                />
            </View>
        </View>
    );
};

export default Form06;
