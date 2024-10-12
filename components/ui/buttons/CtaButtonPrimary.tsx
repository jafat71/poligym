
import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';

interface Props {
    onPress: ((event: GestureResponderEvent) => void) | undefined,
    text: string,
}

const CTAButtonPrimary = ({ onPress, text}: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <Text className={`w-full rounded-xl text-base text-center
                text-white my-1 
                py-4 bg-eBlue-500 px-28 font-ralewayExtraBold`}>{text}</Text>
        </TouchableOpacity>
    );
};


export default CTAButtonPrimary;
