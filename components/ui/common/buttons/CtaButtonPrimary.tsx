import React from 'react';
import { GestureResponderEvent, Keyboard, Pressable, Text, View, ActivityIndicator, TouchableHighlight } from 'react-native';

interface Props {
    onPress: ((event: GestureResponderEvent) => void) | undefined,
    text: string,
    disabled?: boolean,
    isLoading?: boolean,
    extraClassname?: string
}

const CTAButtonPrimary = ({ onPress, text, disabled = false, isLoading = false, extraClassname = "" }: Props) => {

    const handlePress = (event: GestureResponderEvent) => {
        Keyboard.dismiss();
        onPress?.(event);
    };
    return (
        <TouchableHighlight
            onPress={handlePress}
            className={`w-full items-center ${disabled ? 'opacity-70' : ''}`}
            disabled={disabled}
        >
            <View className={`w-full rounded-sm flex-row justify-center items-center
                bg-eBlue-500 px-28 py-4 ${extraClassname}`}>
                {
                    isLoading ? (
                        <ActivityIndicator color="white" size={20} />
                    ) : (
                        <Text className={`text-base text-center
                            text-white font-ralewayExtraBold`}>
                            {text}
                        </Text>
                    )
                }
            </View>
        </TouchableHighlight>
    );
};

export default CTAButtonPrimary;