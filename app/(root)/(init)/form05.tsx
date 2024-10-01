import RadioButtonComponent from '@/components/ui/buttons/RadioButton';
import RadioButtonLargeComponent from '@/components/ui/buttons/RadioButtonLarge';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Form05 = () => {
    const { isDark } = useTheme()
    return (
        <>
            <View className='my-2'>
                <Text className={`text-2xl font-ralewayExtraBold text-white text-center`}>¿Tienes algún problema médico?</Text>
                <RadioButtonComponent
                    options={["Si", "No"]}
                />
                <RadioButtonLargeComponent
                    options={["Lesiones", "Alergias"]}
                />

                <Text className={`text-2xl font-ralewayExtraBold text-white text-center`}>Cuentanos un poco más</Text>
                <TextInput
                    className={`text-start px-3 justify-start text-sm mt-2  rounded-xl py-2  text-lightGreen ${isDark ? " bg-darkGray-800" : "bg-eBlue-400"}`}
                    placeholder={'Tengo una lesión en ...'}
                    placeholderTextColor={`${isDark ? "#acacac" : "#3385"}`}
                    keyboardType='ascii-capable'
                    maxLength={200}
                    multiline
                    numberOfLines={5}

                />
                <View className='w-full items-end'>
                    <Text className={`text-sm font-ralewaySemiBold text-white`}>200 cáracteres máx.</Text>
                </View>

            </View>
        </>
    );
};

export default Form05;
