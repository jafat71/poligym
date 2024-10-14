import ImagePicker from '@/components/ui/image/ImagePicker';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import React, { useEffect, useState } from 'react';
import { Switch, Text, View } from 'react-native';


const Form05 = () => {
    const { isDark } = useTheme()
    const { tmpUser, set1InitUser } = useUser()
    const [profileImage, setprofileImage] = useState('');

    useEffect(() => {
        set1InitUser({
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
        set1InitUser({
            ...tmpUser,
            userNotificationsEnabled: notificationEnabled
        })
    }, [notificationEnabled])

    return (
        <>

            <View className={`mt-2 pb-5 `}>
                <View className={`py-2`}>
                    <View className={` w-full items-start`}>
                        <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>Subir Foto de Perfil</Text>
                    </View>
                    <View className='w-full items-center my-3'>
                        <ImagePicker
                            imgUrl={profileImage}
                            setImg={setprofileImage}
                        />
                    </View>


                </View>

                <View className={`py-2 w-full`}>
                    <View className={`pb-2 items-start`}>
                        <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} text-center`}>¿Deseas activar las notificaciones?</Text>
                    </View>
                    <View className='items-center'>
                        <Switch
                            style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
                            onValueChange={() => setNotificationEnabled(prevState => !prevState)}
                            value={notificationEnabled}
                            thumbColor="#0059ff"
                            trackColor={{ false: isDark ? "#ddds" : "#ddd", true: isDark ? "#66a3ff" : "#16243E" }}
                            ios_backgroundColor={isDark ? "#333" : "#ddd"}
                        />
                    </View>
                </View>
            </View>

            <Text className={`text-sm font-ralewaySemiBold text-start  ${isDark ? "text-white" : "text-darkGray-400"} my-2 `}>
                Al habilitar las notificaciones en nuestra app, podrás recibir información clave y personalizada, como:
                recordatorios de tus sesiones de entrenamiento,
                actualizaciones sobre horarios y eventos especiales en el gimnasio,
                consejos de bienestar y salud, entre otras.
            </Text>

        </>
    );
};

export default Form05;
