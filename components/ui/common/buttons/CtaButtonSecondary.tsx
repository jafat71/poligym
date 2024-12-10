
import React from 'react';
import { GestureResponderEvent, Text, TouchableHighlight } from 'react-native';

interface Props {
    onPress: ((event: GestureResponderEvent) => void) | undefined,
    text: string,
}

const CTAButtonSecondary = ({ onPress, text}: Props) => {

    return (
        <TouchableHighlight
            onPress={onPress}
            className={`text-base text-center bg-eBlue-700 
                text-white py-4 bg-inherit px-24 w-full font-ralewayExtraBold`}
        >
            <Text className={`rounded-xl text-base text-center text-white font-ralewayExtraBold`}>{text}</Text>
        </TouchableHighlight>
    );
};


export default CTAButtonSecondary;
