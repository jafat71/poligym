

import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

interface Props {
    onPress: ((event: GestureResponderEvent) => void) | undefined;
    icon: React.ReactNode;
    testID?: string;
}

const IconButton = ({ icon, onPress, testID = "" }: Props) => {
    return (
        <TouchableOpacity
            testID={testID}
            className={`transition-all duration-200 
            rounded-md   bg-inherit`}
            onPress={onPress}
        >
            {
                icon
            }
        </TouchableOpacity>
    );
};

export default IconButton;
