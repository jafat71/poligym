import IconButton from '@/components/ui/buttons/IconButton';
import RadioButtonComponent from '@/components/ui/buttons/RadioButton';
import BigIconTextInputForm from '@/components/ui/form/BigIconTextInputForm';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Form04 = () => {
    const { isDark } = useTheme()
    return (
        <>

            <View >
                <View className={`py-5 border-y-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
                    <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Cuáles son tus medidas corporales?</Text>
                </View>

                <View className='mt-2'>
                    <BigIconTextInputForm
                        title='Circunferencia de cintura'
                        icon={<Ionicons name="body-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                        inputKeyboardType='number-pad'
                        inputPlaceholder='85'
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

                <View>
                    <BigIconTextInputForm
                        title='Circunferencia de cadera'
                        icon={<Ionicons name="body-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                        inputKeyboardType='number-pad'
                        inputPlaceholder='96'
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

                <View>
                    <BigIconTextInputForm
                        title='Circunferencia de brazo'
                        icon={<Ionicons name="body-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                        inputKeyboardType='number-pad'
                        inputPlaceholder='96'
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

                <View className='mb-2'>
                    <BigIconTextInputForm
                        title='Circunferencia de muslo'
                        icon={<Ionicons name="body-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                        inputKeyboardType='number-pad'
                        inputPlaceholder='54'
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

            </View>

        </>
    );
};

export default Form04;