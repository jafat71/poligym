import { onBoardingImages } from '@/constants'
import { useTheme } from '@/context/ThemeContext'
import React from 'react'
import { ImageBackground, Text, View } from 'react-native'

const Welcome = () => {
    const { isDark } = useTheme()

    console.log(onBoardingImages[0])
    return (
        <ImageBackground
            source={isDark ? onBoardingImages[0] : onBoardingImages[1]}
            className="flex-1 justify-center items-center w-full h-full"
            resizeMode="cover" 
        >
            <View className="flex-1 justify-center items-center ">
                <Text className={`font-ralewayBold text-3xl`}>
                    Welcome Poligym
                </Text>
            </View>
        </ImageBackground>
    )
}

export default Welcome
