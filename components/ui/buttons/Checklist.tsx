import { useTheme } from '@/context/ThemeContext';
import { DaysWeek } from '@/types/interfaces/entities/user';
import Checkbox from 'expo-checkbox';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    days: DaysWeek;
    setDays: React.Dispatch<React.SetStateAction<DaysWeek>>
}

const WeekChecklistComponent = ({ days, setDays }: Props) => {
    const { isDark } = useTheme()

    const labelStyle = `text-lg ${isDark ? "text-white" : "text-darkGray-500"} font-raleway`
    const enabledStyle = `${isDark ? "#66A3FF" : "#16243E"}`
    const disabledStyle = `${isDark ? "#fff" : "#1c1c1c"}`

    return (
        <View className='w-full'>
            <View className='flex flex-row items-center justify-between p-2'>
                <Text className={labelStyle}>
                    Lunes
                </Text>
                <Checkbox
                    className='w-6 h-6'
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
                    className='w-6 h-6'
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
                    className='w-6 h-6'
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
                    className='w-6 h-6'
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
                    className='w-6 h-6'
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

export default WeekChecklistComponent;
