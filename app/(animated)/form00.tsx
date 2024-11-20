import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import { router } from 'expo-router';

import { useNavigationFlowContext } from '@/context/NavFlowContext';

import { emptyUser } from '@/constants';

import WelcomeAnimatedLoading from '@/components/animatedUi/WelcomeAnimatedLoading';

const Form00 = () => {

    const {updateInitUserShell} = useNavigationFlowContext()
    useEffect(() => {
        updateInitUserShell(emptyUser)
        setTimeout(() => {
            router.replace('/(init)/form01')
        }, 3000);
    }, [])
    
    return (
        <SafeAreaView className={`p-2 pt-6 flex flex-1 flex-col justify-center items-center bg-eBlue-500`}>
            <WelcomeAnimatedLoading/>
        </SafeAreaView>
    );
};

export default Form00;
