import React from 'react'
import { View } from 'react-native'
import { router } from 'expo-router'

import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary'
import CTAButtonSecondary from '@/components/ui/common/buttons/CtaButtonSecondary'
import OnBoardingSwiper from '@/components/animatedUi/OnBoardingSwiper';

const Welcome = () => {

    return (
        <View className={`flex flex-1 flex-col justify-center bg-eBlue-500 `}>

            <OnBoardingSwiper />
            <View className='flex flex-col items-center justify-center'>

                <CTAButtonPrimary
                    onPress={() => {
                        router.navigate('/(auth)/signup')
                    }}
                    text='Registrarse'
                />

                <CTAButtonSecondary
                    onPress={() => {
                        router.navigate('/(auth)/signin')
                    }}
                    text='Iniciar sesión'
                    testID='signin-button'
                />
            </View>

        </View>

    )
}

export default Welcome
