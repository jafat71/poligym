import WeekChecklistComponent from '@/components/ui/common/buttons/Checklist';
import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import RadioButtonVerticalIconComponent from '@/components/ui/common/buttons/RadioButtonVerticalIcon';
import WeekList from '@/components/ui/common/buttons/WeekList';
import { scheduleMapper, scheduleOptions } from '@/constants';
import { useNavigationFlowContext } from '@/context/NavFlowContext';
import { useTheme } from '@/context/ThemeContext';
import { DaysWeek, Schedule } from '@/types/interfaces/entities/user';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const Form05 = () => {
    const { isDark } = useTheme()
    const { tmpUser, updateInitUserShell } = useNavigationFlowContext()

    const [selectedSchedule, setSelectedSchedule] = useState<number>(tmpUser?.userGenre ? scheduleMapper[tmpUser.userPreferedSchedule] : 0);
    const [days, setDays] = useState<DaysWeek>({
        "monday": tmpUser?.userTrainingDays.monday ?? false,
        "tuesday": tmpUser?.userTrainingDays.tuesday ?? false,
        "wednesday": tmpUser?.userTrainingDays.wednesday ?? false,
        "thursday": tmpUser?.userTrainingDays.thursday ?? false,
        "friday": tmpUser?.userTrainingDays.friday ?? false,
    });

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

    const handleContinue = () => {
        updateInitUserShell({
            ...tmpUser,
            userTrainingDays: days
        })
        router.push('/form06')
    }

    return (
        <View className="flex-1 w-full flex flex-col items-center justify-between">
            <Text className="text-white text-4xl font-ralewayExtraBold">
                Cuéntanos de ti
            </Text>
            <View className={`mt-2 flex-1 flex-col`}>
                <View className={`py-2`}>
                    <Text className="text-white text-center text-xl font-ralewaySemiBold mb-4">
                        Tu horario preferido de entrenamiento es:
                    </Text>

                    <RadioButtonVerticalIconComponent
                        options={scheduleOptions}
                        icons={[
                            <Ionicons name="sunny-outline"
                                size={35}
                                color={"#fff"} />,
                            <Ionicons name="partly-sunny-outline"
                                size={35}
                                color={"#fff"} />,
                        ]}
                        selectedValue={selectedSchedule}
                        setSelectedValue={setSelectedSchedule}
                        rbComponentStyle='w-full flex flex-row'
                        rbIndividualRadioButtonStyle='items-center justify-center w-1/2'
                        rbIndividualTextBtnStyle='text-lg pb-2 font-ralewayExtraBold'
                    />

                    <WeekList
                        days={days}
                        setDays={setDays}
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

export default Form05;
