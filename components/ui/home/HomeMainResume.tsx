import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useUser } from '@/context/UserContext';

import WeekResumeHome from '../history/weekResumeHome';
import IconButton from '../common/buttons/IconButton';
import HomePill from '../common/pills/HomePill';
import CTAButtonSuccess from '../common/buttons/CTAButtonSuccess';
import MainLogoCustomComponent from '../common/logo/mainLogo';

interface MainHomeResumeProps {
    scrollDown: () => void
}

const MainHomeResume = ({ scrollDown }: MainHomeResumeProps) => {
    const { userSelectedPlan, loggedUserInfo } = useUser()

    const handleNavigation = () => {
        router.push(`/(tabs)/(home)/playPlan/${userSelectedPlan?.id}`)
    }
    const [hasPlan, setHasPlan] = useState(false)

    useEffect(() => {
        setHasPlan(userSelectedPlan !== null)
            
    }, [userSelectedPlan])

    if(!loggedUserInfo) return <View className='flex-1 justify-center items-center  h-[460px]'><ActivityIndicator size='large' color='#0085F9' /></View>
    return (
        <View
            className={`w-full 
            ${hasPlan ? 'h-[460px]' : 'h-[420px]'} 
                rounded-lg overflow-hidden`}
        >
            <LinearGradient
                colors={[
                    'rgba(0,85,249,0.95)',
                    'rgba(0,85,249,0.8)',
                    'rgba(0,85,249,0.95)'
                ]}
                className="absolute w-full h-full"
            />
            <View className='absolute right-0 top-10 z-1 translate-x-36 '>
                <MainLogoCustomComponent
                    height='300'
                    width='300'
                    principal='#0085F9'
                />
            </View>
            <View className='flex-1 z-30'>
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
                            <View className="flex-1 px-4 justify-between">
                                <View className="flex-row items-center justify-between">
                                    <Text className="text-white text-sm font-ralewayBold">
                                        Plan Actual
                                    </Text>
                                <HomePill
                                    icon="time-outline"
                                    text={`${userSelectedPlan?.workouts.length} sesiones / semana`}
                                />
                            </View>

                            <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                className="text-white font-ralewayBold text-4xl">
                                {userSelectedPlan?.name}
                            </Text>
                            <View className='my-2'>
                                <CTAButtonSuccess onPress={handleNavigation} text="Continuar" />
                            </View>
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

        </View>
    );
}

export default MainHomeResume;