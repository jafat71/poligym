import CTAButtonSecondary from '@/components/ui/buttons/CtaButtonSecondary'
import MainLogoCustomComponent from '@/components/ui/logo/mainLogo'
import OnBoardingUIItem from '@/components/ui/OnBoardingUIItem'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

//On Boarding Screen - Página de Bienvenida
const Welcome = () => {

    return (
        <SafeAreaView className={"p-2 flex flex-1 flex-col justify-center bg-eBlue-500"}>

            <View className='w-full items-center'>
                <MainLogoCustomComponent
                    height='200'
                    width='200'
                    principal='#fff'
                />

            </View>
            <Text className='text-9xl font-ralewayExtraBold text-white '>POLI</Text>
            <Text className='text-9xl font-ralewayExtraBold text-darkGray-500 '>GYM</Text>

            <View className="flex-1 justify-around items-center text-center">
                <OnBoardingUIItem width={75}/>
                <OnBoardingUIItem width={150}/>
                <OnBoardingUIItem width={250}/>

                <CTAButtonSecondary
                    route="/(auth)/signin"
                    text="Empezar ya!"
                />

            </View>
        </SafeAreaView>

    )
}

export default Welcome
