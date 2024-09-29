import OnboardingItem from '@/components/animatedUi/onboardingText'
import OnBoardingText from '@/components/animatedUi/onboardingText'
import CTAButtonSecondary from '@/components/ui/CtaButtonSecondary'
import MainLogoGradientComponent from '@/components/ui/mainLogoGrandient'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
//On Boarding Screen - Página de Bienvenida
const Welcome = () => {

    return (
        <SafeAreaView className={"p-2 flex flex-1 flex-col justify-center bg-eBlue-500"}>

            <View className='w-full items-center'>
                <MainLogoGradientComponent
                    height='200'
                    width='200'
                    principal='#fff'
                    secondary='#fff'
                />

            </View>
            <Text className='text-9xl font-ralewayExtraBold text-white '>POLI</Text>
            <Text className='text-9xl font-ralewayExtraBold text-darkGray-500 '>GYM</Text>

            <View className="flex-1 justify-around items-center text-center">
                <OnboardingItem width={75}/>
                <OnboardingItem width={150}/>
                <OnboardingItem width={250}/>

                <CTAButtonSecondary
                    route="/(auth)/signin"
                    text="Empezar ya!"
                />

            </View>
        </SafeAreaView>

    )
}

export default Welcome
