import RadioButtonLargeComponent from '@/components/ui/buttons/RadioButtonLarge';
import React from 'react';
import { Text, View } from 'react-native';

const Form03 = () => {
    return (
        <>
            <View className='my-2'>
                <Text className={`text-2xl font-ralewayExtraBold text-white text-center`}>¿Cuál es tu objetivo físico?</Text>
                <RadioButtonLargeComponent
                    options={["Bajar de Peso", "Ganancia Muscular", "Mantenerse en forma"]}
                />
            </View>
            <View className='my-2'>
                <Text className={`text-2xl font-ralewayExtraBold text-white text-center`}>¿Cuál es tu nivel físico actual?</Text>
                <RadioButtonLargeComponent
                    options={["Principiante", "Intermedio", "Avanzado"]}
                />
            </View>
        </>
    );
};

export default Form03;
