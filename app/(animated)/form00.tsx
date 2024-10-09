

import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import MainLogoGradientComponent from '@/components/ui/logo/mainLogoGrandient';
import { FloatingMessage } from '@/components/animatedUi/FloatingMessage';
import { router } from 'expo-router';
import { useUser } from '@/context/UserContext';
const Form00 = () => {

    const {setEmptyUser} = useUser()
    useEffect(() => {
        setEmptyUser()
        setTimeout(() => {
            router.replace('/(init)/form01')
        }, 2000);
    }, [])
    

    return (

        <SafeAreaView className={`p-2 pt-6 flex flex-1 flex-col justify-center items-center bg-darkGray-500`}>

            <MainLogoGradientComponent
                height='100'
                width='100'
                principal='#FFF'
                secondary='#FFF'
            />

        <FloatingMessage
            text='Estamos listos para empezar'
            distance={15}
            duration={1000}
        />
        
        </SafeAreaView>
    );
};

export default Form00;
