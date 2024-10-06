import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Form05 = () => {
    const { isDark } = useTheme()
    return (
        <View className={`py-5 border-y-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>

            <View className={`pb-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} w-full items-center`}>
                <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Tienes algún problema médico?</Text>
            </View>

            <View className='mt-1'>
                <RadioButtonIconComponent
                    options={["Ninguno", "Lesiónes/Alergias"]}
                    icons={[
                        <Ionicons name="body-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                        <Ionicons name="bandage-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />
                    ]}
                    rbComponentStyle='w-full '
                    rbIndividualRadioButtonStyle='h-12 flex flex-col items-center justify-center mb-2 '
                    rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `}
                />
                <View className={`py-5 border-t-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} w-full items-center`}>
                    <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>Cuéntanos un poco más...</Text>
                </View>
                <View className={`mt-2 border-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} rounded-lg text-white-100`}>

                    <TextInput
                        className={`flex-1 p-2 rounded-lg shadow-lg 
                                        pl-3 ${isDark ? "text-white" : "text-darkGray-500"}  ml-2 font-ralewayBold`}
                        placeholder={'Tengo una lesión en ...'}
                        placeholderTextColor="#a6a6a6"
                        keyboardType='ascii-capable'
                        maxLength={200}
                        multiline
                        numberOfLines={5}

                    />
                </View>

            </View>

        </View>
    );
};

export default Form05;
