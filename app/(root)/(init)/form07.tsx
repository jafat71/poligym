import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { useImagePicker } from '@/hooks/useImagePicker';
import ImagePicker from '@/components/ui/image/ImagePicker';

const Form07 = () => {
    const { isDark } = useTheme()
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const { } = useImagePicker();

    return (
        <>
            <View className={`py-5 border-y-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
                <View className={`pb-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} w-full items-center`}>
                    <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} text-center`}>Subir Foto de Perfil</Text>
                </View>
                <View className='w-full items-center my-3'>
                    <ImagePicker />
                </View>

                <View className='w-full items-center mt-3'>
                    <View className={`pb-5 border-t-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} w-full items-center`}>
                        <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} text-center`}>¿Deseas activar las notificaciones?</Text>
                    </View>
                    <Switch
                        style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
                        onValueChange={() => setNotificationEnabled(prevState => !prevState)}
                        value={notificationEnabled}
                        thumbColor={isDark ? "#fff" : "#16243E"}
                        trackColor={{ false: isDark ? "#ddds" : "#ddd", true: isDark ? "#fff" : "#16243E" }}
                        ios_backgroundColor={isDark ? "#333" : "#ddd"}
                    />
                </View>

            </View>
        </>
    );
};

export default Form07;
