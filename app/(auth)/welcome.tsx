import CTAButton from '@/components/ui/ctaButton'
import MainLogoGradientComponent from '@/components/ui/mainLogoGrandient'
import WelcomeHeaderComponent from '@/components/ui/welcomeHeader'
import { onBoardingImages } from '@/constants'
import { useTheme } from '@/context/ThemeContext'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
//On Boarding Screen - Página de Bienvenida
const Welcome = () => {
    const { isDark } = useTheme()

    return (
        <SafeAreaView className={`p-2 flex flex-1 flex-col justify-center r ${isDark ? "bg-darkGray-500" : "bg-white-100"}`}>
            <WelcomeHeaderComponent />
            <View className="flex-1 justify-around items-center text-center">

                <Text className={`font-ralewayLight text-5xl ${isDark ? "text-white-100" : "text-darkGray-500"}`}>
                    !Crea la mejor versión de ti!
                </Text>

                <Image
                    source={onBoardingImages[0]}
                    className='w-full h-3/5 ' //-translate-x-36
                    resizeMode='contain'
                />

                <CTAButton
                    route="/(auth)/signup"
                    text="Empezar ya!"
                />

            </View>
        </SafeAreaView>

    )
}

export default Welcome
