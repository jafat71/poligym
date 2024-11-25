
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const SkipButton = () => {
    return (
        <TouchableOpacity
            onPress={ ()=> {
                router.replace('/(root)/(tabs)/home')
            }}
        >
            <Text className={`text-white font-ralewaySemiBold`}>OMITIR</Text>
        </TouchableOpacity>
    );
};

export default SkipButton;
