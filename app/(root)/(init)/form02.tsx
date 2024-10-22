import RadioButtonIconComponent from '@/components/ui/common/buttons/RadioButtonIcon';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Experience, Objetive } from '@/types/interfaces/entities/user';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { experienceMapper, experienceOptions, genreMapper, genresOptions, objetiveMapper, objetiveOptions } from '@/constants';
import { Genre } from '../../../types/interfaces/entities/user';

const Form02 = () => {
    const { isDark } = useTheme()
    const { tmpUser, updateInitUserShell } = useUser()

    const [selectedObjetive, setSelectedObjetive] = useState<number>(0);
    const [selectedExperience, setSelectedExperience] = useState<number>(0);
    const [selectedGenre, setSelectedGenre] = useState<number>(0);

    useEffect(() => {
        let genreIndex = 0
        if (tmpUser?.userGenre) {
            genreIndex = genreMapper[tmpUser.userGenre]
        }
        setSelectedGenre(genreIndex)
        let objetiveIndex = 0
        if (tmpUser?.userObjetive) {
            objetiveIndex = objetiveMapper[tmpUser.userObjetive]
        }
        setSelectedObjetive(objetiveIndex)
        let experienceIndex = 0
        if (tmpUser?.userPhisicStatus) {
            experienceIndex = experienceMapper[tmpUser.userPhisicStatus]
        }
        setSelectedExperience(experienceIndex)
    }, []);

    useEffect(() => {
        if (selectedObjetive === null) return
        let tmpUserObjetive: Objetive = 'BAJAR_DE_PESO'
        switch (selectedObjetive) {
            case 0:
                tmpUserObjetive = 'BAJAR_DE_PESO'
                break;
            case 1:
                tmpUserObjetive = 'GANAR_MUSCULO'
                break;
            case 2:
                tmpUserObjetive = 'MANTENERSE_EN_FORMA'
                break;
            default:
                break;
        }
        updateInitUserShell({
            ...tmpUser,
            userObjetive: tmpUserObjetive
        })
    }, [selectedObjetive]);

    useEffect(() => {
        if (selectedExperience === null) return
        let tmpUserExp: Experience = 'PRINCIPIANTE'
        switch (selectedExperience) {
            case 0:
                tmpUserExp = 'PRINCIPIANTE'
                break;
            case 1:
                tmpUserExp = 'INTERMEDIO'
                break;
            case 2:
                tmpUserExp = 'AVANZADO'
                break;
            default:
                break;
        }
        updateInitUserShell({
            ...tmpUser,
            userPhisicStatus: tmpUserExp
        })
    }, [selectedExperience]);

    useEffect(() => {
        if (selectedGenre === null) return
        let tmpUserGenre: Genre = 'MASCULINO'
        switch (selectedGenre) {
            case 0:
                tmpUserGenre = 'MASCULINO'
                break;
            case 1:
                tmpUserGenre = 'FEMENINO'
                break;
            case 2:
                tmpUserGenre = 'OTRO'
                break;
            default:
                break;
        }
        updateInitUserShell({
            ...tmpUser,
            userGenre: tmpUserGenre
        })
    }, [selectedGenre]);


    return (
        <>
            <View className={`mt-2 pb-5 `}>
                <View className='py-2'>
                        <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Cuál es tu género?</Text>
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
                    <Text className={`text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Cuál es tu objetivo principal?</Text>
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
            </View>



        </>
    );
};

export default Form02;
