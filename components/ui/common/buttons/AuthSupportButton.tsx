
import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    title: string;
    onPress: ((event: GestureResponderEvent) => void) | undefined,
}

const AuthSupportButton = ({ title, onPress }: Props) => {
    return (
        <View className='w-full items-end justify-end'>
            <TouchableOpacity
                className='mt-1'
                onPress={onPress}
            >
                <Text className={`text-sm  font-ralewayExtraBold text-eBlue-500 `}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AuthSupportButton;
