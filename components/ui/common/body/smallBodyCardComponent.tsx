import React from 'react';
import { View } from 'react-native';

interface BodyCardComponentProps {
    muscleImage: React.ReactNode;
}

const SmallBodyCardComponent = ({muscleImage}: BodyCardComponentProps) => {

    return (
        <View className='p-1'>
            {muscleImage}
        </View>
    );
}


export default SmallBodyCardComponent;
