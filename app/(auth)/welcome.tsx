import MainLogoCustomComponent from '@/components/ui/mainLogo'
import { mainLogo, onBoardingImages } from '@/constants'
import { useTheme } from '@/context/ThemeContext'
import React from 'react'
import { Image, ImageBackground, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
//On Boarding Screen - Página de Bienvenida
const Welcome = () => {
    const { isDark } = useTheme()

    console.log(onBoardingImages)
    return (
        <ImageBackground
            source={isDark ? onBoardingImages[0] : onBoardingImages[1]}
            className="flex-1 justify-center items-center w-full h-full"
            resizeMode="cover"
        >
            <SafeAreaView className='p-4 flex flex justify-around items-center'>
                <View className='w-full'>
                    <MainLogoCustomComponent  width='100' principal='#222222'/>
                </View>
                <View className="flex-1 justify-around items-center ">

                    <Text className={`font-ralewayBold text-3xl ${isDark ? "text-white-100" : "text-darkGray-500"}`}>
                        Crea la mejor versión de ti!
                    </Text>

                    <Pressable
                        className='w-full flex items-center'
                    >
                        <Text className={`font-raleway ${isDark ? "bg-orange-500 text-white-100" : "bg-skyBlue-500 text-darkGray-500"}  p-5 rounded-2xl text-3xl`}>Empezar ya!</Text>
                    </Pressable>
                </View>
            </SafeAreaView>

        </ImageBackground>
    )
}

export default Welcome
