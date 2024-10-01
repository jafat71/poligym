
import React from 'react';
import { Text, View } from 'react-native';
import RadioButtonComponent from '../../buttons/RadioButton';

interface Props {
    question: string;
    options: string[]
}

const SimpleRadioButtonQuestion = ({question,options}:Props) => {
    return (
        <View className='my-10'>
            <Text className={`text-2xl font-ralewayExtraBold text-white text-center`}>{question}</Text>
            <RadioButtonComponent
                options={options}
            />
        </View>
    );
};

export default SimpleRadioButtonQuestion;
