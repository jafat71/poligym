import WeekChecklistComponent from '@/components/ui/common/buttons/Checklist';
import RadioButtonIconComponent from '@/components/ui/common/buttons/RadioButtonIcon';
import IconTextInputForm from '@/components/ui/common/form/IconTextInputForm';
import ImagePicker from '@/components/ui/common/image/ImagePicker';
import { experienceOptions, genreMapper, genresOptions, medicalProblemsOptions, objetiveOptions, scheduleOptions } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { DaysWeek, Genre } from '@/types/interfaces/entities/user';
import { Ionicons } from '@expo/vector-icons';
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
    const [selectedObjetive, setSelectedObjetive] = useState<number>(0);
    const [selectedExperience, setSelectedExperience] = useState<number>(0);
    const [selectedMedicalProblem, setSelectedMedicalProblem] = useState<number>(0);
    const [medicalDetail, setMedicalDetail] = useState('');
    const [enableEdit, setenableEdit] = useState(false);
    const [focused, setFocused] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<number>(0);

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
        setWeightINput(tmpUser?.userWeight + "" || '')

        let genreIndex = 0
        if (tmpUser?.userGenre) {
            genreIndex = genreMapper[tmpUser.userGenre]
        }
        setSelectedGenre(genreIndex)

    }, []);

    return (
        <SafeAreaView className={`flex flex-col items-center justify-center h-full ${isDark ? "bg-darkGray-500" : "bg-white"} `}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                className='w-full'
            >
                <View className='mt-2 rounded-lg '>

                    <View className={`p-2 mt-2 rounded-lg`}>
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
                            enabled={false} />
                        <IconTextInputForm
                            title='Nombre'
                            icon={<Ionicons name="person-circle-sharp" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                            inputKeyboardType='email-address'
                            inputPlaceholder='Jhon Doe'
                            inputSecure={false}
                            inputValue={undefined}
                            inputOnChangeText={undefined}
                            enabled={false} />
                        <IconTextInputForm
                            title='Edad'
                            icon={<Ionicons name="balloon-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                            inputKeyboardType='number-pad'
                            inputPlaceholder='18'
                            inputSecure={false}
                            inputValue={ageINput}
                            inputOnChangeText={undefined}
                            enabled={false} />

                        <IconTextInputForm
                            title='Peso'
                            icon={<Ionicons name="scale" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                            inputKeyboardType='number-pad'
                            inputPlaceholder='60'
                            inputSecure={false}
                            inputValue={ageINput}
                            inputOnChangeText={undefined}
                            enabled={false} />

                        <IconTextInputForm
                            title='Altura'
                            icon={<Ionicons name="resize-outline" size={35} color={`${isDark ? "white" : "#a6a6a6"}`} />}
                            inputKeyboardType='number-pad'
                            inputPlaceholder='170'
                            inputSecure={false}
                            inputValue={ageINput}
                            inputOnChangeText={undefined}
                            enabled={false} />


                        <View className='py-2'>
                            <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>Género</Text>
                            <RadioButtonIconComponent
                                options={genresOptions}
                                icons={[
                                    <Ionicons name="male"
                                        size={35}
                                        color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                    <Ionicons name="female"
                                        size={35}
                                        color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                    <Ionicons name="male-female"
                                        size={35}
                                        color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                ]}
                                selectedValue={selectedGenre}
                                setSelectedValue={setSelectedGenre}
                                rbComponentStyle='w-full mt-2'
                                rbIndividualRadioButtonStyle='h-9 flex flex-col items-center justify-center mb-1'
                                rbIndividualTextBtnStyle={`text-base  font-ralewayBold`}
                            />
                        </View>

                        <View className={`py-2`}>
                            <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>Objetivo</Text>
                            <RadioButtonIconComponent
                                options={objetiveOptions}
                                icons={[
                                    <Ionicons name="nutrition-outline"
                                        size={35}
                                        color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                    <Ionicons name="barbell-outline"
                                        size={35}
                                        color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                    <Ionicons name="fitness-sharp"
                                        size={35}
                                        color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                ]}
                                selectedValue={selectedObjetive}
                                setSelectedValue={setSelectedObjetive}
                                rbComponentStyle='w-full mt-2'
                                rbIndividualRadioButtonStyle='h-9 flex flex-col items-center justify-center mb-1'
                                rbIndividualTextBtnStyle={`text-base  font-ralewayBold `}
                            />
                        </View>

                        <View className={`py-2`}>
                            <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Cuál es tu experiencia?</Text>
                            <RadioButtonIconComponent
                                options={experienceOptions}
                                icons={[
                                    <Ionicons name="star-outline"
                                        size={35}
                                        color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                    <Ionicons name="star-half-outline"
                                        size={35}
                                        color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                    <Ionicons name="star"
                                        size={35}
                                        color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                ]}
                                selectedValue={selectedExperience}
                                setSelectedValue={setSelectedExperience}
                                rbComponentStyle='w-full mt-2'
                                rbIndividualRadioButtonStyle='h-9 flex flex-col items-center justify-center mb-1'
                                rbIndividualTextBtnStyle={`text-base  font-ralewayBold  `}
                            />

                        </View>

                        <View className={`py-2`}>

                            <View className={`pb-5 `}>
                                <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Tienes algún problema médico?</Text>
                            </View>

                            <View className='mt-1'>
                                <RadioButtonIconComponent
                                    options={medicalProblemsOptions}
                                    icons={[
                                        <Ionicons name="body-outline"
                                            size={35}
                                            color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                        <Ionicons name="bandage-outline"
                                            size={35}
                                            color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                        <Ionicons name="warning-outline"
                                            size={35}
                                            color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                    ]}
                                    rbComponentStyle='w-full '
                                    rbIndividualRadioButtonStyle='h-9 flex flex-col items-center justify-center mb-1'
                                    rbIndividualTextBtnStyle={`text-base  font-ralewayBold `}
                                    selectedValue={selectedMedicalProblem}
                                    setSelectedValue={setSelectedMedicalProblem}
                                />

                                <>
                                    <View className={` w-full items-start`}>
                                        <Text className={`text-lg mb-2  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>Detalle de problema médico</Text>
                                    </View>
                                    <TextInput
                                        className={`
                h-40 border-[2px] border-b-[2px] ${focused ? "border-eBlue-500" : isDark ? "border-white" : "border-darkGray-500"}
                rounded-lg p-4 
                ${isDark ? "text-white" : "text-darkGray-500"} font-ralewayBold`}
                                        placeholder="Tengo una fractura en..."
                                        placeholderTextColor="#a6a6a6"
                                        keyboardType='ascii-capable'
                                        maxLength={200}
                                        multiline
                                        numberOfLines={5}
                                        value={medicalDetail}
                                        onChangeText={undefined}
                                        editable={enableEdit}
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                    />
                                </>

                                <View className={`py-2`}>
                                    <View className={` w-full items-start`}>
                                        <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>Horario  de entrenamiento</Text>
                                    </View>

                                    <RadioButtonIconComponent
                                        options={scheduleOptions}
                                        icons={[
                                            <Ionicons name="sunny-outline"
                                                size={35}
                                                color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                            <Ionicons name="partly-sunny-outline"
                                                size={35}
                                                color={`${isDark ? "#fff" : "#1c1c1c"}`} />,
                                        ]}
                                        selectedValue={selectedSchedule}
                                        setSelectedValue={setSelectedSchedule}
                                        rbComponentStyle='w-full mt-2'
                                        rbIndividualRadioButtonStyle='h-9 flex flex-col items-center justify-center mb-1'
                                        rbIndividualTextBtnStyle={`text-base  font-ralewayBold  `}
                                    />

                                    <WeekChecklistComponent
                                        days={days}
                                        setDays={setDays}
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
