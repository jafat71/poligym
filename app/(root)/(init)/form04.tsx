import RadioButtonComponent from '@/components/ui/buttons/RadioButton';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Form04 = () => {
    const { isDark } = useTheme()
    return (
        <>
            <View className='my-2'>
                <Text className={`text-2xl font-ralewayExtraBold text-white text-center`}>¿Cuáles son tus medidas corporales?</Text>

                <RadioButtonComponent
                    options={["Cms", "Pies"]}
                />
                <View className='mt-4 p-2'>
                    <View className='flex flex-row items-center justify-between '>
                        <Text className='text-xl text-white font-raleway'>
                            Circunferencia de cintura
                        </Text>
                        <TextInput
                            className={`w-20 text-center px-3 text-3xl mt-2  rounded-xl py-2  text-lightGreen ${isDark ? " bg-darkGray-800" : "bg-eBlue-400"}`}
                            placeholder={'85'}
                            placeholderTextColor={`${isDark ? "#acacac" : "#3385"}`}
                            keyboardType='number-pad'
                            maxLength={3}
                        />
                    </View>

                    <View className='flex flex-row items-center justify-between '>
                        <Text className='text-xl text-white font-raleway'>
                            Circunferencia de cadera
                        </Text>
                        <TextInput
                            className={`w-20 text-center px-3 text-3xl mt-2  rounded-xl py-2  text-lightGreen ${isDark ? " bg-darkGray-800" : "bg-eBlue-400"}`}
                            placeholder={'95'}
                            placeholderTextColor={`${isDark ? "#acacac" : "#3385"}`}
                            keyboardType='number-pad'
                            maxLength={3}
                        />
                    </View>

                    <View className='flex flex-row items-center justify-between '>
                        <Text className='text-xl text-white font-raleway'>
                            Circunferencia de brazo
                        </Text>
                        <TextInput
                            className={`w-20 text-center px-3 text-3xl mt-2  rounded-xl py-2  text-lightGreen ${isDark ? " bg-darkGray-800" : "bg-eBlue-400"}`}
                            placeholder={'85'}
                            placeholderTextColor={`${isDark ? "#acacac" : "#3385"}`}
                            keyboardType='number-pad'
                            maxLength={3}
                        />
                    </View>

                    <View className='flex flex-row items-center justify-between '>
                        <Text className='text-xl text-white font-raleway'>
                            Circunferencia de muslo
                        </Text>
                        <TextInput
                            className={`w-20 text-center px-3 text-3xl mt-2  rounded-xl py-2  text-lightGreen ${isDark ? " bg-darkGray-800" : "bg-eBlue-400"}`}
                            placeholder={'95'}
                            placeholderTextColor={`${isDark ? "#acacac" : "#3385"}`}
                            keyboardType='number-pad'
                            maxLength={3}
                        />
                    </View>
                </View>
            </View>
        </>
    );
};

export default Form04;