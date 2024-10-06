
import IconButton from '@/components/ui/buttons/IconButton';
import RadioButtonComponent from '@/components/ui/buttons/RadioButton';
import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import BigIconTextInputForm from '@/components/ui/form/BigIconTextInputForm';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

const Form01 = () => {
    const { isDark } = useTheme()
    return (
        <View className=''>

            <View className={`py-5 border-y-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
                <BigIconTextInputForm
                    title='¿Cuántos años tienes?'
                    icon={<Ionicons name="balloon-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
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

            </View>

            <View >
                <View className={`py-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} flex flex-col items-center`}>
                    <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Cuál es tu género?</Text>
                    <RadioButtonIconComponent
                        options={["Másculino", "Femenino"]}
                        icons={[
                            <Ionicons name="male"
                                size={35}
                                color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                            <Ionicons name="female"
                                size={35}
                                color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />
                        ]}
                        rbComponentStyle='w-full mt-2'
                        rbIndividualRadioButtonStyle='h-10 flex flex-col items-center justify-center mb-2'
                        rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `}
                    />

                </View>

            </View>


        </View>
    );
};

export default Form01;
