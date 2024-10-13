import WeekChecklistComponent from '@/components/ui/buttons/Checklist';
import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { DaysWeek, MedicalProblem, Schedule } from '@/types/interfaces/entities/user';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const scheduleMapper: Record<Schedule, number> = {
    'AM': 0,
    'PM': 1,
}

const genresOptions = ['AM', 'PM']

const Form04 = () => {
    const { isDark } = useTheme()
    const { tmpUser, set1InitUser } = useUser()

    const [selectedSchedule, setSelectedSchedule] = useState<number>(0);
    const [days, setDays] = useState<DaysWeek>({
        "monday": false,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false,
    });

    useEffect(() => {
        let scheduleIndex = 0
        if (tmpUser?.userGenre) {
            scheduleIndex = scheduleMapper[tmpUser.userPreferedSchedule]
        }
        setSelectedSchedule(scheduleIndex)
    }, []);

    useEffect(() => {
        if (selectedSchedule === null) return
        let tmpUserSchedule: Schedule = 'AM'
        switch (selectedSchedule) {
            case 0:
                tmpUserSchedule = 'AM'
                break;
            case 1:
                tmpUserSchedule = 'PM'
                break;
            default:
                break;
        }
        set1InitUser({
            ...tmpUser,
            userPreferedSchedule: tmpUserSchedule
        })
    }, [selectedSchedule]);

    useEffect(() => {
        setDays({
            monday: tmpUser?.userTrainingDays.monday ?? false,
            tuesday: tmpUser?.userTrainingDays.tuesday ?? false,
            wednesday: tmpUser?.userTrainingDays.wednesday ?? false,
            thursday: tmpUser?.userTrainingDays.thursday ?? false,
            friday: tmpUser?.userTrainingDays.friday ?? false,
        })
    }, []);

    useEffect(() => {
        set1InitUser({
            ...tmpUser,
            userTrainingDays: days
        })
    }, [days]);

    return (
        <>
            <View className={`py-2`}>
                <View className={` w-full items-start`}>
                    <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Cuál es tu horario preferido de entrenamiento?</Text>
                </View>

                <RadioButtonIconComponent
                    options={genresOptions}
                    icons={[
                        <Ionicons name="sunny-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#fff"}`} />,
                        <Ionicons name="partly-sunny-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#fff"}`} />,
                    ]}
                    selectedValue={selectedSchedule}
                    setSelectedValue={setSelectedSchedule}
                    rbComponentStyle='w-full mt-2'
                    rbIndividualRadioButtonStyle='h-10 flex flex-col items-center justify-center mb-2'
                    rbIndividualTextBtnStyle={`text-base  font-ralewayBold  `} 
                />


                <WeekChecklistComponent
                    days={days}
                    setDays={setDays}
                />

            </View>
        </>
    );
};

export default Form04;
