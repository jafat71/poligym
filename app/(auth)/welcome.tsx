import CTAButton from '@/components/ui/ctaButton'
import MainLogoGradientComponent from '@/components/ui/mainLogoGrandient'
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
            <View className='w-full flex items-center mt-3'>
                <MainLogoGradientComponent width='100' height='100' principal={`${isDark ? "#fff" : "#000"}`} />
                <Text className={`font-ralewayExtraBold text-5xl ${isDark ? "text-white-100" : "text-darkGray-500"}`} >POLIGYM</Text>
            </View>
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
