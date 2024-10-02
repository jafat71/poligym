

import RadioButtonSmallComponent from '@/components/ui/buttons/RadioButtonSmall';
import ImagePicker from '@/components/ui/image/ImagePicker';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const EditProfile = () => {
    const { isDark } = useTheme()

    return (
        <SafeAreaView className={`flex flex-1 ${isDark ? "bg-darkGray-500" : "bg-eBlue-600"} `}>
            <View className='p-4'>
                <View className={`flex flex-row items-center `}>
                    <TouchableOpacity
                        onPress={() => {
                            router.back()
                        }}
                    >
                        <Ionicons name="arrow-back" size={32} color={`#fff`} />
                    </TouchableOpacity>
                    <Text className='text-3xl ml-2 text-white font-ralewayBold'>Editar Perfil</Text>
                </View>


                <View className='p-4 mt-2 bg-eBlue-800 rounded-lg shadow-2xl shadow-eBlue-700'>
                    <View className='w-full items-center mt-2'>
                        <ImagePicker />
                    </View>
                    <View className='flex flex-row items-center justify-between'>
                        <Text className='text-base font-ralewayBold w-16 text-white'>Nombre </Text>
                        <TextInput
                                className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
                                placeholder="Jhon Doe"
                                keyboardType="ascii-capable"
                                placeholderTextColor="#FFFFFF"
                            />
                    </View>
                    <View className='flex flex-row items-center justify-between'>
                        <Text className='text-base font-ralewayBold w-16 text-white'>Edad </Text>
                        <TextInput
                                className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
                                placeholder="18"
                                keyboardType="number-pad"
                                placeholderTextColor="#FFFFFF"
                            />
                    </View>

                    <View className='flex flex-row items-center justify-between'>
                        <Text className='text-base font-ralewayBold w-16 text-white'>Género </Text>
                        <View className='w-full items-center'>
                            <RadioButtonSmallComponent
                                options={['Hombre','Mujer']}
                            />
                        
                        </View>
                    </View>

                    <View className='flex flex-row items-center justify-between'>
                        <Text className='text-base font-ralewayBold w-16 text-white'>Peso </Text>
                        <TextInput
                                className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
                                placeholder="70"
                                keyboardType="number-pad"
                                placeholderTextColor="#FFFFFF"
                            />
                            <Text className='text-white font-ralewayBold ml-2'>KG</Text>
                    </View>

                    <View className='flex flex-row items-center justify-between'>
                        <Text className='text-base font-ralewayBold w-16 text-white'>Altura </Text>
                        <TextInput
                                className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
                                placeholder="166"
                                keyboardType="number-pad"
                                placeholderTextColor="#FFFFFF"
                            />
                            <Text className='text-white font-ralewayBold ml-2'>CM</Text>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    );
};

export default EditProfile;
