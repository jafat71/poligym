import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary'
import CTAButtonSecondary from '@/components/ui/common/buttons/CtaButtonSecondary'
import MainLogoCustomComponent from '@/components/ui/common/logo/mainLogo'
import { OnboardingItems } from '@/constants'
import { useTheme } from '@/context/ThemeContext'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'

//On Boarding Screen - Página de Bienvenida
const Welcome = () => {

    const { isDark } = useTheme()
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <SafeAreaView className={`flex flex-1 flex-col justify-center ${isDark ? "bg-darkGray-500" : "bg-white"} `}>

            <View className='absolute w-full top-1/4 items-center z-10 '>
                <MainLogoCustomComponent
                    height='75'
                    width='75'
                    principal='#fff'
                />
                <View className='flex flex-row items-center justify-center'>
                    <Text className={`text-3xl font-ralewayExtraBold text-white`}>POLIGYM</Text>
                </View>
            </View>


            <View className="flex-1 justify-around items-center text-center">
                <Swiper
                    dotColor={`${isDark ? "#fff" : "#1c1c1c"}`}
                    activeDotColor="#0059ff"
                    autoplay
                    autoplayTimeout={3}
                    loop={false}
                    showsPagination={true}
                    showsButtons={false}
                    onIndexChanged={(index) => setActiveIndex(index)}
                    loadMinimal={false}
                    bounces
                >
                    {OnboardingItems.map((obItem, index) => (
                        <View key={index}
                            className={`flex flex-col items-center rounded-md h-full `}
                        >
                            <Image source={{ uri: obItem.image }}
                                resizeMode='cover'
                                className="w-full h-4/5 rounded-md mb-4" />
                            <View className='items-end p-1'>
                                <Text className={`text-xl font-ralewaySemiBold break-words text-center 
                  mb-2 ${isDark ? "text-white" : "text-darkGray-500"} `}>
                                    {obItem.title}
                                </Text>
                            </View>
                        </View>
                    ))}
                </Swiper>
            </View>

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
