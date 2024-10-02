import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { useImagePicker } from '@/hooks/useImagePicker';
import ImagePicker from '@/components/ui/image/ImagePicker';

const Form07 = () => {
    const { isDark } = useTheme()
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const {} = useImagePicker();

    return (
        <>
            <View className='my-2'>
                <Text className={`text-2xl font-ralewayExtraBold text-white text-center`}>Subir foto de perfil</Text>

                <View className='w-full items-center my-3'>
                    <ImagePicker/>
                </View>

                <View className='w-full items-center mt-3'>
                    <Text className={`text-2xl font-ralewayExtraBold text-white text-center mb-2`}>¿Activar notificaciones?</Text>
                    <Switch
                        style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
                        onValueChange={() => setNotificationEnabled(prevState => !prevState)}
                        value={notificationEnabled}
                        thumbColor={notificationEnabled ? '#77FFAA' : '#f4f3f4'}
                        trackColor={{ false: '#767577', true: isDark ? "#0059FF" : "#16243E" }}
                    />
                </View>

            </View>
        </>
    );
};

export default Form07;
