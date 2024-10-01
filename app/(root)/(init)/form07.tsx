import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react';
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const Form07 = () => {
    const { isDark } = useTheme()
    const [image, setImage] = useState<string | null>(null);
    const [notificationEnabled, setNotificationEnabled] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <>
            <View className='my-2'>
                <Text className={`text-2xl font-ralewayExtraBold text-white text-center`}>Subir foto de perfil</Text>

                <View className='w-full items-center my-3'>
                    <TouchableOpacity
                        onPress={pickImage}
                    >
                        {image
                            ? (
                                <View className={`w-24 h-24 rounded-full mt-2  flex items-center justify-center p-1 ${isDark ? "bg-eBlue-500" : "bg-eBlue-900"}  `}>
                                    <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 60 }} resizeMode='cover' />
                                </View>
                            )
                            : (
                                <View className={`w-24 h-24 rounded-full  flex items-center justify-center p-1 ${isDark ? "bg-eBlue-500" : "bg-eBlue-900"}  `}>
                                    <Ionicons name="camera" size={42} color={`#fff`} />
                                </View>
                            )
                        }

                    </TouchableOpacity>



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
