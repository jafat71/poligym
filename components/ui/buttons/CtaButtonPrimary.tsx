
import { Href, router } from 'expo-router';
import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

interface Props {
    route: Href<string | object>,
    text: string,
}

const CTAButtonPrimary = ({ route, text}: Props) => {
    return (
        <TouchableHighlight
            onPress={() => {
                router.push(route)
            }}

        >
            <Text className={`w-full rounded-xl text-xl text-center bg-eBlue-800 py-4 text-white px-24 shadow-xl shadow-black font-ralewayExtraBold`}>{text}</Text>
        </TouchableHighlight>
    );
};


export default CTAButtonPrimary;
