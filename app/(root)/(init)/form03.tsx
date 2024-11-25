import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useNavigationFlowContext } from '@/context/NavFlowContext';

import { experienceMapper, experienceOptions, genreMapper, genresOptions, objetiveMapper, objetiveOptions } from '@/constants';
import { Experience, Objetive } from '@/types/interfaces/entities/user';
import { Genre } from '../../../types/interfaces/entities/user';

import RadioButtonVerticalIconComponent from '@/components/ui/common/buttons/RadioButtonVerticalIcon';
import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import { router } from 'expo-router';

const Form03 = () => {
    const { tmpUser, updateInitUserShell } = useNavigationFlowContext()

    const [selectedGenre, setSelectedGenre] = useState<number>(tmpUser?.userGenre ? genreMapper[tmpUser.userGenre] : 0);
    const [selectedObjetive, setSelectedObjetive] = useState<number>(tmpUser?.userObjetive ? objetiveMapper[tmpUser.userObjetive] : 0);
    const [selectedExperience, setSelectedExperience] = useState<number>(tmpUser?.userPhisicStatus ? experienceMapper[tmpUser.userPhisicStatus] : 0);

    useEffect(() => {
        if (selectedObjetive === null) return
        let tmpUserObjetive: Objetive = 'BAJAR_DE_PESO'
        switch (selectedObjetive) {
            case 0: tmpUserObjetive = 'BAJAR_DE_PESO'
                break;
            case 1: tmpUserObjetive = 'GANAR_MUSCULO'
                break;
            case 2: tmpUserObjetive = 'MANTENERSE_EN_FORMA'
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

    const handleContinue = () => {
        router.push('/form04')
    }

    return (
        <View className="flex-1 w-full flex flex-col items-center justify-between">

            <Text className="text-white text-4xl font-ralewayExtraBold">
                Cuéntanos de ti
            </Text>
            <View className={`mt-2`}>
                <View>
                    <Text className="text-white text-center text-xl font-ralewaySemiBold mb-4">
                        Tu género es:
                    </Text>
                    <RadioButtonVerticalIconComponent
                        options={genresOptions}
                        icons={[
                            <Ionicons name="male"
                                size={35}
                                color={"#fff"} />,
                            <Ionicons name="female"
                                size={35}
                                color={"#fff"} />,
                            <Ionicons name="male-female"
                                size={35}
                                color={"#fff"} />,
                        ]}
                        selectedValue={selectedGenre}
                        setSelectedValue={setSelectedGenre}
                        rbComponentStyle='w-full flex flex-row'
                        rbIndividualRadioButtonStyle='items-center justify-center w-1/3'
                        rbIndividualTextBtnStyle='text-lg pb-2 font-ralewayExtraBold'
                    />
                </View>

                <View>
                    <Text className="text-white text-center text-xl font-ralewaySemiBold mb-4">
                        Tu objetivo es:
                    </Text>
                    <RadioButtonVerticalIconComponent
                        options={objetiveOptions}
                        icons={[
                            <Ionicons name="nutrition-outline"
                                size={35}
                                color={"#fff"} />,
                            <Ionicons name="barbell-outline"
                                size={35}
                                color={"#fff"} />,
                            <Ionicons name="fitness-sharp"
                                size={35}
                                color={"#fff"} />,
                        ]}
                        selectedValue={selectedObjetive}
                        setSelectedValue={setSelectedObjetive}
                        rbComponentStyle='w-full'
                        rbIndividualRadioButtonStyle='flex flex-col items-center justify-center'
                        rbIndividualTextBtnStyle={`text-lg p-2  font-ralewayExtraBold `}
                    />
                </View>

                <View>
                    <Text className="text-white text-center text-xl font-ralewaySemiBold mb-4">
                        Tu experiencia es:
                    </Text>
                    <RadioButtonVerticalIconComponent
                        options={experienceOptions}
                        icons={[
                            <Ionicons name="star-outline"
                                size={35}
                                color={"#fff"} />,
                            <Ionicons name="star-half-outline"
                                size={35}
                                color={"#fff"} />,
                            <Ionicons name="star"
                                size={35}
                                color={"#fff"} />,
                        ]}
                        selectedValue={selectedExperience}
                        setSelectedValue={setSelectedExperience}
                        rbComponentStyle='w-full flex flex-row'
                        rbIndividualRadioButtonStyle='items-center justify-center w-1/3'
                        rbIndividualTextBtnStyle='text-lg pb-2 font-ralewayExtraBold'
                    />

                </View>
            </View>

            <View className='w-full'>
                <CTAButtonPrimary
                    onPress={handleContinue}
                    text="Continuar"
                />

            </View>

        </View>
    );
};

export default Form03;
