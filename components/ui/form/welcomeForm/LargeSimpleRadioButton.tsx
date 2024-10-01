
import React from 'react';
import { Text, View } from 'react-native';
import RadioButtonComponent from '../../buttons/RadioButton';
import RadioButtonLargeComponent from '../../buttons/RadioButtonLarge';

interface Props {
    question: string;
    options: string[]
}

const LargeSimpleRadioButtonQuestion = ({question,options}:Props) => {
    return (
        <View className='my-2'>
            <Text className={`text-2xl font-ralewayExtraBold text-white text-center`}>{question}</Text>
            <RadioButtonLargeComponent
                options={options}
            />
        </View>
    );
};

export default LargeSimpleRadioButtonQuestion;
