import WeekChecklistComponent from '@/components/ui/buttons/Checklist';
import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import ImagePicker from '@/components/ui/image/ImagePicker';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { DaysWeek, Schedule } from '@/types/interfaces/entities/user';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
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

                <View className='w-full items-center mt-3'>
                    <View className={`pb-2 items-start`}>
                        <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} text-center`}>¿Deseas activar las notificaciones?</Text>
                    </View>
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
        </>
    );
};

export default Form05;
