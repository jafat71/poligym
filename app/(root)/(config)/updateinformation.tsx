import WeekChecklistComponent from '@/components/ui/buttons/Checklist';
import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import IconTextInputForm from '@/components/ui/form/IconTextInputForm';
import IconTextInputRadioButtonForm from '@/components/ui/form/IconTextInputRadioButtonForm';
import ImagePicker from '@/components/ui/image/ImagePicker';
import { genreMapper } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { DaysWeek, Genre } from '@/types/interfaces/entities/user';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const EditProfile = () => {
    const { isDark } = useTheme()
    const { tmpUser, set1InitUser } = useUser()
    const [ageINput, setAgeINput] = useState('');
    const [profileImage, setprofileImage] = useState('');
    const [weightInput, setWeightINput] = useState('');
    const [selectedGenre, setSelectedGenre] = useState<number>(0);

    const [days, setDays] = useState<DaysWeek>({
        "monday": false,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false,
    });

    useEffect(() => {
        let userAge = tmpUser?.userAge
        setAgeINput(String(userAge) || '')
        setprofileImage(tmpUser?.userProfileImgUrl || '')
        setWeightINput(tmpUser?.userWeight+"" || '')

        let genreIndex = 0
        if (tmpUser?.userGenre) {
            genreIndex = genreMapper[tmpUser.userGenre]
        } 
        setSelectedGenre(genreIndex)

    }, []);

    return (
        <SafeAreaView className={`flex flex-1
            
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


                    <View className={`p-4 mt-2 rounded-lg`}>
                        <View className='w-full items-center mt-2'>
                            <ImagePicker
                                imgUrl={profileImage}
                                setImg={setprofileImage}
                            />
                        </View>
                        <IconTextInputForm
                            title='Email Institucional'
                            icon={<Ionicons name="person-circle-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                            inputKeyboardType='email-address'
                            inputPlaceholder='jhon.doe@epn.edu.ec'
                            inputSecure={false}
                            inputValue={undefined}
                            inputOnChangeText={undefined}
                            enabled={false}/>
                        <IconTextInputForm
                            title='Nombre'
                            icon={<Ionicons name="person-circle-sharp" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                            inputKeyboardType='email-address'
                            inputPlaceholder='Jhon Doe'
                            inputSecure={false}
                            inputValue={undefined}
                            inputOnChangeText={undefined}
                            enabled={false}/>
                        <IconTextInputForm
                            title='Edad'
                            icon={<Ionicons name="balloon-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                            inputKeyboardType='number-pad'
                            inputPlaceholder='18'
                            inputSecure={false}
                            inputValue={ageINput}
                            inputOnChangeText={undefined}
                            enabled={false}/>
                                                    
                        <View className={`mt-2 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} flex flex-col items-start`}>
                        <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>Género</Text>
                        <RadioButtonIconComponent
                                options={['Másculino', 'Femenino', 'Otro']}
                                icons={[
                                    <Ionicons name="male"
                                        size={35}
                                        color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                                    <Ionicons name="female"
                                        size={35}
                                        color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                                    <Ionicons name="male-female"
                                        size={35}
                                        color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />
                                ]}
                                selectedValue={selectedGenre}
                                rbComponentStyle='w-full mt-2'
                                rbIndividualRadioButtonStyle='h-10 flex flex-col items-center justify-center mb-2'
                                rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `}
                                setSelectedValue={function (value: any): void {
                                    throw new Error('Function not implemented.');
                                }} />

                        </View>
{/* 
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
                            rbIndividualRadioButtonStyle='w-12 h-12 text-white flex flex-col items-center justify-center mx-1 translate-x-2'
                            rbIndividualTextBtnStyle={`${isDark ? "text-darkGray-500" : "text-white"}`} selectedValue={undefined} setSelectedValue={function (value: any): void {
                                throw new Error('Function not implemented.');
                            }} subFn={function (): void {
                                throw new Error('Function not implemented.');
                            }} addFn={function (): void {
                                throw new Error('Function not implemented.');
                            }} />

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
                            rbIndividualRadioButtonStyle='w-12 h-12 text-white flex flex-col items-center justify-center mx-1 translate-x-2'
                            rbIndividualTextBtnStyle={`${isDark ? "text-darkGray-500" : "text-white"}`} selectedValue={undefined} setSelectedValue={function (value: any): void {
                                throw new Error('Function not implemented.');
                            }} subFn={function (): void {
                                throw new Error('Function not implemented.');
                            }} addFn={function (): void {
                                throw new Error('Function not implemented.');
                            }} />

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
                                rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `} selectedValue={undefined} setSelectedValue={function (value: any): void {
                                    throw new Error('Function not implemented.');
                                }} />

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
                                rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `} selectedValue={undefined} setSelectedValue={function (value: any): void {
                                    throw new Error('Function not implemented.');
                                }} />

                        </View>

                        <View >
                            <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} mb-2`}>Estado Médico</Text>

                            <View className='mt-1'>
                                <RadioButtonIconComponent
                                    options={["Sin Ningun Problema", "Lesiónes/Alergias"]}
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
                                    rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `} selectedValue={undefined} setSelectedValue={function (value: any): void {
                                        throw new Error('Function not implemented.');
                                    }} />
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
                                title="Horarios de Entrenamiento"
                                icon={<Ionicons name="time-outline"
                                    size={35}
                                    color={`${isDark ? "white" : "#a6a6a6"}`} />}
                                inputPlaceholder={'AM'}
                                inputKeyboardType='number-pad'
                                inputValue={undefined}
                                inputOnChangeText={undefined}
                                options={['AM', 'PM']}
                                enabled={false}
                                rbComponentStyle='flex-1 flex-row '
                                rbIndividualRadioButtonStyle='w-12 h-12 text-white flex flex-col items-center justify-center mx-1 translate-x-2'
                                rbIndividualTextBtnStyle={`${isDark ? "text-darkGray-500" : "text-white"}`} selectedValue={undefined} setSelectedValue={function (value: any): void {
                                    throw new Error('Function not implemented.');
                                }} subFn={function (): void {
                                    throw new Error('Function not implemented.');
                                }} addFn={function (): void {
                                    throw new Error('Function not implemented.');
                                }} />

                            <WeekChecklistComponent
                                days={days}
                                setDays={setDays}
                            />

                        </View> */}


                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfile;
