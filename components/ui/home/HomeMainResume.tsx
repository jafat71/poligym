import React from 'react';
import { Text, View, Image } from 'react-native';

import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { useUser } from '@/context/UserContext';

import WeekResumeHome from '../history/weekResumeHome';
import IconButton from '../common/buttons/IconButton';
import HomePill from '../common/pills/HomePill';
import CTAButtonSuccess from '../common/buttons/CTAButtonSuccess';

interface MainHomeResumeProps {
    scrollDown: () => void
}

const MainHomeResume = ({ scrollDown }: MainHomeResumeProps) => {
    const { userSelectedPlan, loggedUserInfo } = useUser()
    const { setScreenPlan } = useNavigationFlowContext()


    const handleNavigation = () => {
        setScreenPlan(userSelectedPlan)
        router.push('/(tabs)/(home)/plandetail')
    }

    const hasPlan = userSelectedPlan !== null

    return (
        <View
            className="w-full h-[420px] rounded-lg overflow-hidden"
        >
            <Image
                source={{ uri: userSelectedPlan?.imagenPlanEntrenamiento }}
                className="w-full h-full absolute"
                resizeMode="cover"
            />

            <LinearGradient
                colors={[
                    'rgba(0,85,249,0.95)',
                    'rgba(0,85,249,0.8)',
                    'rgba(0,85,249,0.95)'
                ]}
                className="absolute w-full h-full"
            />

            <View className='p-4 flex flex-row justify-between'>
                <View className='flex flex-col '>
                    <Text className='text-white font-ralewayBold text-sm'>Hola</Text>
                    <Text className='text-white font-ralewayBold text-4xl'>{loggedUserInfo?.name.split(' ')[0]}</Text>
                </View>
                <View>
                    <IconButton
                        icon={<Ionicons name="pencil-outline" size={24} color="white" />}
                        onPress={() => {
                            router.push('/(root)/(config)/updateinformation')
                        }}
                    />
                </View>
            </View>

            <WeekResumeHome />

            {
                hasPlan ? (
                    <View className="flex-1 p-4 justify-between">
                        <View className="flex-row items-center justify-between">
                            <View className="bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5">
                                <Text className="text-white text-sm font-ralewayBold">
                                    Tu Plan Actual
                                </Text>
                            </View>
                            <HomePill
                                icon="time-outline"
                                text={`${userSelectedPlan?.duracion} sem.`}
                            />
                            <HomePill
                                icon="flame-outline"
                                text={`${userSelectedPlan?.dificultad}`}
                            />
                        </View>

                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            className="text-white font-ralewayBold text-2xl ">
                            {userSelectedPlan?.nombre}
                        </Text>
                        <CTAButtonSuccess onPress={handleNavigation} text="Continuar" />
                    </View>
                ) : (
                    <View className="flex-1 p-4 justify-between">
                        <View>
                            <Text className="text-white text-sm font-ralewayBold">
                                Plan de Entrenamiento
                            </Text>
                            <Text className="text-white font-ralewayLight text-xl line-clamp-2">
                                No tienes un plan activo. 
                            </Text>
                        </View>
                        <CTAButtonSuccess onPress={scrollDown} text="Explorar" />
                    </View>
                )
            }

        </View>
    );
}

export default MainHomeResume;