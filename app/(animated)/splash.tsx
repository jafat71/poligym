import { View, Text } from 'react-native'
import React from 'react'
import CustomSplash from '@/components/animatedUi/CustomSplash'
import { router } from 'expo-router'
import { useUser } from '@/context/UserContext'

const splash = () => {
    const { userLogged } = useUser()
    setTimeout(() => {
        userLogged ? router.replace('/(root)/(tabs)/home') : router.replace('/welcome')
    }, 4000)
    return (
        <CustomSplash />
    )
}

export default splash