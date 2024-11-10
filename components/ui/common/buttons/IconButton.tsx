

import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

interface Props {
    onPress: ((event: GestureResponderEvent) => void) | undefined;
    icon: React.ReactNode;
}

const IconButton = ({ icon, onPress }: Props) => {
    return (
        <TouchableOpacity
            className={`transition-all duration-200 
            rounded-md   bg-eBlue-500`}
            onPress={onPress}
        >
            {
                icon
            }
        </TouchableOpacity>
    );
};

export default IconButton;
