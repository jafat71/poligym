import OnBoardingSwiper from '@/components/animatedUi/OnBoardingSwiper'
import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary'
import CTAButtonSecondary from '@/components/ui/common/buttons/CtaButtonSecondary'
import { useTheme } from '@/context/ThemeContext'
import { router } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

//On Boarding Screen - Página de Bienvenida
const Welcome = () => {

    const { isDark } = useTheme()
    return (
        <SafeAreaView className={`flex flex-1 flex-col justify-center ${isDark ? "bg-darkGray-500" : "bg-white"} `}>

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

        </SafeAreaView>

    )
}

export default Welcome
