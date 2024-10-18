import WeekChecklistComponent from '@/components/ui/buttons/Checklist';
import RadioButtonIconComponent from '@/components/ui/buttons/RadioButtonIcon';
import { scheduleMapper, scheduleOptions } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { DaysWeek, Schedule } from '@/types/interfaces/entities/user';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const Form04 = () => {
    const { isDark } = useTheme()
    const { tmpUser, updateInitUserShell } = useUser()

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
        updateInitUserShell({
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
        updateInitUserShell({
            ...tmpUser,
            userTrainingDays: days
        })
    }, [days]);

    return (
        <>

            <View className={`mt-2 pb-5 `}>
                <View className={`py-2`}>
                    <View className={` w-full items-start`}>
                        <Text className={`text-lg  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>¿Cuál es tu horario preferido de entrenamiento?</Text>
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

        </>
    );
};

export default Form04;
