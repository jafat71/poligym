import React from 'react';
import { GestureResponderEvent, Keyboard, Pressable, Text, View, ActivityIndicator } from 'react-native';

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
        <Pressable
            onPress={handlePress}
            className={`w-full items-center ${disabled ? 'opacity-70' : ''}`}
            disabled={disabled}
        >
            <View className={`w-full rounded-sm flex-row justify-center items-center
                bg-eBlue-500 px-28 py-4 ${extraClassname}`}>
                {
                    isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className={`text-base text-center
                            text-white font-ralewayExtraBold`}>
                            {text}
                        </Text>
                    )
                }
            </View>
        </Pressable>
    );
};

export default CTAButtonPrimary;