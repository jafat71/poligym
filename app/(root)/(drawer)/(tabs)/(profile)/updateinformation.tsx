

import RadioButtonLargeComponent from '@/components/ui/buttons/RadioButtonLarge';
import RadioButtonSmallComponent from '@/components/ui/buttons/RadioButtonSmall';
import RadioButtonVerticalSmallComponent from '@/components/ui/buttons/RadioButtonVerticalSmall';
import ImagePicker from '@/components/ui/image/ImagePicker';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, TouchableHighlight, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const EditProfile = () => {
    const { isDark } = useTheme()
    const [days, setDays] = useState({
        "monday": false,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false,
    });
    return (
        <SafeAreaView className={`flex flex-1 ${isDark ? "bg-darkGray-500" : "bg-eBlue-600"} `}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View className='p-4'>
                    <View className={`flex flex-row items-center `}>
                        <TouchableOpacity
                            onPress={() => {
                                router.back()
                            }}
                        >
                            <Ionicons name="arrow-back" size={32} color={`#fff`} />
                        </TouchableOpacity>
                        <Text className='text-3xl ml-2 text-white font-ralewayBold'>Actualizar Información</Text>
                    </View>


                    <View className='p-4 mt-2 bg-eBlue-800 rounded-lg shadow-2xl shadow-eBlue-700'>
                        <View className='w-full items-center mt-2'>
                            <ImagePicker />
                        </View>
                        <View className='flex flex-row items-center justify-between'>
                            <Text className='text-base font-ralewayBold w-16 text-white'>Nombre </Text>
                            <TextInput
                                className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
                                placeholder="Jhon Doe"
                                keyboardType="ascii-capable"
                                placeholderTextColor="#FFFFFF"
                            />
                        </View>
                        <View className='flex flex-row items-center justify-between'>
                            <Text className='text-base font-ralewayBold w-16 text-white'>Edad </Text>
                            <TextInput
                                className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
                                placeholder="18"
                                keyboardType="number-pad"
                                placeholderTextColor="#FFFFFF"
                            />
                        </View>

                        <View className='flex flex-row items-center justify-between'>
                            <Text className='text-base font-ralewayBold w-16 text-white'>Género </Text>
                            <Text
                                className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
                            >
                                Hombre
                            </Text>
                            <RadioButtonSmallComponent
                                options={['M', 'F']}
                            />
                        </View>

                        <View className='flex flex-row items-center justify-between'>
                            <Text className='text-base font-ralewayBold w-16 text-white'>Peso </Text>
                            <TextInput
                                className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
                                placeholder="70"
                                keyboardType="number-pad"
                                placeholderTextColor="#FFFFFF"
                            />
                            <RadioButtonSmallComponent
                                options={['KG', 'LBS']}
                            />
                        </View>

                        <View className='flex flex-row items-center justify-between'>
                            <Text className='text-base font-ralewayBold w-16 text-white'>Altura </Text>
                            <TextInput
                                className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
                                placeholder="166"
                                keyboardType="number-pad"
                                placeholderTextColor="#FFFFFF"
                            />
                            <RadioButtonSmallComponent
                                options={['CM', 'PIES']}
                            />
                        </View>

                        <View className='flex flex-row items-center justify-between'>
                            <Text className='text-base font-ralewayBold w-16 text-white'>Objetivo</Text>
                            <View className='flex-1'>
                                <View className='w-full'>
                                    <RadioButtonVerticalSmallComponent
                                        options={["Bajar de Peso", "Ganar Músculo", "Mantenerse en forma"]}
                                    />
                                </View>
                            </View>

                        </View>

                        <View className='flex flex-row items-center justify-between'>
                            <Text className='text-base font-ralewayBold w-16 text-white'>Estado físico</Text>
                            <View className='flex-1'>
                                <View className='w-full'>
                                    <RadioButtonVerticalSmallComponent
                                        options={["Principiante", "Intermedio", "Avanzado"]}
                                    />
                                </View>
                            </View>
                        </View>

                        <View className='flex flex-row items-center justify-between'>
                            <Text className='text-base font-ralewayBold w-16 text-white'>Información Médica</Text>
                            <View className='flex-1'>
                                <RadioButtonSmallComponent
                                    options={['Si', 'No']}
                                />
                                <View className='w-full'>
                                    <RadioButtonVerticalSmallComponent
                                        options={["Lesiones", "Alergías"]}
                                    />
                                </View>
                                <View className='p-4'>
                                    <TextInput
                                        className={`text-start px-3 justify-start text-sm mt-2  rounded-xl py-2  text-lightGreen  bg-darkGray-500 "}`}
                                        placeholder={'Tengo una lesión en ...'}
                                        placeholderTextColor={`${"#fff"}`}
                                        keyboardType='ascii-capable'
                                        maxLength={200}
                                        multiline
                                        numberOfLines={5}

                                    />
                                </View>

                            </View>
                        </View>

                        <View className='flex flex-row items-center justify-between'>
                            <Text className='text-base font-ralewayBold w-16 text-white'>Medidas Corporales</Text>
                            <View className='flex-1'>
                                <RadioButtonSmallComponent
                                    options={['CM', 'PIES']}
                                />
                                <View className='w-full'>
                                    <View className='flex flex-row items-center justify-center p-2'>
                                        <Text className='w-1/2 text-white font-ralewayBold'>
                                            Circunferencia de cintura
                                        </Text>
                                        <TextInput
                                            className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
                                            placeholder="85"
                                            keyboardType="number-pad"
                                            placeholderTextColor="#FFFFFF"
                                        />
                                    </View>

                                    <View className='flex flex-row items-center justify-center p-2'>
                                        <Text className='w-1/2 text-white font-ralewayBold'>
                                            Circunferencia de cadera
                                        </Text>
                                        <TextInput
                                            className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
                                            placeholder="95"
                                            keyboardType="number-pad"
                                            placeholderTextColor="#FFFFFF"
                                        />
                                    </View>

                                    <View className='flex flex-row items-center justify-center p-2'>
                                        <Text className='w-1/2 text-white font-ralewayBold'>
                                            Circunferencia de brazo
                                        </Text>
                                        <TextInput
                                            className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
                                            placeholder="32"
                                            keyboardType="number-pad"
                                            placeholderTextColor="#FFFFFF"
                                        />
                                    </View>

                                    <View className='flex flex-row items-center justify-center p-2'>
                                        <Text className='w-1/2 text-white font-ralewayBold'>
                                            Circunferencia de muslo
                                        </Text>
                                        <TextInput
                                            className='flex-1 bg-darkGray-500 p-2 mt-2 rounded-lg shadow-lg pl-3 text-lightGreen ml-2 font-raleway'
                                            placeholder="54"
                                            keyboardType="number-pad"
                                            placeholderTextColor="#FFFFFF"
                                        />
                                    </View>

                                </View>
                            </View>

                        </View>

                        <View className='flex flex-row items-center justify-between'>
                            <Text className='text-base font-ralewayBold w-16 text-white'>Horarios de Entrenamiento</Text>
                            <View className='flex-1'>
                                <RadioButtonSmallComponent
                                    options={['Mañana', 'Tarde']}
                                />
                                <View className='w-full'>
                                    <View className='flex flex-row items-center justify-between p-2'>
                                        <Text className='text-xs text-white font-raleway'>
                                            Lunes
                                        </Text>
                                        <Checkbox
                                            className='w-6 h-6'
                                            value={days.monday}
                                            onValueChange={() => setDays({
                                                ...days,
                                                monday: !days.monday
                                            })}
                                            color={days.monday ? `${isDark ? "#0059FF" : "#16243E"}` : `${isDark ? "#0059FF" : "#1c1c1c"}`}
                                        />
                                    </View>

                                    <View className='flex flex-row items-center justify-between p-2'>
                                        <Text className='text-xs text-white font-raleway'>
                                            Martes
                                        </Text>
                                        <Checkbox
                                            className='w-6 h-6'
                                            value={days.tuesday}
                                            onValueChange={() => setDays({
                                                ...days,
                                                tuesday: !days.tuesday
                                            })}
                                            color={days.tuesday ? `${isDark ? "#0059FF" : "#16243E"}` : `${isDark ? "#0059FF" : "#1c1c1c"}`}
                                        />
                                    </View>

                                    <View className='flex flex-row items-center justify-between p-2'>
                                        <Text className='text-xs text-white font-raleway'>
                                            Miercoles
                                        </Text>
                                        <Checkbox
                                            className='w-6 h-6'
                                            value={days.wednesday}
                                            onValueChange={() => setDays({
                                                ...days,
                                                wednesday: !days.wednesday
                                            })}
                                            color={days.wednesday ? `${isDark ? "#0059FF" : "#16243E"}` : `${isDark ? "#0059FF" : "#1c1c1c"}`}
                                        />
                                    </View>

                                    <View className='flex flex-row items-center justify-between p-2'>
                                        <Text className='text-xs text-white font-raleway'>
                                            Jueves
                                        </Text>
                                        <Checkbox
                                            className='w-6 h-6'
                                            value={days.thursday}
                                            onValueChange={() => setDays({
                                                ...days,
                                                thursday: !days.thursday
                                            })}
                                            color={days.thursday ? `${isDark ? "#0059FF" : "#16243E"}` : `${isDark ? "#0059FF" : "#1c1c1c"}`}
                                        />
                                    </View>

                                    <View className='flex flex-row items-center justify-between p-2'>
                                        <Text className='text-xs text-white font-raleway'>
                                            Viernes
                                        </Text>
                                        <Checkbox
                                            className='w-6 h-6'
                                            value={days.friday}
                                            onValueChange={() => setDays({
                                                ...days,
                                                friday: !days.friday
                                            })}
                                            color={days.friday ? `${isDark ? "#0059FF" : "#16243E"}` : `${isDark ? "#0059FF" : "#1c1c1c"}`}
                                        />
                                    </View>
                                </View>
                            </View>

                        </View>


                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfile;
