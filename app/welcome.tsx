import React from 'react'
import { View } from 'react-native'
import { router } from 'expo-router'

import { useTheme } from '@/context/ThemeContext'

import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary'
import CTAButtonSecondary from '@/components/ui/common/buttons/CtaButtonSecondary'
import OnBoardingSwiper from '@/components/animatedUi/OnBoardingSwiper';

const Welcome = () => {

    const { isDark } = useTheme()
    return (
        <View className={`flex flex-1 flex-col justify-center ${isDark ? "bg-darkGray-500" : "bg-white"} `}>

            <OnBoardingSwiper />
            <View className='flex flex-col items-center justify-center py-2'>

                <CTAButtonPrimary
                    onPress={() => {
                        router.push('/(auth)/signup')
                    }}
                    text='Registrarse'
                />

                <CTAButtonSecondary
                    onPress={() => {
                        router.push('/(auth)/signin')
                    }}
                    text='Iniciar sesión'
                />
            </View>

        </View>

    )
}

export default Welcome
