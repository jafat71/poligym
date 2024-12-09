
import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    title: string;
    onPress: ((event: GestureResponderEvent) => void) | undefined,
}

const AuthSupportButton = ({ title, onPress }: Props) => {
    return (
        <View className='w-full items-end justify-end mt-1'>
            <TouchableOpacity
                className='mt-1'
                onPress={onPress}
            >
                <Text className={`text-sm  font-ralewayBold text-eOrange-500 `}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AuthSupportButton;
