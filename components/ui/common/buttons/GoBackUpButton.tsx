import { TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const GoBackUpButton = () => {
    return (
        <TouchableOpacity
            onPress={() => router.back()}
            className='absolute top-8 left-2 z-20 p-2 rounded-full bg-black/30'
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
        >
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
    )
}

export default GoBackUpButton