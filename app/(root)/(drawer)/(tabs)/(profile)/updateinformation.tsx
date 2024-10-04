import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import RadioButtonSmallComponent from '@/components/ui/buttons/RadioButtonSmall';
import RadioButtonVerticalSmallComponent from '@/components/ui/buttons/RadioButtonVerticalSmall';
import IconTextInputForm from '@/components/ui/form/IconTextInputForm';
import IconTextInputRadioButtonForm from '@/components/ui/form/IconTextInputRadioButtonForm';
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
        <SafeAreaView className={`flex flex-1
            border-[1px] ${isDark ? "border-darkGray-400" : "border-darkGray-500"}  rounded-sm
            ${isDark ? "bg-darkGray-500" : "bg-white"} `}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View className='p-4 rounded-lg '>
                    <View className={`py-1 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
                        <View className='flex flex-row items-center justify-between'>
                            <TouchableOpacity
                                onPress={() => {
                                    router.back()
                                }}
                            >
                                <Ionicons name="arrow-back" size={24} color={`${isDark ? "white" : "#1c1c1c"}`} />
                            </TouchableOpacity>
                            <Text className={`text-2xl mr-2 font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Actualizar Información</Text>
                        </View>

                    </View>


                    <View className={`p-4 mt-2 rounded-lg border-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} `}>
                        <View className='w-full items-center mt-2'>
                            <ImagePicker />
                        </View>
                        <IconTextInputForm
                            title='Email Institucional'
                            icon={<Ionicons name="person-circle-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                            inputKeyboardType='email-address'
                            inputPlaceholder='jhon.doe@epn.edu.ec'
                            inputSecure={false}
                            enabled={false}
                            inputValue={undefined}
                            inputOnChangeText={undefined} />
                        <IconTextInputForm
                            title='Nombre'
                            icon={<Ionicons name="person-circle-sharp" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                            inputKeyboardType='email-address'
                            inputPlaceholder='Jhon Doe'
                            inputSecure={false}
                            inputValue={undefined}
                            inputOnChangeText={undefined} />
                        <IconTextInputForm
                            title='Edad'
                            icon={<Ionicons name="balloon-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                            inputKeyboardType='number-pad'
                            inputPlaceholder='18'
                            inputSecure={false}
                            inputValue={undefined}
                            inputOnChangeText={undefined} />
                        <IconTextInputRadioButtonForm
                            title="Género"
                            icon={<Ionicons name="male-female-outline"
                                size={35}
                                color={`${isDark ? "white" : "#a6a6a6"}`} />}
                            inputPlaceholder={'Másculino'}
                            inputKeyboardType='ascii-capable'
                            inputValue={undefined}
                            inputOnChangeText={undefined}
                            options={['M', 'F']}
                            enabled={false}
                            rbComponentStyle='flex-1 flex-row '
                            rbIndividualRadioButtonStyle='w-12 h-12 text-white flex flex-col items-center justify-center'
                            rbIndividualTextBtnStyle={`${isDark ? "text-darkGray-500" : "text-white"}`}
                        />
                        <IconTextInputRadioButtonForm
                            title="Peso"
                            icon={<Ionicons name="scale"
                                size={35}
                                color={`${isDark ? "white" : "#a6a6a6"}`} />}
                            inputPlaceholder={'70'}
                            inputKeyboardType='number-pad'
                            inputValue={undefined}
                            inputOnChangeText={undefined}
                            options={['KG', 'LB']}
                            enabled={true}
                            rbComponentStyle='flex-1 flex-row '
                            rbIndividualRadioButtonStyle='w-12 h-12 text-white flex flex-col items-center justify-center'
                            rbIndividualTextBtnStyle={`${isDark ? "text-darkGray-500" : "text-white"}`}
                        />

                        <IconTextInputRadioButtonForm
                            title="Altura"
                            icon={<Ionicons name="resize-outline"
                                size={35}
                                color={`${isDark ? "white" : "#a6a6a6"}`} />}
                            inputPlaceholder={'166'}
                            inputKeyboardType='number-pad'
                            inputValue={undefined}
                            inputOnChangeText={undefined}
                            options={['CM', 'PIES']}
                            enabled={true}
                            rbComponentStyle='flex-1 flex-row '
                            rbIndividualRadioButtonStyle='w-12 h-12 text-white flex flex-col items-center justify-center'
                            rbIndividualTextBtnStyle={`${isDark ? "text-darkGray-500" : "text-white"}`}
                        />

                        <View>
                            <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} mb-2`}>Objetivo</Text>
                            <RadioButtonIconComponent
                                options={["Bajar de Peso", "Ganar Músculo", "Mantenerse en forma"]}
                                icons={[
                                    <Ionicons name="nutrition-outline"
                                        size={35}
                                        color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                                    <Ionicons name="barbell-outline"
                                        size={35}
                                        color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                                    <Ionicons name="fitness-sharp"
                                        size={35}
                                        color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />
                                ]}
                                rbComponentStyle='w-full '
                                rbIndividualRadioButtonStyle='h-12 flex flex-col items-center justify-center mb-2'
                                rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `}
                            />

                        </View>

                        <View>
                            <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} mb-2`}>Estado físico</Text>
                            <RadioButtonIconComponent
                                options={["Principiante", "Intermedio", "Avanzado"]}
                                icons={[
                                    <Ionicons name="star-outline"
                                        size={35}
                                        color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                                    <Ionicons name="star-half-outline"
                                        size={35}
                                        color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                                    <Ionicons name="star"
                                        size={35}
                                        color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />
                                ]}
                                rbComponentStyle='w-full '
                                rbIndividualRadioButtonStyle='h-12 flex flex-col items-center justify-center mb-2'
                                rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `}
                            />

                        </View>

                        <View >
                            <IconTextInputRadioButtonForm
                                title="Información Médica"
                                icon={<Ionicons name="medkit-outline"
                                    size={35}
                                    color={`${isDark ? "white" : "#a6a6a6"}`} />}
                                inputPlaceholder={'Sin problema'}
                                inputKeyboardType='ascii-capable'
                                inputValue={undefined}
                                inputOnChangeText={undefined}
                                options={['SI', 'NO']}
                                enabled={false}
                                rbComponentStyle='flex-1 flex-row '
                                rbIndividualRadioButtonStyle='w-12 h-12 text-white flex flex-col items-center justify-center'
                                rbIndividualTextBtnStyle={`${isDark ? "text-darkGray-500" : "text-white"}`}
                            />
                            <View className='mt-1'>
                                <RadioButtonIconComponent
                                    options={["Lesiónes", "Alergias"]}
                                    icons={[
                                        <Ionicons name="bandage-outline"
                                            size={35}
                                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                                        <Ionicons name="warning-outline"
                                            size={35}
                                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,

                                    ]}
                                    rbComponentStyle='w-full '
                                    rbIndividualRadioButtonStyle='h-12 flex flex-col items-center justify-center mb-2'
                                    rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `}
                                />
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

                        <View>
                            <IconTextInputRadioButtonForm
                                title="Médidas Corporales"
                                icon={<Ionicons name="body-outline"
                                    size={35}
                                    color={`${isDark ? "white" : "#a6a6a6"}`} />}
                                inputPlaceholder={'CM'}
                                inputKeyboardType='number-pad'
                                inputValue={undefined}
                                inputOnChangeText={undefined}
                                options={['CM', 'PIES']}
                                enabled={true}
                                rbComponentStyle='flex-1 flex-row '
                                rbIndividualRadioButtonStyle='w-12 h-12 text-white flex flex-col items-center justify-center'
                                rbIndividualTextBtnStyle={`${isDark ? "text-darkGray-500" : "text-white"}`}
                            />

                            <IconTextInputForm
                                title='Circunferencia de cintura'
                                icon={<Ionicons name="body-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                                inputKeyboardType='number-pad'
                                inputPlaceholder='85'
                                inputSecure={false}
                                enabled={false}
                                inputValue={undefined}
                                inputOnChangeText={undefined} />

                            <IconTextInputForm
                                title='Circunferencia de cadera'
                                icon={<Ionicons name="body-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                                inputKeyboardType='number-pad'
                                inputPlaceholder='96'
                                inputSecure={false}
                                enabled={false}
                                inputValue={undefined}
                                inputOnChangeText={undefined} />

                            <IconTextInputForm
                                title='Circunferencia de brazo'
                                icon={<Ionicons name="body-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                                inputKeyboardType='number-pad'
                                inputPlaceholder='96'
                                inputSecure={false}
                                enabled={false}
                                inputValue={undefined}
                                inputOnChangeText={undefined} />

                            <IconTextInputForm
                                title='Circunferencia de muslo'
                                icon={<Ionicons name="body-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                                inputKeyboardType='number-pad'
                                inputPlaceholder='54'
                                inputSecure={false}
                                enabled={false}
                                inputValue={undefined}
                                inputOnChangeText={undefined} />

                        </View>

                        <View>
                            <IconTextInputRadioButtonForm
                                title="Horarios de Entrenamiento"
                                icon={<Ionicons name="time-outline"
                                    size={35}
                                    color={`${isDark ? "white" : "#a6a6a6"}`} />}
                                inputPlaceholder={'AM'}
                                inputKeyboardType='number-pad'
                                inputValue={undefined}
                                inputOnChangeText={undefined}
                                options={['AM', 'PM']}
                                enabled={true}
                                rbComponentStyle='flex-1 flex-row '
                                rbIndividualRadioButtonStyle='w-12 h-12 text-white flex flex-col items-center justify-center'
                                rbIndividualTextBtnStyle={`${isDark ? "text-darkGray-500" : "text-white"}`}
                            />


                            <View className='w-full'>
                                <View className='flex flex-row items-center justify-between p-2'>
                                    <Text className={`text-lg ${isDark ? "text-white" : "text-darkGray-500"} font-raleway`}>
                                        Lunes
                                    </Text>
                                    <Checkbox
                                        className='w-6 h-6'
                                        value={days.monday}
                                        onValueChange={() => setDays({
                                            ...days,
                                            monday: !days.monday
                                        })}
                                        color={days.monday ? `${isDark ? "#1c1c1c" : "#16243E"}` : `${isDark ? "#fff" : "#1c1c1c"}`}
                                    />
                                </View>

                                <View className='flex flex-row items-center justify-between p-2'>
                                    <Text className={`text-lg ${isDark ? "text-white" : "text-darkGray-500"} font-raleway`}>
                                        Martes
                                    </Text>
                                    <Checkbox
                                        className='w-6 h-6'
                                        value={days.tuesday}
                                        onValueChange={() => setDays({
                                            ...days,
                                            tuesday: !days.tuesday
                                        })}
                                        color={days.tuesday ? `${isDark ? "#1c1c1c" : "#16243E"}` : `${isDark ? "#fff" : "#1c1c1c"}`}
                                    />
                                </View>

                                <View className='flex flex-row items-center justify-between p-2'>
                                    <Text className={`text-lg ${isDark ? "text-white" : "text-darkGray-500"} font-raleway`}>
                                        Miercoles
                                    </Text>
                                    <Checkbox
                                        className='w-6 h-6'
                                        value={days.wednesday}
                                        onValueChange={() => setDays({
                                            ...days,
                                            wednesday: !days.wednesday
                                        })}
                                        color={days.wednesday ? `${isDark ? "#1c1c1c" : "#16243E"}` : `${isDark ? "#fff" : "#1c1c1c"}`}
                                    />
                                </View>

                                <View className='flex flex-row items-center justify-between p-2'>
                                    <Text className={`text-lg ${isDark ? "text-white" : "text-darkGray-500"} font-raleway`}>
                                        Jueves
                                    </Text>
                                    <Checkbox
                                        className='w-6 h-6'
                                        value={days.thursday}
                                        onValueChange={() => setDays({
                                            ...days,
                                            thursday: !days.thursday
                                        })}
                                        color={days.thursday ? `${isDark ? "#1c1c1c" : "#16243E"}` : `${isDark ? "#fff" : "#1c1c1c"}`}
                                    />
                                </View>

                                <View className='flex flex-row items-center justify-between p-2'>
                                    <Text className={`text-lg ${isDark ? "text-white" : "text-darkGray-500"} font-raleway`}>
                                        Viernes
                                    </Text>
                                    <Checkbox
                                        className='w-6 h-6'
                                        value={days.friday}
                                        onValueChange={() => setDays({
                                            ...days,
                                            friday: !days.friday
                                        })}
                                        color={days.friday ? `${isDark ? "#1c1c1c" : "#16243E"}` : `${isDark ? "#fff" : "#1c1c1c"}`}
                                    />
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
