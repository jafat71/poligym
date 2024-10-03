

import RadioButtonSmallComponent from '@/components/ui/buttons/RadioButtonSmall';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, Text, useColorScheme, View } from 'react-native';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';

const Config = () => {
    const { isDark } = useTheme()
    const [notificationEnabled, setNotificationEnabled] = useState(false);

    return (
        <SafeAreaView className={`flex flex-1 ${isDark ? "bg-darkGray-500" : "bg-eBlue-800"} `}>
            <View className='p-4'>
                <View className='flex flex-row items-center justify-between'>
                    <TouchableOpacity
                        onPress={() => {
                            router.push('/(drawer)/(profile)/profile')
                        }}
                    >
                        <Ionicons name="arrow-back" size={32} color={`#fff`} />
                    </TouchableOpacity>
                    <View className={`flex flex-row items-center `}>
                        <Ionicons name="settings-sharp" size={32} color={`#fff`} />
                        <Text className='text-3xl ml-2 text-white font-ralewayBold'>Configuración</Text>
                    </View>
                </View>

                <View>
                    <View className='mt-2 border-[1px] border-white' />
                    <View className='w-full items-end'>
                        <Text className='text-white font-raleway'>Gestión de Perfil</Text>
                    </View>
                </View>

            </View>

            <View className='px-4'>
                <TouchableOpacity
                    onPress={() => {
                        router.navigate('/(profile)/updateinformation')
                    }}
                    className='mb-2'>
                    <View className='flex flex-row items-center gap-3'>
                        <Ionicons name="person-sharp" size={24} color={`#fff`} />
                        <Text className='text-xl text-white font-ralewayBold'>Actualizar Información</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className='mb-2'
                    onPress={()=>{
                        router.push('/(auth)/update')
                    }}
                >
                    <View className='flex flex-row items-center gap-3'>
                        <Ionicons name="shield-checkmark-outline" size={24} color={`#fff`} />

                        <Text className='text-xl text-white font-ralewayBold'>Actualizar Contraseña</Text>
                    </View>
                </TouchableOpacity>

                <View className='mb-4'>
                    <View className='mt-2 border-[1px] border-white' />
                    <View className='w-full items-end'>
                        <Text className='text-white font-raleway'>Preferencias de Usuario</Text>
                    </View>
                </View>

                <View className='mt-2'>
                    <View className='flex flex-row items-center justify-between gap-3'>
                        <Ionicons name="moon" size={24} color={`#fff`} />
                        <Text className='text-xl text-white font-ralewayBold'>Tema Oscuro</Text>
                        <Switch
                            className='flex-1'
                            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                            thumbColor={'#f4f3f4'}
                            trackColor={{ false: '#767577', true: isDark ? "#0059FF" : "#16243E" }}
                        />
                    </View>
                    <View className='flex flex-row items-center justify-start gap-3'>
                        <Ionicons name="alarm" size={24} color={`#fff`} />

                        <Text className='text-xl text-white font-ralewayBold'>Notificaciones</Text>
                        <Switch
                            className='flex-1'
                            style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                            onValueChange={() => setNotificationEnabled(prevState => !prevState)}
                            value={notificationEnabled}
                            thumbColor={notificationEnabled ? '#77FFAA' : '#f4f3f4'}
                            trackColor={{ false: '#767577', true: isDark ? "#0059FF" : "#16243E" }}
                        />
                    </View>

                </View>


                <View className='mb-4'>
                    <View className='mt-2 border-[1px] border-white' />
                    <View className='w-full items-end'>
                        <Text className='text-white font-raleway'>Información</Text>
                    </View>
                </View>

                <TouchableOpacity className='mb-2'>
                    <View className='flex flex-row items-center gap-3'>
                        <Ionicons name="document-attach" size={24} color={`#fff`} />

                        <Text className='text-xl text-white font-ralewayBold'>Terminos y Condiciones</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className='mb-2'>
                    <View className='flex flex-row items-center gap-3'>
                        <Ionicons name="documents" size={24} color={`#fff`} />

                        <Text className='text-xl text-white font-ralewayBold'>FAQs</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className='mb-2'>
                    <View className='flex flex-row items-center gap-3'>
                        <Ionicons name="text" size={24} color={`#fff`} />

                        <Text className='text-xl text-white font-ralewayBold'>Acerca de</Text>
                    </View>
                </TouchableOpacity>

                <View className='mb-4'>
                    <View className='mt-2 border-[1px] border-white' />
                    <View className='w-full items-end'>
                        <Text className='text-white font-raleway'>Cuenta</Text>
                    </View>
                </View>

                <TouchableOpacity className='mb-2'
                    onPress={()=>{
                        router.push('/(auth)/delete')
                    }}
                >
                    <View className='flex flex-row items-center gap-3'>
                        <Ionicons name="flash-off-sharp" size={24} color={`#E11F1C`} />
                        <Text className='text-xl text-redEPN-500 font-ralewayBold'>Eliminar Cuenta</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity className='mb-2'
                     onPress={()=>{
                        router.replace('/(auth)/signin')
                    }}
                >
                    <View className='flex flex-row items-center gap-3'>
                    <Ionicons name="exit-outline" size={24} color={`#E11F1C`} />
                        <Text className='text-xl text-redEPN-500 font-ralewayBold'>Salir</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

export default Config;
