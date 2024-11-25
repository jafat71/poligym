import { useTheme } from '@/context/ThemeContext';
import { DaysWeek } from '@/types/interfaces/entities/user';
import Checkbox from 'expo-checkbox';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    days: DaysWeek;
    setDays: React.Dispatch<React.SetStateAction<DaysWeek>>
}

const WeekList = ({ days, setDays }: Props) => {

    const labelStyle = `text-2xl text-white font-ralewayBold`
    const enabledStyle = "#0059ff"
    const disabledStyle = "#fff"

    const checkboxStyle = 'w-8 h-8'
    return (
        <View className='w-full'>
            <View className='flex flex-row items-center justify-between p-2'>
                <Text className={labelStyle}>
                    Lunes
                </Text>
                <Checkbox
                    className={checkboxStyle}
                    value={days.monday}
                    onValueChange={() => setDays({
                        ...days,
                        monday: !days.monday
                    })}
                    color={days.monday ? enabledStyle : disabledStyle}
                />
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
                <Text className={labelStyle}>
                    Martes
                </Text>
                <Checkbox
                    className={checkboxStyle}
                    value={days.tuesday}
                    onValueChange={() => setDays({
                        ...days,
                        tuesday: !days.tuesday
                    })}
                    color={days.tuesday ? enabledStyle : disabledStyle}
                />
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
                <Text className={labelStyle}>
                    Miercoles
                </Text>
                <Checkbox
                    className={checkboxStyle}
                    value={days.wednesday}
                    onValueChange={() => setDays({
                        ...days,
                        wednesday: !days.wednesday
                    })}
                    color={days.wednesday ? enabledStyle : disabledStyle}
                />
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
                <Text className={labelStyle}>
                    Jueves
                </Text>
                <Checkbox
                    className={checkboxStyle}
                    value={days.thursday}
                    onValueChange={() => setDays({
                        ...days,
                        thursday: !days.thursday
                    })}
                    color={days.thursday ? enabledStyle : disabledStyle}
                />
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
                <Text className={labelStyle}>
                    Viernes
                </Text>
                <Checkbox
                    className={checkboxStyle}
                    value={days.friday}
                    onValueChange={() => setDays({
                        ...days,
                        friday: !days.friday
                    })}
                    color={days.friday ? enabledStyle : disabledStyle}
                />
            </View>
        </View>
    );
};

export default WeekList;
