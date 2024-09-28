

import { useTheme } from '@/context/ThemeContext';
import { Href, router } from 'expo-router';
import React from 'react';
import { Pressable, Text} from 'react-native';

interface Props {
    route: Href<string | object>,
    text: string
}

const CTAButton = ({route, text}:Props) => {
    const { isDark } = useTheme()

    return (
        <Pressable
        onPress={()=>{
            router.replace(route)
        }}
    >
        <Text className={`p-4 w-full rounded-full px-20 font-ralewaySemiBold 
            text-2xl shadow-xl shadow-darkGray-800 text-center mt-1
            ${isDark ? " bg-[#00FF3E] text-darkGray-500" : "bg-[#9320ff] text-white-100"}`}>
            {text}
        </Text>
    </Pressable>
    );
};

export default CTAButton;
