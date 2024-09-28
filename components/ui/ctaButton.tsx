

import { Href, router } from 'expo-router';
import React from 'react';
import { Pressable, Text} from 'react-native';

interface Props {
    route: Href<string | object>,
    text: string
}

const CTAButton = ({route, text}:Props) => {
    return (
        <Pressable
        onPress={()=>{
            router.replace(route)
        }}
    >
        <Text className={`p-4 w-full rounded-full px-20 font-ralewaySemiBold text-2xl shadow-xl shadow-darkGray-800 ${isDark ? " bg-green-500 text-white-100" : "bg-sky-500 text-darkGray-500"}`}>
            {text}
        </Text>
    </Pressable>
    );
};

export default CTAButton;
