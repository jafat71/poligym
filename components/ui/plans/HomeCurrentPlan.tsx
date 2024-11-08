import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { router } from 'expo-router';
import { useUser } from '@/context/UserContext';
import React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SlideToAction from '@/components/animatedUi/SlideToAction';

const HomeCurrentPlan = () => {
    const { userSelectedPlan, loggedUserInfo } = useUser()
    const { setScreenPlan } = useNavigationFlowContext()

    const handleNavigation = () => {
        setScreenPlan(userSelectedPlan)
        router.push('/(tabs)/(home)/plandetail')
    }

    if (!userSelectedPlan) {
        return (
            <Pressable 
                onPress={handleNavigation}
                className="w-full h-[280px] rounded-3xl overflow-hidden"
            >
                <Image
                source={{ uri: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                className="w-full h-full absolute"
                    resizeMode="cover"
                />
                
                <LinearGradient
                    colors={[
                        'rgba(0,85,249,0.1)',
                        'rgba(0,85,249,0.6)',
                        'rgba(0,85,249,0.95)'
                    ]}
                    className="absolute w-full h-full"
                />

                <View className="flex-1 p-6 justify-between">
                    {/* Header Section */}
                    <View className="flex-row items-center justify-between">
                        <View className="bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5">
                            <Text className="text-white text-sm font-ralewayBold">
                                ¡Comienza Ahora!
                            </Text>
                        </View>
                        <View className="bg-white/20 rounded-full px-4 py-1.5 flex-row items-center">
                            <Ionicons name="fitness-outline" size={14} color="white" />
                            <Text className="text-white text-sm font-ralewayBold ml-1">
                                Personalizado
                            </Text>
                        </View>
                    </View>

                    {/* Middle Section - Mensaje Persuasivo */}
                    <View className="space-y-2">
                        <Text className="text-white text-2xl font-ralewayExtraBold">
                            ¡Hola {loggedUserInfo?.userName?.split(' ')[0]}!
                        </Text>
                        <Text className="text-white/90 font-ralewayMedium text-base line-clamp-2">
                            Hemos seleccionado planes perfectos para tu objetivo de{' '}
                            <Text className="font-ralewayBold">{loggedUserInfo?.userObjetive || 'entrenamiento'}</Text>
                        </Text>
                    </View>

                    {/* Bottom Section - Stats y Botón */}
                    <View className="space-y-4">
                        <View className="flex-row items-center space-x-4">
                            <View className="flex-row items-center bg-white/10 rounded-full px-3 py-1.5">
                                <Ionicons name="trending-up-outline" size={14} color="white" />
                                <Text className="text-white font-ralewayBold ml-1 text-sm">
                                    Progresivo
                                </Text>
                            </View>
                            
                            <View className="flex-row items-center bg-white/10 rounded-full px-3 py-1.5">
                                <Ionicons name="medal-outline" size={14} color="white" />
                                <Text className="text-white font-ralewayBold ml-1 text-sm">
                                    Adaptado a ti
                                </Text>
                            </View>
                        </View>

                        {/* Botón Explorar */}
                        <View className="bg-white/20 backdrop-blur-md rounded-2xl p-4">
                            <View className="flex-row items-center justify-between">
                                <Text className="text-white font-ralewayBold">
                                    Explorar planes recomendados
                                </Text>
                                <View className="bg-white rounded-full p-2">
                                    <Ionicons name="arrow-forward" size={18} color="#0055f9" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        );
    }

    return (
        <Pressable
            onPress={handleNavigation}
            className="w-full h-[280px] rounded-lg overflow-hidden"
        >
            <Image
                source={{ uri: userSelectedPlan?.imagenPlanEntrenamiento }}
                className="w-full h-full absolute"
                resizeMode="cover"
            />

            <LinearGradient
                colors={[
                    'rgba(0,85,249,0.1)',
                    'rgba(0,85,249,0.6)',
                    'rgba(0,85,249,0.95)'
                ]}
                className="absolute w-full h-full"
            />

            <View className="flex-1 p-6 justify-between">
                <View className="flex-row items-center justify-between">
                    <View className="bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5">
                        <Text className="text-white text-sm font-ralewayBold">
                            Tu Plan Actual
                        </Text>
                    </View>
                    <View className="bg-eBlue-500 rounded-full px-4 py-1.5 flex-row items-center">
                        <Ionicons name="time-outline" size={14} color="white" />
                        <Text className="text-white text-sm font-ralewayBold ml-1">
                            {userSelectedPlan?.duracion}w
                        </Text>
                    </View>
                </View>

                {/* Middle Section - Nombre y Descripción */}
                <View className="space-y-2">
                    <Text className="text-white text-2xl font-ralewayExtraBold">
                        {userSelectedPlan?.nombre}
                    </Text>
                    <Text className="text-white/80 font-ralewayMedium text-sm line-clamp-2">
                        {userSelectedPlan?.descripcion}
                    </Text>
                </View>

                {/* Bottom Section - Stats y Botón */}
                <View className="space-y-4">
                    <View className="flex-row items-center space-x-4">

                        <View className="flex-row items-center bg-white/10 rounded-full px-3 py-1.5">
                            <Ionicons name="flame-outline" size={14} color="white" />
                            <Text className="text-white font-ralewayBold ml-1 text-sm">
                                {userSelectedPlan?.dificultad}
                            </Text>
                        </View>
                    </View>

                    {/* Botón Continuar */}
                    <View className="bg-white/20 backdrop-blur-md rounded-2xl h-14 overflow-hidden">
                        {/* <SlideToAction
                            onComplete={handleNavigation}
                        /> */}
                        <View className="flex-1 items-center justify-center">
                            <Text className="text-white font-ralewayBold">
                                Continuar
                            </Text>
                        </View>
                    </View>

                </View>
            </View>
        </Pressable>
    );
}

export default HomeCurrentPlan;