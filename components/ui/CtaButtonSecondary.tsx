
import { Href, router } from 'expo-router';
import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

interface Props {
    route: Href<string | object>,
    text: string,
}

const CTAButtonSecondary = ({ route, text}: Props) => {

    return (
        <TouchableHighlight
            onPress={() => {
                router.replace(route)
            }}

        >
            <Text className={`w-full rounded-xl text-xl text-center bg-lightGreen py-4 text-darkGray-500 px-24 shadow-xl shadow-black font-ralewayExtraBold`}>{text}</Text>
        </TouchableHighlight>
    );
};


export default CTAButtonSecondary;
