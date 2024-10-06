import IconButton from '@/components/ui/buttons/IconButton';
import RadioButtonComponent from '@/components/ui/buttons/RadioButton';
import BigIconTextInputForm from '@/components/ui/form/BigIconTextInputForm';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Form02 = () => {
    const { isDark } = useTheme()

    return (
        <>
            <View className={`py-5 border-y-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
                <BigIconTextInputForm
                    title='¿Cuál es tu peso?'
                    icon={<Ionicons name="scale" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                    inputKeyboardType='number-pad'
                    inputPlaceholder='18'
                    inputSecure={false}
                    inputValue={undefined}
                    inputOnChangeText={undefined} />
                <View className='flex flex-row items-center justify-between my-2'>
                    <IconButton
                        icon={<Ionicons name="remove" size={35} color={`${isDark ? "#1c1c1c" : "#fff"}`} />}
                        onPress={() => { }}
                    />
                    <IconButton
                        icon={<Ionicons name="add" size={35} color={`${isDark ? "#1c1c1c" : "#fff"}`} />}
                        onPress={() => { }}
                    />
                </View>
                <View className='flex flex-row items-center justify-between '>
                    <RadioButtonComponent
                        options={["KG", "LB"]}
                        rbComponentStyle='w-full flex flex-row items-center justify-between'
                        rbIndividualRadioButtonStyle='w-1/3 h-12 text-white flex flex-col items-center justify-center'
                        rbIndividualTextBtnStyle={`${isDark ? "text-darkGray-500" : "text-white"}`}
                    />
                </View>

            </View>

            <View className={`py-5`}>
                <BigIconTextInputForm
                    title='¿Cuál es tu altura?'
                    icon={<Ionicons name="resize-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                    inputKeyboardType='number-pad'
                    inputPlaceholder='18'
                    inputSecure={false}
                    inputValue={undefined}
                    inputOnChangeText={undefined} />
                <View className='flex flex-row items-center justify-between my-2'>
                    <IconButton
                        icon={<Ionicons name="remove" size={35} color={`${isDark ? "#1c1c1c" : "#fff"}`} />}
                        onPress={() => { }}
                    />
                    <IconButton
                        icon={<Ionicons name="add" size={35} color={`${isDark ? "#1c1c1c" : "#fff"}`} />}
                        onPress={() => { }}
                    />
                </View>
                <View className='flex flex-row items-center justify-between '>
                    <RadioButtonComponent
                        options={["CM", "PIES"]}
                        rbComponentStyle='w-full flex flex-row items-center justify-between'
                        rbIndividualRadioButtonStyle='w-1/3 h-12 text-white flex flex-col items-center justify-center'
                        rbIndividualTextBtnStyle={`${isDark ? "text-darkGray-500" : "text-white"}`}
                    />
                </View>

            </View>
        </>
    );
};

export default Form02;
