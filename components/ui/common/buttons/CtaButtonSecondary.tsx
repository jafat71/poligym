
import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';

interface Props {
    onPress: ((event: GestureResponderEvent) => void) | undefined,
    text: string,
}

const CTAButtonSecondary = ({ onPress, text}: Props) => {

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <Text className={`w-full rounded-xl text-base text-center
                text-eBlue-500 my-1
                py-4 bg-inherit px-24  font-ralewayExtraBold`}>{text}</Text>
        </TouchableOpacity>
    );
};


export default CTAButtonSecondary;
