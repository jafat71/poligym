import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    onPress: ((event: GestureResponderEvent) => void) | undefined,
    text: string,
    disabled?: boolean,
    children?: React.ReactNode,
}

const CTAButtonPrimary = ({ onPress, text, disabled, children }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`w-full items-center ${disabled ? 'opacity-70' : ''}`}
            disabled={disabled}
        >
            <View className={`w-full rounded-xl flex-row justify-center items-center
                bg-eBlue-500 px-28 py-4`}>
                <Text className={`text-base text-center
                    text-white font-ralewayExtraBold`}>{text}</Text>
                {children}
            </View>
        </TouchableOpacity>
    );
};

export default CTAButtonPrimary;