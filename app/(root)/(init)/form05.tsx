import WeekChecklistComponent from '@/components/ui/buttons/Checklist';
import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { DaysWeek, Schedule } from '@/types/interfaces/entities/user';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
const scheduleMapper: Record<Schedule, number> = {
    'AM': 0,
    'PM': 1,
}

const genresOptions = ['AM', 'PM']

const Form05 = () => {
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
            <View className={`py-5 border-y-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"}`}>
                <View className={`pb-5 border-b-[1px] border-${isDark ? "darkGray-400" : "darkGray-500"} w-full items-center`}>
                    <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} text-center`}>¿Cuál es tu horario preferido de entrenamiento?</Text>
                </View>

                <RadioButtonIconComponent
                    options={genresOptions}
                    icons={[
                        <Ionicons name="sunny-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />,
                        <Ionicons name="partly-sunny-outline"
                            size={35}
                            color={`${isDark ? "#1c1c1c" : "#a6a6a6"}`} />
                    ]}
                    selectedValue={selectedSchedule}
                    setSelectedValue={setSelectedSchedule}
                    rbComponentStyle='w-full '
                    rbIndividualRadioButtonStyle='h-12 flex flex-col items-center justify-center mb-2 '
                    rbIndividualTextBtnStyle={`text-base  font-ralewayBold ${isDark ? "text-darkGray-500" : "text-white"} `}
                />


                <WeekChecklistComponent
                    days={days}
                    setDays={setDays}
                />

            </View>
        </>
    );
};

export default Form05;
