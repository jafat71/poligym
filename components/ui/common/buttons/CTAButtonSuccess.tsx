import { Text, Pressable } from 'react-native'
import React from 'react'

interface CTAButtonSuccessProps {
    onPress: () => void
    text: string
}

const CTAButtonSuccess = ({ onPress, text }: CTAButtonSuccessProps) => {
    return (
        <Pressable
            onPress={onPress}
            className="bg-blueEPN-500/10 border-2 border-blueEPN-500 backdrop-blur-md rounded-2xl h-14 overflow-hidden
        flex-row items-center justify-center
    ">
            <Text className="text-white text-2xl font-ralewayBold">{text}</Text>
        </Pressable>
    )
}

export default CTAButtonSuccess